import { Component, OnInit } from '@angular/core';
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

  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.authService.getRutinas().then(rutinas => {
      rutinas.forEach((doc: { id: any; data: () => any; }) => {
        console.log(doc.id, " => ", doc.data());
      });
    }).catch(error => {
      console.error('Error fetching rutinas:', error);
    });
  }
  // async getRutinas(): Promise<void> {
  //   this.rutinas = await this.authService.getRutinas();
  //   console.log('Rutinas obtenidas:', this.rutinas);
  // }

  productos = [
    { id: "id1", content: []},
    { id: "id2", content: []},
  ]

  rutinas = [
    { id: "id1", content: []},
    { id: "id2", content: []},
    { id: "id3", content: []},
    { id: "id4", content: []},
    { id: "id5", content: []},
    { id: "id6", content: []},
  ]
}
