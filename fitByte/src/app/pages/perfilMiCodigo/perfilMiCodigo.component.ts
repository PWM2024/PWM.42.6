import { Component, OnInit } from '@angular/core';
import { MiPerfilDetallesComponent } from '../../components/mi-perfil-detalles/mi-perfil-detalles.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CodigoPromocionalComponent } from '../../components/codigo-promocional/codigo-promocional.component';
import { AuthService } from '../../../services/fire.service'
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
    selector: 'app-perfil',
    standalone: true,
    templateUrl: './perfilMiCodigo.component.html',
    styleUrl: './perfilMiCodigo.component.css',
    imports: [MiPerfilDetallesComponent, CodigoPromocionalComponent, FooterComponent, CommonModule, HeaderComponent]
})

export class perfilMiCodigo implements OnInit {

  usuarioEncontrado: any;
  userId: string = '';
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const datosUserStr = sessionStorage.getItem('datosUser');
    if (datosUserStr !== null) {
      const datosUser = JSON.parse(datosUserStr);
      if (typeof datosUser === 'object' && datosUser.uid !== undefined) {
        this.userId = datosUser.uid;
        this.isLoggedIn = true;
      }
    }
    
    if (this.isLoggedIn) {
      this.authService.getUserByID(this.userId).then((usuario) => {
        if (usuario) {
          this.usuarioEncontrado = usuario;
        } else {
          console.log('Usuario no encontrado.');
        }
      }).catch(error => {
        console.error('Error al obtener usuario:', error);
      });
    }
  }
}