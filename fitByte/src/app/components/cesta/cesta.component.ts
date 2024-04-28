import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../../services/fire.service'
import { TarjetaCestaComponent } from '../../components/tarjeta-cesta/tarjeta-cesta.component';

@Component({
  selector: 'app-cesta',
  standalone: true,
  imports: [TarjetaCestaComponent],
  templateUrl: './cesta.component.html',
  styleUrls: ['./cesta.component.css', '../component.css']
})
export class CestaComponent {

  userId: string = '462f';
  cesta : any[] = [];
  descuento: number = 0;
  precio: number = 0;
  unidades: number = 0;

  @Output() volver = new EventEmitter<void>();
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUserByID(this.userId).then((usuario) => {
      if (usuario) {
        let promises = usuario.cesta.map((productoID: any) => {
          return this.authService.getProductByID(productoID).then((producto) => {
            if (producto) {
              this.cesta.push(producto);
              this.precio += producto.precio;
            }
          }).catch((error) => {
            console.error('Error al obtener producto por ID:', error);
          });
        });

        Promise.all(promises).then(() => {
          this.unidades = this.cesta.length;
        });

      } else {
        console.log('Usuario no encontrado.');
      }

      console.log(this.cesta.length);
    }).catch(error => {
      console.error('Error al obtener usuario:', error);
    });

  }

  deleteChild(eventData: any){
    this.cesta = this.cesta.filter((producto) => producto.id !== eventData);
  }

  editQuantity(eventData: any){
    this.unidades += eventData;
  }

  editPrice(eventData: any){
    this.precio += Math.round(eventData);
  }

  volverClick() {
    this.volver.emit();
  }

}
