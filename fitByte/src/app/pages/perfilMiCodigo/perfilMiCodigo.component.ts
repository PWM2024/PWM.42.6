import { Component } from '@angular/core';
import { MiPerfilDetallesComponent } from '../../components/mi-perfil-detalles/mi-perfil-detalles.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CodigoPromocionalComponent } from '../../components/codigo-promocional/codigo-promocional.component';


@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [MiPerfilDetallesComponent, CodigoPromocionalComponent, FooterComponent],
  templateUrl: './perfilMiCodigo.component.html',
  styleUrl: './perfilMiCodigo.component.css'
})

export class perfilMiCodigo {
  tarjetas = [
    { id: "id1", content: []},
  ]
}
