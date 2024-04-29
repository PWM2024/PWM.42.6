import { Component, OnInit } from '@angular/core';
import { MiPerfilDetallesComponent } from '../../components/mi-perfil-detalles/mi-perfil-detalles.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CodigoPromocionalComponent } from '../../components/codigo-promocional/codigo-promocional.component';
import { AuthService } from '../../../services/fire.service'

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [MiPerfilDetallesComponent, CodigoPromocionalComponent, FooterComponent],
  templateUrl: './perfilMiCodigo.component.html',
  styleUrl: './perfilMiCodigo.component.css'
})

export class perfilMiCodigo implements OnInit {

  usuarioEncontrado: any;
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
        this.usuarioEncontrado = usuario;
        console.log('Usuario obtenido:', usuario);
      } else {
        console.log('Usuario no encontrado.');
      }
    }).catch(error => {
      console.error('Error al obtener usuario:', error);
    });
  }

}
