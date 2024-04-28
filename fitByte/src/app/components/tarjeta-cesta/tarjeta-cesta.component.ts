import { Component, Input } from '@angular/core';
import { AuthService } from '../../../services/fire.service'

@Component({
  selector: 'tarjeta-cesta',
  standalone: true,
  imports: [],
  templateUrl: './tarjeta-cesta.component.html',
  styleUrls: ['./tarjeta-cesta.component.css', '../component.css']
})
export class TarjetaCestaComponent {
  @Input() precio: any;
  @Input() id: any;
  @Input() nombre: any;
  @Input() nombreDetallado: any;
  @Input() pathImages: any;

  linkImages: string = '';


  constructor(private authService: AuthService) { }
  ngOnInit() {
    this.authService.getImageUrl(this.pathImages).subscribe(url => {
      console.log('URL de la imagen:', url);
      this.linkImages = url;
    }, error => {
      console.error('Error al obtener la URL de la imagen:', error);
    });
  }
}
