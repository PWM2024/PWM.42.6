import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tarjeta-historial-compras',
  standalone: true,
  imports: [],
  templateUrl: './tarjeta-historial-compras.component.html',
  styleUrls: ['./tarjeta-historial-compras.component.css', '../component.css']
})
export class TarjetaHistorialComprasComponent {


  @Input() precio: any;
  @Input() id: any;
  @Input() numPedido: any;
  @Input() fecha: any;
}
