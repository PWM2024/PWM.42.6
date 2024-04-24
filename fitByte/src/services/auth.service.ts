import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseAuth = inject(Auth);

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
  login(email: string, username: string, password: string): Observable<void> {
    console.log('Registrando usuario...');

    const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password)
      .then((response) => {
        console.log('Usuario iniciado exitosamente.');
        console.log('Actualizando perfil...');
        return updateProfile(response.user, { displayName: username });
      })
      .then(() => {
        console.log('Perfil actualizado exitosamente.');
      })
      .catch((error) => {
        console.error('Error al iniciar usuario:', error);
      });

    return from(promise);
  }

  
}
