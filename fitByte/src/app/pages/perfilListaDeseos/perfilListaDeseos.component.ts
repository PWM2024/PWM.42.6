import { Component, OnInit } from '@angular/core';
import { MiPerfilDetallesComponent } from '../../components/mi-perfil-detalles/mi-perfil-detalles.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { TarjetaHistorialComprasComponent } from '../../components/tarjeta-historial-compras/tarjeta-historial-compras.component';
import { TarjetaListaDeseosComponent } from '../../components/tarjeta-lista-deseos/tarjeta-lista-deseos.component';
import { AuthService } from '../../../services/fire.service'

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [MiPerfilDetallesComponent, TarjetaHistorialComprasComponent, TarjetaListaDeseosComponent, FooterComponent],
  templateUrl: './perfilListaDeseos.component.html',
  styleUrl: './perfilListaDeseos.component.css'
})

export class perfilListaDeseos implements OnInit {

  deseosId: any[] = [];
  productosArray: any[] = [];
  userId: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const datosUserStr = sessionStorage.getItem('datosUser');
    if (datosUserStr !== null) {
      const datosUser = JSON.parse(datosUserStr);
      if (typeof datosUser === 'object' && datosUser.uid !== undefined) {
        this.userId = datosUser.uid;
      }
    }
    
    this.authService.getUserByID(this.userId).then((usuario) => {
      if (usuario) {
        this.deseosId = usuario.listaDeseos;

        this.deseosId.forEach(producto => {
          this.authService.getProductByID(producto).then((producto) => {
            if (producto) {
              this.productosArray.push(producto);
              console.log(producto)
            } else {
              console.log('Compra no encontrado.');
            }

          }).catch(error => {
            console.error('Error al obtener compra:', error);
          });
        });

      } else {
        console.log('Usuario no encontrado.');
      }
    }).catch(error => {
      console.error('Error al obtener usuario:', error);
    });

  }

}
