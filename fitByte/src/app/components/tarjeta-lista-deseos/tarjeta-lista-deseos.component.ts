import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../services/fire.service'

@Component({
  selector: 'app-tarjeta-lista-deseos',
  standalone: true,
  imports: [],
  templateUrl: './tarjeta-lista-deseos.component.html',
  styleUrls: ['./tarjeta-lista-deseos.component.css', '../component.css']
})
export class TarjetaListaDeseosComponent implements OnInit {

  linkImages: string = '';
  userId: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const datosUserStr = sessionStorage.getItem('datosUser');
    if (datosUserStr !== null) {
      const datosUser = JSON.parse(datosUserStr);
      if (typeof datosUser === 'object' && datosUser.uid !== undefined) {
        this.userId = datosUser.uid;
      }
    }
    this.authService.getImageUrl(this.pathImages).subscribe(url => {
      console.log('URL de la imagen:', url);
      this.linkImages = url;
    }, error => {
      console.error('Error al obtener la URL de la imagen:', error);
    });
  }

  addToCesta() {
    this.authService.deleteProduct(this.userId, this.id, 'listaDeseos')
      .then(() => {
        this.authService.addUserProduct(this.userId, this.id, 'cesta');
      })
  }

  eliminate() {
    this.authService.deleteProduct(this.userId, this.id, 'listaDeseos');
  }

  @Input() nombre: any;
  @Input() id: any;
  @Input() precio: any;
  @Input() pathImages: any;
}
