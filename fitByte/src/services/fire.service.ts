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

  
}
