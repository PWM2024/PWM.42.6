import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, getDoc, getDocs, getFirestore, updateDoc } from "@angular/fire/firestore";
import { Auth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private firebaseAuth = inject(Auth);
  private firestore = inject(Firestore);

  register(email: string, username: string, password: string): Observable<void> {

    const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password)
      .then((response) => {
        return updateProfile(response.user, { displayName: username });
      })
      .then(() => {
        console.log('Perfil actualizado exitosamente.');
      })
      .catch((error) => {
        console.error('Error al registrar usuario:', error);
      });

    return from(promise);
  }

  login(email: string, password: string): Observable<void> {
    console.log('Iniciando sesión...');

    const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password)
      .then(() => {
      })
      .catch((error) => {
        console.error('Error al iniciar sesión:', error);
        throw error;
      });

    return from(promise);
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

  async getUserByID(userId: string): Promise<any> {
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
      console.error("Error al obtener usuario: ", e);
      throw e;
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
        if (doc.data().numPedido === purchaseId) {
          purchaseFound = doc.data();
        }

      });
      return purchaseFound;
    } catch (e) {
      console.error("Error al obtener compra: ", e);
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




}
