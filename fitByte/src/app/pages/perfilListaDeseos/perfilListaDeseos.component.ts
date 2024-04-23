import { Component } from '@angular/core';
import { MiPerfilDetallesComponent } from '../../components/mi-perfil-detalles/mi-perfil-detalles.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { TarjetaHistorialComprasComponent } from '../../components/tarjeta-historial-compras/tarjeta-historial-compras.component';
import { TarjetaListaDeseosComponent } from '../../components/tarjeta-lista-deseos/tarjeta-lista-deseos.component';


@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [MiPerfilDetallesComponent, TarjetaHistorialComprasComponent, TarjetaListaDeseosComponent, FooterComponent],
  templateUrl: './perfilListaDeseos.component.html',
  styleUrl: './perfilListaDeseos.component.css'
})

export class perfilListaDeseos {
  tarjetas = [
    { id: "id1", content: []},
    { id: "id2", content: []},
    { id: "id3", content: []},
    { id: "id4", content: []},
    { id: "id5", content: []},
    { id: "id6", content: []},
  ]
}
