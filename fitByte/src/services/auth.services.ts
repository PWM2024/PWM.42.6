import {Injectable, inject, EventEmitter} from '@angular/core';
import { Auth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseAuth = inject(Auth);
  eventoLogged = new EventEmitter<any>()

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
        this.login(email, password);
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


}
