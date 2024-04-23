import { Component } from '@angular/core';
import { MiPerfilDetallesComponent } from '../../components/mi-perfil-detalles/mi-perfil-detalles.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { TarjetaHistorialComprasComponent } from '../../components/tarjeta-historial-compras/tarjeta-historial-compras.component';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [MiPerfilDetallesComponent, TarjetaHistorialComprasComponent, FooterComponent],
  templateUrl: './perfilHistorial.component.html',
  styleUrl: './perfilHistorial.component.css'
})

export class perfilHistorial {

  tarjetas = [
    { id: "id1", content: []},
    { id: "id2", content: []},
  ]
}
