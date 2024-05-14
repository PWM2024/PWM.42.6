import { identifierName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore,) { }

    async insertUser(id: string, name: string, email: string, imageUrl: string, birthdate: string, gender: string): Promise<void> {
        try {
            const user = { id, name, email, imageUrl, birthdate, gender};
            const docRef = await this.firestore.collection('usuariosIonic').add(user);
        }
        catch (error) {
            console.error('Error al insertar usuario:', error);
            throw error;
        }
    }

}