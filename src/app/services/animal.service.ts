import { Injectable } from "@angular/core";
import { Animal } from "../models/animal.model";
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


  getFavorites() {
    return this.afs
      .collection<Animal>("productos", (ref) =>
        ref.where("favorite", "==", true)
      )
      .valueChanges({ idField: "id" });

  }

}
