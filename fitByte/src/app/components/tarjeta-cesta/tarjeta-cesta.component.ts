import { Component, Input, Output, ApplicationRef, EventEmitter  } from '@angular/core';
import { AuthService } from '../../../services/fire.service'
import { OutletContext } from '@angular/router';

@Component({
  selector: 'tarjeta-cesta',
  standalone: true,
  imports: [],
  templateUrl: './tarjeta-cesta.component.html',
  styleUrls: ['./tarjeta-cesta.component.css']
})
export class TarjetaCestaComponent {
  @Input() precio: any;
  @Input() id: any;
  @Input() nombre: any;
  @Input() nombreDetallado: any;
  @Input() pathImages: any;

  linkImages: string = '';
  cantidad: number = 1;
  userId: string = '462f';


  constructor(private authService: AuthService, private appRef: ApplicationRef) { }

  @Output() componentDeleted = new EventEmitter<string>();

  addQuantity(){
    this.cantidad++;
  }


  removeQuantity(){
    if(this.cantidad === 1){
      this.authService.deleteProduct(this.userId, this.id, 'cesta').then(() => {
        this.componentDeleted.emit(this.id);
        this.cantidad--;
      });
    }else{
      this.cantidad--;
    }

  }


  ngOnInit() {
    this.authService.getImageUrl(this.pathImages).subscribe(url => {
      console.log('URL de la imagen:', url);
      this.linkImages = url;
    }, error => {
      console.error('Error al obtener la URL de la imagen:', error);
    });
  }
}
