import { Routes } from '@angular/router';
import { InicioPage } from './pages/inicio/inicio.component';
import { TiendaPage } from './pages/tienda/tienda.component';
import { TiendaBuscarComponent } from './pages/tienda-buscar/tienda-buscar.component';
import { DietasPage } from './pages/dietas/dietas.component';
import { PerfilPage } from './pages/perfil/perfil.component';
import { RutinasPage } from './pages/rutinas/rutinas.component';
import { CalculadoraIMCComponent } from './pages/calculadora-imc/calculadora-imc.component';
import { CalculadoraKcalComponent } from './pages/calculadora-kcal/calculadora-kcal.component';

export const routes: Routes = [
  { path: '', component: InicioPage },
  { path: 'tienda', component: TiendaPage },
  { path: 'tiendaBuscar', component: TiendaBuscarComponent },
  { path: 'imc', component: CalculadoraIMCComponent },
  { path: 'kcal', component: CalculadoraKcalComponent },
  { path: 'dietas', component: DietasPage },
  { path: 'perfil', component: PerfilPage },
  { path: 'rutinas', component: RutinasPage }
];
