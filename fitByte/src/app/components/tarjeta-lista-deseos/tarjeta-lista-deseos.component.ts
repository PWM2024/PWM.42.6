import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tarjeta-lista-deseos',
  standalone: true,
  imports: [],
  templateUrl: './tarjeta-lista-deseos.component.html',
  styleUrls: ['./tarjeta-lista-deseos.component.css', '../component.css']
})
export class TarjetaListaDeseosComponent {
  @Input() nombre: any;
  @Input() id: any;
  @Input() precio: any;
}
