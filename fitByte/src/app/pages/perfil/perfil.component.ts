import { Component } from '@angular/core';
import { TarjetaProductoComponent } from '../../components/tarjeta-producto/tarjeta-producto.component';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [TarjetaProductoComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilPage {

}
