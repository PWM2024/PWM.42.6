import { Component } from '@angular/core';
import { AuthService } from '../../../services/fire.service';
import { MiPerfilDetallesComponent } from '../../components/mi-perfil-detalles/mi-perfil-detalles.component';
import { StatsFormComponent } from '../../components/stats-form/stats-form.component';
import { PerfilFormComponent } from '../../components/perfil-form/perfil-form.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [MiPerfilDetallesComponent, StatsFormComponent, PerfilFormComponent, FooterComponent, HeaderComponent],
  templateUrl: './perfilDatos.component.html',
  styleUrl: './perfilDatos.component.css'
})
export class PerfilDatosPage {
  usuarioEncontrado: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const datosUserStr = sessionStorage.getItem('datosUser');
    if (datosUserStr !== null) {
      const datosUser = JSON.parse(datosUserStr);
      if (typeof datosUser === 'object' && datosUser.uid !== undefined) {
        const userUid = datosUser.id;
        this.authService.getUserByID(userUid).then((usuario) => {
          if (usuario) {
            this.usuarioEncontrado = usuario;
          } else {
            console.log('Usuario no encontrado.');
          }
        }).catch(error => {
          console.error('Error al obtener usuario:', error);
        });
      } else {
        console.error('No se encontraron datos de usuario válidos en sessionStorage');
      }
    } else {
      console.error('No se encontraron datos de usuario en sessionStorage');
    }
  }
}
