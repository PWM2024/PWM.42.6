import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FiltroOpcionesComponent } from '../../components/filtro-opciones/filtro-opciones.component';
import { FiltroPreciosComponent } from '../../components/filtro-precios/filtro-precios.component';
import { TarjetaProductoComponent } from '../../components/tarjeta-producto/tarjeta-producto.component';
import { OrdenarPorDesplegableComponent } from '../../components/ordenar-por-desplegable/ordenar-por-desplegable.component';
import { AuthService } from '../../../services/fire.service'

@Component({
  selector: 'app-tienda-buscar',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FiltroOpcionesComponent, FiltroPreciosComponent, TarjetaProductoComponent, OrdenarPorDesplegableComponent, HeaderComponent],
  templateUrl: './tienda-buscar.component.html',
  styleUrls: ['./tienda-buscar.component.css', '../../components/component.css']
})
export class TiendaBuscarComponent implements OnInit{
  productosArray: any[] = [];
  opciones: any[] = ['Alto en proteínas', 'Sin Gluten', 'Alto en Fibras'];

  constructor(private authService: AuthService) {}
  ngOnInit(): void {

    this.authService.getData("productos").then(productos => {
      productos.forEach((doc: { id: any; data: () => any; }) => {
        const productosIndex = this.productosArray.findIndex(productos => productos.id === doc.id);
        if (productosIndex === -1) {
          this.productosArray.push(doc.data());
        } else {
          console.warn(`No se encontró el producto con ID ${doc.id}`);
        }
      });
      console.log(this.productosArray);
    }).catch(error => {
      console.error('Error fetching productos:', error);
    });
  }
}
