import { Injectable, inject, EventEmitter} from '@angular/core';
import { Firestore, addDoc, collection, getDocs, updateDoc } from "@angular/fire/firestore";
import { Auth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, onAuthStateChanged } from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private firebaseAuth = inject(Auth);
  private firestore = inject(Firestore);
  eventoLogged = new EventEmitter<any>()

  async isLoggedIn(userId: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(this.firebaseAuth, (user) => {
        if (user && user.uid === userId) {
          resolve(true);
        } else {
          resolve(false);
        }
      }, reject);
    });
  }
  

  async register(email: string, username: string, password: string): Promise<void> {
    console.log('Registrando usuario...');

    return createUserWithEmailAndPassword(this.firebaseAuth, email, password)
      .then((response) => {
        console.log('Usuario creado exitosamente.');
        console.log('Actualizando perfil...');
        this.login(email, password);
        updateProfile(response.user, { displayName: username }).then(() => {
          this.setData(response.user.uid, email, username);
          console.log('Perfil actualizado exitosamente.');
          return response.user.uid;
        });
      })
      .catch((error) => {
        console.error('Error al registrar usuario:', error);
      });

  }

  async login(email: string, password: string): Promise<any> {
    console.log('Iniciando sesión...');

    return signInWithEmailAndPassword(this.firebaseAuth, email, password)
      .then((response) => {
        console.log('Usuario iniciado sesión exitosamente.');
        console.log('Actualizando perfil...');
        return response.user.uid;
      })
      .catch((error) => {
        console.error('Error al iniciar sesión:', error);
        throw error;
      });
  }

  getImageUrl(imagePath: string): Observable<string> {
    const storage = getStorage();
    const imageRef = ref(storage, imagePath);

    return from(getDownloadURL(imageRef));
}


  async getData(collection_data: string): Promise<any> {
    const data = collection(this.firestore, collection_data);
    try {
      const docRef = await getDocs(data);
      return docRef;
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  async setData(uid: string, email: string, username: string): Promise<any> {
    const collect = collection(this.firestore, "usuarios");
    try {
      await addDoc(collect, {
        altura: 0,
        cesta: {},
        compras: {
          email: email,
          id: uid,
          imc: 0,
          kcal: 0,
        },
        listaDeseos: {},
        nickname: username,
        peso: 0,
        promocode: generarCadenaAleatoria(),

      });
      return true;
    } catch (e) {
      console.error("Error adding document: ", e);
      return false;
    }
  }

  async getUserByID(userId: string): Promise<any> {
    if (!this.isLoggedIn(userId)) return -1;
    console.log('Obteniendo usuario...');
    const data = collection(this.firestore, "usuarios");
    try {
      const docRef = await getDocs(data);
      let userFound = null;
      docRef.forEach((doc: any) => {
        if (doc.data().id === userId) {
          userFound = doc.data();
        }
      });
      return userFound;
    } catch (e) {
      console.error("Error al obtener historial: ", e);
      return -2;
    }
  }

  async getProductByID(productId: string): Promise<any> {
    const data = collection(this.firestore, "productos");
    try {
      const docRef = await getDocs(data);
      let productFound = null;
      docRef.forEach((doc: any) => {
        if (doc.data().id === productId) {
          productFound = doc.data();
        }
      });
      return productFound;
    } catch (e) {
      console.error("Error al obtener producto: ", e);
      throw e;
    }
  }


  async getPurchasesByID(purchaseId: string): Promise<any> {
    const data = collection(this.firestore, "compras");
    try {

      const docRef = await getDocs(data);
      let purchaseFound = null;

      docRef.forEach((doc: any) => {
        if (doc.data().id === purchaseId) {
          purchaseFound = doc.data();
        }

      });
      return purchaseFound;
    } catch (e) {
      console.error("Error al obtener compra: ", e);
      throw e;
    }
  }


  async getFood(): Promise<any[]> {
    const data = collection(this.firestore, "alimentos");
    try {
      const querySnapshot = await getDocs(data);
      const alimentos: any[] = [];
      querySnapshot.forEach((doc) => {
        alimentos.push(doc.data());
      });
      return alimentos;
    } catch (e) {
      console.error("Error al obtener alimentos: ", e);
      throw e;
    }
  }

  async updateValueUser(userId: string, newValue: string, parameter: string): Promise<any> {
    const data = collection(this.firestore, "usuarios");

    try {
      const querySnapshot = await getDocs(data);

      querySnapshot.forEach(async (doc) => {
        if (doc.data()['id'] === userId) {
          try {
            const updateObject = { [parameter]: newValue };
            await updateDoc(doc.ref, updateObject);
            console.log(parameter, "actualizado correctamente.");
          } catch (error) {
            console.error("Error al actualizar el apodo del usuario:", error);
            throw error;
          }
        }
      });

    } catch (e) {
      console.error("Error al obtener usuarios: ", e);
      throw e;
    }
  }


  async checkDiscountCode(discountCode: string) {
    const data = collection(this.firestore, "usuarios");

    try {
      const querySnapshot = await getDocs(data);

      for (const doc of querySnapshot.docs) {
        if (doc.data()['promocode'] === discountCode) {
          return true;
        }
      }

      return false;

    } catch (e) {
      console.error("Error al obtener los codigos: ", e);
      throw e;
    }
  }


  async addUserProduct(userID: string, productID: string, fieldToAdd: string): Promise<any> {
    const data = collection(this.firestore, "usuarios");

    try {
      const querySnapshot = await getDocs(data);

      querySnapshot.forEach(async (doc) => {
        if (doc.data()['id'] === userID) {
          try {
            const currentCesta = doc.data()[fieldToAdd] ||[];

            if (currentCesta.includes(productID)) {
              console.log("El producto ya está en la cesta.");
              return;
            }

            const newCesta = [...currentCesta, productID];
            const updateObject = { [fieldToAdd]: newCesta};

            await updateDoc(doc.ref, updateObject);
            console.log(fieldToAdd, "actualizado correctamente.");
          } catch (error) {
            console.error("Error al actualizar el apodo del usuario:", error);
            throw error;
          }
        }
      });

    } catch (e) {
      console.error("Error al obtener usuarios: ", e);
      throw e;
    }
  }

  async createPurchase(id: string, fecha: string, numPedido: string, precio: string): Promise<void> {
    try {
      const comprasRef = collection(this.firestore, 'compras');

      await addDoc(comprasRef, {
        id: id,
        fecha: fecha,
        numPedido: numPedido,
        precio: precio
      });

      console.log('Compra creada exitosamente.');
    } catch (error) {
      console.error('Error al crear la compra:', error);
      throw error;
    }
  }

  async vaciarCesta(userId: string): Promise<any> {
    const data = collection(this.firestore, "usuarios");

    try {
      const querySnapshot = await getDocs(data);

      querySnapshot.forEach(async (doc) => {
        if (doc.data()['id'] === userId) {
          try {
            const updateObject = { ['cesta']: [] };
            await updateDoc(doc.ref, updateObject);
          } catch (error) {
            console.error("Error al eliminar el valor:", error);
            throw error;
          }
        }
      });

    } catch (e) {
      console.error("Error al obtener usuarios: ", e);
      throw e;
    }
  }



  async deleteProduct(userId: string, valueToDelete: string, parameter: string): Promise<any> {
    const data = collection(this.firestore, "usuarios");

    try {
      const querySnapshot = await getDocs(data);

      querySnapshot.forEach(async (doc) => {
        if (doc.data()['id'] === userId) {
          try {
            const currentList = doc.data()[parameter] || [];
            const updatedList = currentList.filter((value: string) => value !== valueToDelete);
            const updateObject = { [parameter]: updatedList };
            await updateDoc(doc.ref, updateObject);
            console.log(valueToDelete, "eliminado correctamente de la lista en el campo", parameter);
          } catch (error) {
            console.error("Error al eliminar el valor:", error);
            throw error;
          }
        }
      });

    } catch (e) {
      console.error("Error al obtener usuarios: ", e);
      throw e;
    }
  }

}
function generarCadenaAleatoria(): string {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let cadenaAleatoria = '';
  for (let i = 0; i < 8; i++) {
    const indice = Math.floor(Math.random() * caracteres.length);
    cadenaAleatoria += caracteres.charAt(indice);
  }
  return cadenaAleatoria;
}
