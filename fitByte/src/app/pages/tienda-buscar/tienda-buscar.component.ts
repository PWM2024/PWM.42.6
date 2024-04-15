import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FiltroOpcionesComponent } from '../../components/filtro-opciones/filtro-opciones.component';
import { FiltroPreciosComponent } from '../../components/filtro-precios/filtro-precios.component';
import { TarjetaProductoComponent } from '../../components/tarjeta-producto/tarjeta-producto.component';
import { OrdenarPorDesplegableComponent } from '../../components/ordenar-por-desplegable/ordenar-por-desplegable.component';

@Component({
  selector: 'app-tienda-buscar',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FiltroOpcionesComponent, FiltroPreciosComponent, TarjetaProductoComponent, OrdenarPorDesplegableComponent],
  templateUrl: './tienda-buscar.component.html',
  styleUrls: ['./tienda-buscar.component.css', '../../components/component.css']
})
export class TiendaBuscarComponent {
  productos = [
    {id: 1},
    {id: 2},
    {id: 3},
    {id: 4},
    {id: 5},
    {id: 6},
    {id: 7},
    {id: 8},
    {id: 9},
    {id: 10},
    {id: 11},
    {id: 12},
    {id: 13},
    {id: 14}
  ];
}
