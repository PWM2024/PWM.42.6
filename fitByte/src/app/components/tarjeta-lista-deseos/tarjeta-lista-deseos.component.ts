import { Component, Input } from '@angular/core';
import { AuthService } from '../../../services/fire.service'

@Component({
  selector: 'app-tarjeta-lista-deseos',
  standalone: true,
  imports: [],
  templateUrl: './tarjeta-lista-deseos.component.html',
  styleUrls: ['./tarjeta-lista-deseos.component.css', '../component.css']
})
export class TarjetaListaDeseosComponent {

  constructor(private authService: AuthService) {}
  linkImages: string = '';
  userId: string = '462f';

  ngOnInit() {
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

  eliminate(){
    this.authService.deleteProduct(this.userId, this.id, 'listaDeseos');
  }


  @Input() nombre: any;
  @Input() id: any;
  @Input() precio: any;
  @Input() pathImages: any;
}
