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

  @Output() volver = new EventEmitter<void>();
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUserByID(this.userId).then((usuario) => {
      if (usuario) {
        usuario.cesta.forEach((productoID: any) => {
          this.authService.getProductByID(productoID).then((producto) => {
            if (producto) {
              this.cesta.push(producto);
            }
          }).catch((error) => {
            console.error('Error al obtener producto por ID:', error);
          });
        });
        console.log(this.cesta)
      } else {
        console.log('Usuario no encontrado.');
      }
    }).catch(error => {
      console.error('Error al obtener usuario:', error);
    });

  }

  volverClick() {
    this.volver.emit();
  }



}
