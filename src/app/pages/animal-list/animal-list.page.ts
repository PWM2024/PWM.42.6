import { Component, OnInit } from "@angular/core";
import { Animal } from "../../models/animal.model";
import { AnimalService } from "../../services/animal.service";
import {DatabaseService} from "../../services/database.service";

@Component({
  selector: "app-animal-list",
  templateUrl: "./animal-list.page.html",
  styleUrls: ["./animal-list.page.scss"],
})
export class AnimalListPage implements OnInit {

  animals: Animal[] = [];
  favorites: Animal[] = [];
  linkImages: string[] = [];

  allImagesLoaded = false;

  constructor(
    private sqlite: DatabaseService,
    private animalService: AnimalService
  ) {}

  ngOnInit() {
    console.log("ngOnInit");
    //this.getAnimals();
  }

  // Al entrar, leemos la base de datos
  ionViewWillEnter() {
    console.log("ionViewWillEnter");
    this.readFavorites();
  }


  readFavorites() {
    // Leemos los datos de la base de datos
    this.sqlite.read().then((animals: Animal[]) => {
      console.log("readFavorites");
      console.log(JSON.stringify(animals));

      this.favorites = animals;
      this.getAnimals();

      console.log("All Animals", this.getAnimals());

    }).catch(err => {
      console.error(err);
    })
  }

  isFavorite(animal): boolean {
    let item =
      this.favorites.find(elem => elem.id === animal.id);

    let favorite: boolean = !!item;

    if(favorite) console.log("isFavorite");

    return favorite;
  }

  getAnimals(): void {
    this.animalService.getAllAnimals()
      .subscribe((animals) => {
        this.animals = animals;

        this.animals.forEach(animal => {
          this.animalService.getImageUrl(`Source/Tienda/${animal.img}`).subscribe(
            (url) => {
              this.linkImages.push(url);
              console.log("URL de la imagen:", url);
            },
            (error) => {
              console.error('Error al obtener la URL de la imagen:', error);
            }
          );
        });

      });
  }

  createFavorite(animal: Animal) {
    // Creamos un elemento en la base de datos
    this.sqlite.create(animal)
      .then((changes) => {
        //console.log(changes);
        console.log("createFavorite");

        this.readFavorites(); // Volvemos a leer

      }).catch(err => {
      console.error(err);
    })
  }

  deleteFavorite(animal: Animal) {
    // Borramos el elemento
    this.sqlite.delete(animal.id)
      .then((changes) => {
        console.log("deleteFavorite");

        this.readFavorites(); // Volvemos a leer

      }).catch(err => {
      console.error(err);
    })
  }


  toggleFavorite(animal: Animal): void {
    //animal.favorite = !animal.favorite;
    //this.animalService.toggleFavorite(animal);

    if(this.isFavorite(animal)) this.deleteFavorite(animal);
    else this.createFavorite(animal);
  }
}
