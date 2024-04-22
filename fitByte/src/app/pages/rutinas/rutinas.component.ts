import { Component } from '@angular/core';
import {FiltroOpcionesComponent} from "../../components/filtro-opciones/filtro-opciones.component";
import {FooterComponent} from "../../components/footer/footer.component";
import {HeaderComponent} from "../../components/header/header.component";
import {TarjetageneralComponent} from "../../components/tarjetageneral/tarjetageneral.component";

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


export class RutinasPage {
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
