import { Component } from '@angular/core';
import { TarjetaProductoComponent } from '../../components/tarjeta-producto/tarjeta-producto.component';

@Component({
  selector: 'app-tienda',
  standalone: true,
  imports: [TarjetaProductoComponent],
  templateUrl: './tienda.component.html',
  styleUrl: './tienda.component.css'
})
export class TiendaPage {

}
