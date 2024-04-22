import { Component } from '@angular/core';
import { TarjetaProductoComponent } from '../../components/tarjeta-producto/tarjeta-producto.component';
import { SliderComponent } from '../../components/slider/slider.component';
import { FooterComponent } from '../../components/footer/footer.component';
import {HeaderComponent} from "../../components/header/header.component";

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
