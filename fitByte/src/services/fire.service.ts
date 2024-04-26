import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, getDoc, getDocs, getFirestore } from "@angular/fire/firestore"; 
import { Auth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private firebaseAuth = inject(Auth);
  private firestore = inject(Firestore);

  register(email: string, username: string, password: string): Observable<void> {
    console.log('Registrando usuario...');

    const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password)
      .then((response) => {
        console.log('Usuario creado exitosamente.');
        console.log('Actualizando perfil...');
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
        console.log('Usuario iniciado sesión exitosamente.');
        console.log('Actualizando perfil...');
      })
      .catch((error) => {
        console.error('Error al iniciar sesión:', error);
        throw error;
      });

    return from(promise);
  }

  async getRutinas(): Promise<any> {
    console.log('Iniciando sesión...');
    const rutinas = collection(this.firestore, "rutinas");
    try {
      const docRef = await getDocs(rutinas);
      return docRef;
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  
}
