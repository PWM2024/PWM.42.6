import { Component, Input } from '@angular/core';
import { AuthService } from '../../../services/fire.service'

@Component({
  selector: 'app-tarjeta-historial-compras',
  standalone: true,
  imports: [],
  templateUrl: './tarjeta-historial-compras.component.html',
  styleUrls: ['./tarjeta-historial-compras.component.css', '../component.css']
})
export class TarjetaHistorialComprasComponent {

  constructor(private authService: AuthService) {}
  userId: string = '462f';

  eliminate(){
    console.log(this.id);
    this.authService.deleteProduct(this.userId, this.numPedido, 'compras');
  }

  @Input() precio: any;
  @Input() id: any;
  @Input() numPedido: any;
  @Input() fecha: any;
}
