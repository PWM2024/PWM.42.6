import { Component } from '@angular/core';
import { MiPerfilDetallesComponent } from '../../components/mi-perfil-detalles/mi-perfil-detalles.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { PerfilFormComponent } from '../../components/perfil-form/perfil-form.component';
import { StatsFormComponent } from '../../components/stats-form/stats-form.component';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [MiPerfilDetallesComponent, StatsFormComponent, PerfilFormComponent, FooterComponent],
  templateUrl: './perfilDatos.component.html',
  styleUrl: './perfilDatos.component.css'
})

export class PerfilDatosPage {

}
