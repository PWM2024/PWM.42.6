import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AnimalService } from "../../services/animal.service";
import { Animal } from "../../models/animal.model";
import {DatabaseService} from "../../services/database.service";

@Component({
  selector: "app-animal-detail",
  templateUrl: "./animal-detail.page.html",
  styleUrls: ["./animal-detail.page.scss"],
})
export class AnimalDetailPage implements OnInit {

  animal?: Animal;
  favorite = false;
  favorites: Animal[] = [];
  linkImages: string = "";
  userID: string = '';

  constructor(
    private route: ActivatedRoute,
    private animalService: AnimalService,
    private sqlite: DatabaseService
  ) {}

  ngOnInit() {
    console.log("ngOnInit");
    this.userID = sessionStorage.getItem('uid');
  }

  // Al entrar, leemos la base de datos
  ionViewWillEnter() {
    this.readFavorites();
  }

  readFavorites() {
    // Leemos los datos de la base de datos
    this.sqlite.read(this.userID).then((animals: Animal[]) => {

      this.favorites = animals;
      this.getAnimal();

    }).catch(err => {
      console.error(err);
    })
  }

  getAnimal(): void {
    const id: string = this.route.snapshot.paramMap.get("id");

    if (id) {
      this.animalService
        .getAnimalById(id)
        .subscribe((animal) => {
          this.animal = animal;

          let item =
            this.favorites.find(elem => elem.id === animal.id);

          this.favorite = !!item;

          if(this.favorite) console.log("isFavorite");

      });
    }
  }


  createFavorite() {
    // Creamos un elemento en la base de datos
    this.sqlite.create(this.animal, this.userID)
      .then((changes) => {

        this.readFavorites(); // Volvemos a leer

      }).catch(err => {
      console.error(err);
    })
  }

  deleteFavorite() {
    this.sqlite.delete(this.animal.id, this.userID)
      .then((changes) => {
        console.log("deleteFavorite");

        this.readFavorites(); // Volvemos a leer

      }).catch(err => {
      console.error(err);
    })
  }



  toggleFavorite(): void {
    if (this.animal) {
      if(this.favorite) this.createFavorite();
      else this.deleteFavorite();
    }
  }
}
