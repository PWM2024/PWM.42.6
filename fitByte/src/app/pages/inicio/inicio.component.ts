import { Component, OnInit, Input } from '@angular/core';
import { TarjetaProductoComponent } from '../../components/tarjeta-producto/tarjeta-producto.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { TarjetageneralComponent } from '../../components/tarjetageneral/tarjetageneral.component';
import { HeaderComponent } from '../../components/header/header.component'
import { SliderComponent } from '../../components/slider/slider.component';
import { AuthService } from '../../../services/fire.service'

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [TarjetaProductoComponent, FooterComponent, TarjetageneralComponent, HeaderComponent, SliderComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})

export class InicioPage implements OnInit {

  rutinasArray: any[] = [];
  productosArray: any[] = [];

  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.authService.getData("rutinas").then(rutinas => {
      rutinas.forEach((doc: { id: any; data: () => any; }) => {
        const rutinaIndex = this.rutinasArray.findIndex(rutina => rutina.id === doc.id);
        if (rutinaIndex === -1) {
          this.rutinasArray.push(doc.data());
        } else {
          console.warn(`No se encontró la rutina con ID ${doc.id}`);
        }
      });
    }).catch(error => {
      console.error('Error fetching rutinas:', error);
    });

    this.authService.getData("productos").then(productos => {
      productos.forEach((doc: { id: any; data: () => any; }) => {
        const productosIndex = this.productosArray.findIndex(productos => productos.id === doc.id);
        if (productosIndex === -1) {
          this.productosArray.push(doc.data());
        } else {
          console.warn(`No se encontró el producto con ID ${doc.id}`);
        }
      });
    }).catch(error => {
      console.error('Error fetching productos:', error);
    });

  }


}
