import { Routes } from '@angular/router';
import { InicioPage } from './pages/inicio/inicio.component';
import { TiendaPage } from './pages/tienda/tienda.component';
import { CalculadorasPage } from './pages/calculadoras/calculadoras.component';
import { DietasPage } from './pages/dietas/dietas.component';
import { PerfilDatosPage } from './pages/perfilDatos/perfilDatos.component';
import {perfilHistorial} from './pages/perfilHistorial/perfilHistorial.component';
import { RutinasPage } from './pages/rutinas/rutinas.component';


export const routes: Routes = [
  { path: '', component: InicioPage },
  { path: 'tienda', component: TiendaPage },
  { path: 'calculadoras', component: CalculadorasPage },
  { path: 'dietas', component: DietasPage },
  { path: 'perfil/mis-datos', component: PerfilDatosPage },
  { path: 'perfil/historial-de-compras', component: perfilHistorial },
  { path: 'perfil/lista-de-deseos', component: PerfilDatosPage },
  { path: 'perfil/codigo-promocional', component: PerfilDatosPage },
  { path: 'rutinas', component: RutinasPage },
];
