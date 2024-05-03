import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'mi-perfil-detalles',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './mi-perfil-detalles.component.html',
  styleUrls: ['./mi-perfil-detalles.component.css', '../component.css']
})
export class MiPerfilDetallesComponent {
  title = 'routing-app';
}
