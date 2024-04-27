import { Component } from '@angular/core';
import { MiPerfilDetallesComponent } from '../../components/mi-perfil-detalles/mi-perfil-detalles.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { PerfilFormComponent } from '../../components/perfil-form/perfil-form.component';
import { StatsFormComponent } from '../../components/stats-form/stats-form.component';
import { AuthService } from '../../../services/fire.service'
import {HeaderComponent} from "../../components/header/header.component";

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
    this.authService.getUserByID("462f").then((usuario) => {
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
