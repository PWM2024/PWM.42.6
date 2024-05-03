import { Component, OnInit } from '@angular/core';
import { MiPerfilDetallesComponent } from '../../components/mi-perfil-detalles/mi-perfil-detalles.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { TarjetaHistorialComprasComponent } from '../../components/tarjeta-historial-compras/tarjeta-historial-compras.component';
import { AuthService } from '../../../services/fire.service'

import { CommonModule, NgIf } from '@angular/common';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
    selector: 'app-perfil',
    standalone: true,
    templateUrl: './perfilHistorial.component.html',
    styleUrl: './perfilHistorial.component.css',
    imports: [MiPerfilDetallesComponent, TarjetaHistorialComprasComponent, FooterComponent, CommonModule, HeaderComponent]

})

export class perfilHistorial implements OnInit {

  comprasId: any[] = [];
  comprasArray: any[] = [];
  userId: string = '';
  error: any;

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
