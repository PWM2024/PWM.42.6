import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../services/fire.service'

@Component({
  selector: 'app-tarjeta-historial-compras',
  standalone: true,
  imports: [],
  templateUrl: './tarjeta-historial-compras.component.html',
  styleUrls: ['./tarjeta-historial-compras.component.css', '../component.css']
})
export class TarjetaHistorialComprasComponent implements OnInit {

  userUid: string = '';
  usuarioEncontrado: any;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const datosUserStr = sessionStorage.getItem('datosUser');
    if (datosUserStr !== null) {
      const datosUser = JSON.parse(datosUserStr);
      if (typeof datosUser === 'object' && datosUser.uid !== undefined) {
        this.userUid = datosUser.uid;
      }
      this.authService.getUserByID(this.userUid).then((usuario) => {
        if (usuario) {
          this.usuarioEncontrado = usuario;
        } else {
          console.log('Usuario no encontrado.');
        }
      }).catch(error => {
        console.error('Error al obtener usuario:', error);
      });
    }
  }

  eliminate() {
    console.log(this.id);
    this.authService.deleteProduct(this.userUid, this.numPedido, 'compras');
  }

  @Input() precio: any;
  @Input() id: any;
  @Input() numPedido: any;
  @Input() fecha: any;
}
