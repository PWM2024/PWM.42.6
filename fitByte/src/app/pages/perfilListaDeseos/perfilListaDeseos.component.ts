import { Component, OnInit } from '@angular/core';
import { MiPerfilDetallesComponent } from '../../components/mi-perfil-detalles/mi-perfil-detalles.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { TarjetaHistorialComprasComponent } from '../../components/tarjeta-historial-compras/tarjeta-historial-compras.component';
import { TarjetaListaDeseosComponent } from '../../components/tarjeta-lista-deseos/tarjeta-lista-deseos.component';
import { AuthService } from '../../../services/fire.service'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [MiPerfilDetallesComponent, TarjetaHistorialComprasComponent, TarjetaListaDeseosComponent, FooterComponent, CommonModule],
  templateUrl: './perfilListaDeseos.component.html',
  styleUrl: './perfilListaDeseos.component.css'
})

export class perfilListaDeseos implements OnInit {
  deseosId: any[] = [];
  productosArray: any[] = [];
  userId: string = '';
  error: boolean = false;

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
      console.log(usuario);
      if (usuario) {
        this.deseosId = usuario.listaDeseos;

        this.deseosId.forEach(producto => {
          this.authService.getProductByID(producto).then((producto) => {
            if (producto) {
              this.productosArray.push(producto);
              console.log(producto);
            } else {
              console.log('Producto no encontrado.');
            }
          }).catch(error => {
            console.error('Error al obtener producto:', error);
            this.error = true; 
          });
        });

      } else {
        console.log('Usuario no encontrado.');
        this.error = true; 
      }
    }).catch(error => {
      console.error('Error al obtener usuario:', error);
      this.error = true; 
    });
  }
}
