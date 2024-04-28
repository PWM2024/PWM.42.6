import { Component, Renderer2, Input  } from '@angular/core';
import {DescripcionComponent} from "../descripcion/descripcion.component";
import { AuthService } from '../../../services/fire.service'

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
  constructor(private renderer: Renderer2, private authService: AuthService) {}
  linkImages: string = '';


  toggleMostrarDescripcion() {
    this.mostrarDescripcion = !this.mostrarDescripcion;
    if (this.mostrarDescripcion) {
      this.mostrarBlur();
    } else {
      this.esconderBlur();
    }
  }

  mostrarBlur() {
    const fondoDesenfocado = document.getElementById("fondoDesenfocado");

    if (fondoDesenfocado) {
      this.renderer.setStyle(fondoDesenfocado, 'display', 'block');
    }
  }

  esconderBlur() {
    const fondoDesenfocado = document.getElementById("fondoDesenfocado");
    if (fondoDesenfocado) {
      this.renderer.setStyle(fondoDesenfocado, 'display', 'none');
    }
  }

  ocultarDescripcion() {
    this.mostrarDescripcion = false;
    this.esconderBlur();
  }

  ngOnInit() {
    this.authService.getImageUrl(this.pathImages).subscribe(url => {
      this.linkImages = url;
    }, error => {
      console.error('Error al obtener la URL de la imagen:', error);
    });
  }


  @Input() nombre: any;
  @Input() id: any;
  @Input() descripcion: any;
  @Input() pathImages: any;

}
