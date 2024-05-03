import { Component, OnInit } from '@angular/core';
import { MiPerfilDetallesComponent } from '../../components/mi-perfil-detalles/mi-perfil-detalles.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { TarjetaHistorialComprasComponent } from '../../components/tarjeta-historial-compras/tarjeta-historial-compras.component';
import { TarjetaListaDeseosComponent } from '../../components/tarjeta-lista-deseos/tarjeta-lista-deseos.component';
import { AuthService } from '../../../services/fire.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
    selector: 'app-perfil',
    standalone: true,
    templateUrl: './perfilListaDeseos.component.html',
    styleUrls: ['./perfilListaDeseos.component.css'],
    imports: [MiPerfilDetallesComponent, TarjetaHistorialComprasComponent, TarjetaListaDeseosComponent, FooterComponent, CommonModule, HeaderComponent]

})

export class perfilListaDeseos implements OnInit {
  deseosId: any[] = [];
  productosArray: any[] = [];
  userId: string = '';
  error: boolean = false;
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const datosUserStr = sessionStorage.getItem('datosUser');
    if (datosUserStr !== null) {
      const datosUser = JSON.parse(datosUserStr);
      if (typeof datosUser === 'object' && datosUser.uid !== undefined) {
        this.isLoggedIn = true; 
        this.userId = datosUser.uid;

        this.authService.getUserByID(this.userId).then((usuario) => {
          console.log(usuario);
          if (usuario) {
            this.deseosId = usuario.listaDeseos;
            if (!this.deseosId || this.deseosId.length === 0) {
              console.log('No hay productos en la lista de deseos.');
              this.error = true; 
              return;
            }
            if (Array.isArray(this.deseosId)) {
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
              console.error('deseosId is not an array:', this.deseosId);
            }
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
  }
}