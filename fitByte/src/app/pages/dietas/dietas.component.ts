import { Component } from '@angular/core';
import {HeaderComponent, } from "../../components/header/header.component";
import {TarjetageneralComponent} from "../../components/tarjetageneral/tarjetageneral.component";
import {FooterComponent} from "../../components/footer/footer.component";
import {TarjetaProductoComponent} from "../../components/tarjeta-producto/tarjeta-producto.component";
import {FiltroOpcionesComponent} from "../../components/filtro-opciones/filtro-opciones.component";

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
export class DietasPage {
  productos = [
    {id:1},
    {id:2},
    {id:3},
    {id:4},
    {id:5},
    {id:6},
    {id:7},
    {id:8},
    {id:9},
    {id:10},
    {id:11},
    {id:12},
    {id:13},
    {id:14},
    {id:15},
    {id:16},
    {id:17},
    {id:18},
  ]
}
