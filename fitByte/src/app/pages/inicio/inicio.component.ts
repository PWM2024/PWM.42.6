import { Component } from '@angular/core';
import { TarjetaProductoComponent } from '../../components/tarjeta-producto/tarjeta-producto.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [TarjetaProductoComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioPage {

}
