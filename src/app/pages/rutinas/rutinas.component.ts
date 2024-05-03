import { Component, OnInit } from '@angular/core';
import {FiltroOpcionesComponent} from "../../components/filtro-opciones/filtro-opciones.component";
import {FooterComponent} from "../../components/footer/footer.component";
import {HeaderComponent} from "../../components/header/header.component";
import {TarjetageneralComponent} from "../../components/tarjetageneral/tarjetageneral.component";

import { AuthService } from '../../../services/fire.service'

@Component({
  selector: 'app-rutinas',
  standalone: true,
    imports: [
        FiltroOpcionesComponent,
        FooterComponent,
        HeaderComponent,
        TarjetageneralComponent
    ],
  templateUrl: './rutinas.component.html',
  styleUrl: './rutinas.component.css'
})
export class RutinasPage implements OnInit {

  rutinasArray: any[] = [];

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
      console.log(this.rutinasArray);
    }).catch(error => {
      console.error('Error fetching rutinas:', error);
    });
  }

}
