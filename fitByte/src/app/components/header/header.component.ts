import { Component, ElementRef, Renderer2 } from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {IniciarSesionComponent} from '../iniciar-sesion/iniciar-sesion.component';
import {RegistrarUsuarioComponent} from '../registrar-usuario/registrar-usuario.component';
import {DescripcionComponent} from "../descripcion/descripcion.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    DescripcionComponent,
    IniciarSesionComponent,
    RegistrarUsuarioComponent
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css', '../component.css']
})
export class HeaderComponent {
  mostrarRegister: boolean = false;
  mostrarLogin: boolean = false;

  constructor(private renderer: Renderer2, private elementRef: ElementRef,protected router: Router) {}

  showSidebar() {
    const sidebar = this.elementRef.nativeElement.querySelector('.sidebar');
    this.renderer.setStyle(sidebar, 'transform', 'translateX(0)');
  }

  hideSidebar() {
    const sidebar = this.elementRef.nativeElement.querySelector('.sidebar');
    this.renderer.setStyle(sidebar, 'transform', 'translateX(-110%)');
  }

  toggleMostrarLogin() {
    this.mostrarLogin = !this.mostrarLogin;
  }
  
  toggleMostrarRegister() {
    this.mostrarRegister = !this.mostrarRegister;
  }

}
