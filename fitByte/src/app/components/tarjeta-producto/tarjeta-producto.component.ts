import { Component, OnInit, Input } from '@angular/core';
import {Router, NavigationEnd, RouterLink, RouterLinkActive} from '@angular/router';
import { AuthService } from '../../../services/fire.service'

@Component({
    selector: 'tarjeta-producto',
    standalone: true,
    templateUrl: './tarjeta-producto.component.html',
    imports: [
        RouterLink,
        RouterLinkActive
    ],
    styleUrls: ['./tarjeta-producto.component.css', '../component.css']
})
export class TarjetaProductoComponent implements OnInit {

  constructor(protected router: Router, private authService: AuthService) { }
  linkImages: string = '';
  userID: string = "462f";

  ngOnInit() {
    this.authService.getImageUrl(this.pathImages).subscribe(url => {
      this.linkImages = url;
    }, error => {
      console.error('Error al obtener la URL de la imagen:', error);
    });
  }

  toggleClicked(event: MouseEvent): void {
    const iconoEstrella = event.target as HTMLElement;
    iconoEstrella.classList.toggle("clicked");
  }
  addClick(){
    this.authService.addUserProduct(this.userID, this.id, 'cesta');
  }

  @Input() nombre: any;
  @Input() nombreDetallado: any;
  @Input() id: any;
  @Input() precio: any;
  @Input() descripcion: any;
  @Input() pathImages: any;


}


