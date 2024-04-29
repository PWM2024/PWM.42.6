import { Component, Input } from '@angular/core';

@Component({
  selector: 'filtro-opciones',
  standalone: true,
  imports: [],
  templateUrl: './filtro-opciones.component.html',
  styleUrls: ['./filtro-opciones.component.css', '../component.css']
})
export class FiltroOpcionesComponent {

  @Input() opciones: any[] = [];
}
