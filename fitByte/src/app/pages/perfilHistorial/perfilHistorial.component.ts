import { Component } from '@angular/core';
import { MiPerfilDetallesComponent } from '../../components/mi-perfil-detalles/mi-perfil-detalles.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { TarjetaHistorialComprasComponent } from '../../components/tarjeta-historial-compras/tarjeta-historial-compras.component';
import { AuthService } from '../../../services/fire.service'
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [MiPerfilDetallesComponent, TarjetaHistorialComprasComponent, FooterComponent, HeaderComponent],
  templateUrl: './perfilHistorial.component.html',
  styleUrl: './perfilHistorial.component.css'
})

export class perfilHistorial {

  comprasId: any[] = [];
  comprasArray: any[] = [];


  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.authService.getUserByID("462f").then((usuario) => {
      if (usuario) {
        console.log(usuario);
        this.comprasId = usuario.compras;

        this.comprasId.forEach(compraId => {
          this.authService.getPurchasesByID(compraId).then((compra) => {
            if (compra) {
              this.comprasArray.push(compra);
              console.log(compra)
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
