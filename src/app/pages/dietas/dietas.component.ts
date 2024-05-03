import { Component, OnInit } from '@angular/core';
import {HeaderComponent, } from "../../components/header/header.component";
import {TarjetageneralComponent} from "../../components/tarjetageneral/tarjetageneral.component";
import {FooterComponent} from "../../components/footer/footer.component";
import {TarjetaProductoComponent} from "../../components/tarjeta-producto/tarjeta-producto.component";
import {FiltroOpcionesComponent} from "../../components/filtro-opciones/filtro-opciones.component";

import { AuthService } from '../../../services/fire.service'

@Component({
  selector: 'app-dietas',
  standalone: true,
  imports: [HeaderComponent,
    TarjetageneralComponent,
    FooterComponent,
    TarjetaProductoComponent,
    FiltroOpcionesComponent,
  ],
  templateUrl: './dietas.component.html',
  styleUrl: './dietas.component.css'
})
export class DietasPage implements OnInit{

  dietasArray: any[] = [];

  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.authService.getData("dietas").then(dietas => {
      dietas.forEach((doc: { id: any; data: () => any; }) => {
        const rutinaIndex = this.dietasArray.findIndex(dieta => dieta.id === doc.id);
        if (rutinaIndex === -1) {
          this.dietasArray.push(doc.data());
        } else {
          console.warn(`No se encontró el producto con ID ${doc.id}`);
        }
      });
    }).catch(error => {
      console.error('Error fetching dietas:', error);
    });
  }
}
