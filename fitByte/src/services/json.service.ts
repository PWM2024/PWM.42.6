import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class JsonService {
  users: any[] = [];
  compras: any[] = [];
  productos: any[] = [];
  alimentos: any[] = [];
  private jsonUrl = '/src/app/services/db.json';

  constructor(private http: HttpClient) {}


  ngOnInit(): void {
    this.initializeJson()
      .catch(error => {
        console.error('Error al inicializar JSON en ngOnInit:', error);
      });
  }

  initializeJson(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.get(this.jsonUrl).subscribe({
        next: (data: any) => {
          this.users = data.users || [];
          this.compras = data.compras || [];
          this.productos = data.productos || [];
          this.alimentos = data.alimentos || [];
          console.log('JSON inicializado correctamente.');
          resolve();
        },
        error: (error) => {
          console.error('Error al inicializar el JSON:', error);
          reject(error);
        }
      });
    });
  }

  async updateJson(): Promise<void> {
    try {
      const updatedData = {
        users: this.users,
        compras: this.compras,
        productos: this.productos,
        alimentos: this.alimentos,
      };
      await this.http.put(this.jsonUrl, updatedData).toPromise();
      console.log('JSON actualizado correctamente.');
    } catch (error) {
      console.error('Error al actualizar el JSON:', error);
      throw error;
    }
  }

  generarCadenaAleatoria(): string {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let cadenaAleatoria = '';
    for (let i = 0; i < 8; i++) {
      const indice = Math.floor(Math.random() * caracteres.length);
      cadenaAleatoria += caracteres.charAt(indice);
    }
    return cadenaAleatoria;
  }

  async register(email: string, username: string, password: string): Promise<void> {
    console.log('Registrando usuario...');
    let newUser = {
      id: this.generarCadenaAleatoria(),
      nickname: username,
      email: email,
      password: password,
      promoCode: this.generarCadenaAleatoria(),
      peso: '',
      altura: '',
      imc: '',
      kcal: '',
      cesta: [] as string[],
      listaDeseos: [] as string[],
      compras: [] as string[]
    };

    this.users.push(newUser);
    await this.updateJson();
    console.log('Usuario creado exitosamente.');
    return Promise.resolve();
  }

  async login(email: string, password: string): Promise<any> {
    console.log('Iniciando sesión...');
    const user = this.users.find(user => user.email === email && user.password === password);
    if (user) {
      console.log('Usuario iniciado sesión exitosamente.');
      await this.updateJson();
      return user.id;
    } else {
      throw new Error('Credenciales incorrectas');
    }
  }
  async getUserByID(userId: string): Promise<any> {
    const user = this.users.find(user => user.id === userId);
    return user;
  }

  async getProductByID(productId: string): Promise<any> {
    const product = this.productos.find(product => product.id === productId);
    return product;
  }

  async getPurchasesByID(purchaseId: string): Promise<any> {
    const purchase = this.compras.find(compra => compra.id === purchaseId);
    return purchase;
  }

  async getFood(): Promise<any[]> {
    return this.alimentos;
  }

  async updateValueUser(userId: string, newValue: string, parameter: string): Promise<void> {
    try {
      const userIndex = this.users.findIndex(user => user.id === userId);
      if (userIndex !== -1) {
        this.users[userIndex][parameter] = newValue;
        await this.updateJson();
        console.log(parameter, "actualizado correctamente.");
      } else {
        throw new Error('Usuario no encontrado');
      }
    } catch (error) {
      console.error("Error al actualizar el valor del usuario:", error);
      throw error;
    }
  }

  async checkDiscountCode(discountCode: string): Promise<boolean> {
    try {
      const userWithCode = this.users.find(user => user.promoCode === discountCode);
      return !!userWithCode;
    } catch (error) {
      console.error("Error al verificar el código de descuento:", error);
      throw error;
    }
  }

  async addUserProduct(userID: string, productID: string, fieldToAdd: string): Promise<void> {
    try {
      const user = this.users.find(user => user.id === userID);
      if (!user) throw new Error('Usuario no encontrado');

      const currentField = user[fieldToAdd] || [];
      if (currentField.includes(productID)) {
        console.log("El producto ya está en la lista.");
        return;
      }

      user[fieldToAdd] = [...currentField, productID];
      console.log(fieldToAdd, "actualizado correctamente.");
      await this.updateJson();
    } catch (error) {
      console.error("Error al agregar producto al usuario:", error);
      throw error;
    }
  }

  async createPurchase(id: string, fecha: string, numPedido: string, precio: string): Promise<void> {
    try {
      const newPurchase = {
        id: id,
        fecha: fecha,
        numPedido: numPedido,
        precio: precio
      };
      this.compras.push(newPurchase);
      await this.updateJson();
      console.log('Compra creada exitosamente.');
    } catch (error) {
      console.error('Error al crear la compra:', error);
      throw error;
    }
  }

  async vaciarCesta(userId: string): Promise<void> {
    try {
      const user = this.users.find(user => user.id === userId);
      if (!user) throw new Error('Usuario no encontrado');

      user.cesta = [];
      await this.updateJson();
      console.log('Cesta vaciada correctamente.');
    } catch (error) {
      console.error("Error al vaciar la cesta del usuario:", error);
      throw error;
    }
  }

  async deleteProduct(userId: string, valueToDelete: string, parameter: string): Promise<void> {
    try {
      const userIndex = this.users.findIndex(user => user.id === userId);
      if (userIndex !== -1) {
        this.users[userIndex][parameter] = this.users[userIndex][parameter].filter((value: string) => value !== valueToDelete);
        await this.updateJson();
        console.log(valueToDelete, "eliminado correctamente de la lista en el campo", parameter);
      } else {
        throw new Error('Usuario no encontrado');
      }
    } catch (error) {
      console.error("Error al eliminar producto del usuario:", error);
      throw error;
    }
  }

}
