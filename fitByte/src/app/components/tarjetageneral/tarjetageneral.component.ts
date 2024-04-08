import { Component, Renderer2 } from '@angular/core';
import {DescripcionComponent} from "../descripcion/descripcion.component";

@Component({
  selector: 'tarjeta-general',
  standalone: true,
  imports: [
    DescripcionComponent
  ],
  templateUrl: './tarjetageneral.component.html',
  styleUrls: ['./tarjetageneral.component.css', '../component.css']
})
export class TarjetageneralComponent {
  mostrarDescripcion: boolean = false;
  constructor(private renderer: Renderer2) {}


  toggleMostrarDescripcion() {
    this.mostrarDescripcion = !this.mostrarDescripcion;
    if (this.mostrarDescripcion) {
      this.mostrarBlur();
    } else {
      this.esconderBlur();
    }
  }

  mostrarBlur() {
    console.log("Blur añadido");
    const fondoDesenfocado = document.getElementById("fondoDesenfocado");

    if (fondoDesenfocado) {
      this.renderer.setStyle(fondoDesenfocado, 'display', 'block');
    }
  }

  esconderBlur() {
    console.log("Blur quitado");
    const fondoDesenfocado = document.getElementById("fondoDesenfocado");
    if (fondoDesenfocado) {
      this.renderer.setStyle(fondoDesenfocado, 'display', 'none');
    }
  }

  ocultarDescripcion() {
    this.mostrarDescripcion = false;
    this.esconderBlur();
  }


}
