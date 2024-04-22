import { Component } from '@angular/core';
import { TarjetaProductoComponent } from '../../components/tarjeta-producto/tarjeta-producto.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { TarjetageneralComponent } from '../../components/tarjetageneral/tarjetageneral.component';
<<<<<<< HEAD
import { HeaderComponent } from '../../components/header/header.component'
=======
import {HeaderComponent} from "../../components/header/header.component";
>>>>>>> be05255331923556fb9d2c31aaa77c0f9511c9d8

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [TarjetaProductoComponent, FooterComponent, TarjetageneralComponent, HeaderComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})


export class InicioPage {
  productos = [
    { id: "id1", content: []},
    { id: "id2", content: []},
  ]

  rutinas = [
    { id: "id1", content: []},
    { id: "id2", content: []},
    { id: "id3", content: []},
    { id: "id4", content: []},
    { id: "id5", content: []},
    { id: "id6", content: []},
  ]
}
