import { Injectable } from "@angular/core";
import { Animal } from "../models/animal.model";
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { Observable, from } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: "root",
})
export class AnimalService {

  private animalsCollection: AngularFirestoreCollection<Animal>;

  constructor(private afs: AngularFirestore) {
    this.animalsCollection = afs.collection<Animal>("productos");
  }

  getAllAnimals() {
    return this.animalsCollection.valueChanges({ idField: "id" });
  }

  getAnimalById(animalId: string) {
    return this.afs
      .doc<Animal>(`productos/${animalId}`)
      .valueChanges({ idField: "id" });
  }


  toggleFavorite(animal: Animal) {
    //animal.favorite = !animal.favorite;
    this.afs.doc<Animal>(`productos/${animal.id}`).update(animal);
  }


  getImageUrl(imagePath: string): Observable<string> {
    const storage = getStorage();
    const imageRef = ref(storage, imagePath);

    return from(getDownloadURL(imageRef));
  }



  getFavorites() {
    return this.afs
      .collection<Animal>("productos", (ref) =>
        ref.where("favorite", "==", true)
      )
      .valueChanges({ idField: "id" });

    /*
    return this.afs
      .collection<Animal>('animals', ref => ref.where('isFavorite', '==', true))
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data() as Animal;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
    */
  }

}
