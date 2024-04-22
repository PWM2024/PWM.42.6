import { Component } from '@angular/core';
import { TarjetaProductoComponent } from '../../components/tarjeta-producto/tarjeta-producto.component';
import { SliderComponent } from '../../components/slider/slider.component';
import { FooterComponent } from '../../components/footer/footer.component';
<<<<<<< HEAD
import { HeaderComponent } from '../../components/header/header.component'
=======
import {HeaderComponent} from "../../components/header/header.component";
>>>>>>> be05255331923556fb9d2c31aaa77c0f9511c9d8

@Component({
  selector: 'app-tienda',
  standalone: true,
  imports: [TarjetaProductoComponent, SliderComponent, FooterComponent, HeaderComponent],
  templateUrl: './tienda.component.html',
  styleUrl: './tienda.component.css'
})
export class TiendaPage {
  productos = [
    {id:1},
    {id:2},
    {id:3}
  ]
}
