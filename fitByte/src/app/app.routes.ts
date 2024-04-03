import { Routes } from '@angular/router';
import { InicioPage } from './pages/inicio/inicio.component';
import { TiendaPage } from './pages/tienda/tienda.component';
import { CalculadorasPage } from './pages/calculadoras/calculadoras.component';
import { DietasPage } from './pages/dietas/dietas.component';
import { PerfilPage } from './pages/perfil/perfil.component';
import { RutinasPage } from './pages/rutinas/rutinas.component';

export const routes: Routes = [
  { path: '', component: InicioPage },
  { path: 'tienda', component: TiendaPage },
  { path: 'calculadoras', component: CalculadorasPage },
  { path: 'dietas', component: DietasPage },
  { path: 'perfil', component: PerfilPage },
  { path: 'rutinas', component: RutinasPage }
];
