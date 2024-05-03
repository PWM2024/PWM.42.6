import { Component, OnInit, Input } from '@angular/core';
import {
  Router,
  NavigationEnd,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { AuthService } from '../../../services/fire.service';

@Component({
  selector: 'tarjeta-producto',
  standalone: true,
  templateUrl: './tarjeta-producto.component.html',
  imports: [RouterLink, RouterLinkActive],
  styleUrls: ['./tarjeta-producto.component.css', '../component.css'],
})
export class TarjetaProductoComponent implements OnInit {
  constructor(protected router: Router, private authService: AuthService) {}
  linkImages: string = '';
  userId: string = '';

  ngOnInit() {
    const datosUserStr = sessionStorage.getItem('datosUser');
    if (datosUserStr !== null) {
      const datosUser = JSON.parse(datosUserStr);
      console.log('Datos de usuario:', datosUser);
      if (typeof datosUser === 'object' && datosUser.uid !== undefined) {
        this.userId = datosUser.uid;
      }
      this.authService.getImageUrl(this.pathImages).subscribe(
        (url) => {
          this.linkImages = url;
        },
        (error) => {
          console.error('Error al obtener la URL de la imagen:', error);
        }
      );
    }
  }

  toggleClicked(event: MouseEvent): void {
    const iconoEstrella = event.target as HTMLElement;
    iconoEstrella.classList.toggle('clicked');
  }
  addClick() {
    console.log('Añadiendo producto a la cesta' + this.id + ' ' + this.userId + ' ' + this.nombre + ' ');
    this.authService.addUserProduct(this.userId, this.id, 'cesta');
  }

  @Input() nombre: any;
  @Input() nombreDetallado: any;
  @Input() id: any;
  @Input() precio: any;
  @Input() descripcion: any;
  @Input() pathImages: any;
}
