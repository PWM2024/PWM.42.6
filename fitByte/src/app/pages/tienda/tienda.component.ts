import { Component } from '@angular/core';
import { TarjetaProductoComponent } from '../../components/tarjeta-producto/tarjeta-producto.component';
import { SliderComponent } from '../../components/slider/slider.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component'
import { AuthService } from '../../../services/fire.service'

@Component({
  selector: 'app-tienda',
  standalone: true,
  imports: [TarjetaProductoComponent, SliderComponent, FooterComponent, HeaderComponent],
  templateUrl: './tienda.component.html',
  styleUrl: './tienda.component.css'
})
export class TiendaPage {

  promocionesArray: any[] = [];
  novedadesArray: any[] = [];

  constructor(private authService: AuthService) {}
  ngOnInit(): void {


    this.authService.getData("productos").then(productos => {
      productos.forEach((doc: { id: any; data: () => any; }) => {
        if(doc.data().novedad){
          this.novedadesArray.push(doc.data());
        }

        if(doc.data().promocion){
          this.promocionesArray.push(doc.data());
        }

      });
    }).catch(error => {
      console.error('Error fetching productos:', error);
    });
  }
}
