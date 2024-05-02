import { Component, ElementRef, Injectable, Renderer2 } from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import { AuthService } from '../../../services/auth.services';
import {IniciarSesionComponent} from '../iniciar-sesion/iniciar-sesion.component';
import {RegistrarUsuarioComponent} from '../registrar-usuario/registrar-usuario.component';
import {DescripcionComponent} from "../descripcion/descripcion.component";
import {CestaComponent} from "../cesta/cesta.component";

@Injectable()
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    DescripcionComponent,
    IniciarSesionComponent,
    RegistrarUsuarioComponent,
    CestaComponent
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css', '../component.css']
})
export class HeaderComponent {
  mostrarRegister: boolean = false;
  mostrarLogin: boolean = false;
  mostrarCesta: boolean = false;
  LoggedIn: boolean = false;

  constructor(private renderer: Renderer2, private elementRef: ElementRef,protected router: Router,
              private authService: AuthService) {}

  ngOnInit() {
    const userId = sessionStorage.getItem('datosUser') as any;
    if (userId) {
      this.authService.isLoggedIn(userId.uid).then(() => {
        this.LoggedIn = true;
        console.log('Logged in');
      }).catch(() => {
        console.log('Not logged in');
        this.LoggedIn = false;
      });
    }
  }

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
    this.mostrarRegister = false;
  }
  
  toggleMostrarRegister() {
    this.mostrarRegister = !this.mostrarRegister;
    this.mostrarLogin = false;
  }

  toggleMostrarPerfil() {
    this.LoggedIn = false;
    sessionStorage.removeItem('datosUser');
  }

  toggleMostrarCesta() {
    this.mostrarCesta = !this.mostrarCesta;
    const prueba = document.querySelector('.sidebar') as HTMLDivElement;
    const cart = document.getElementById('cesta-container') as HTMLDivElement;
    const overlay = document.getElementById('overlay') as HTMLDivElement;

    if (this.mostrarCesta){
      prueba.style.transform = 'translateX(-110%)';
      cart.classList.add('open');
      overlay.style.display = 'block';
      setTimeout(()=> {
        overlay.classList.add('active');
      }, 0);
    } else {
      cart.classList.remove('open');
      overlay.classList.remove('active');
      setTimeout(()=>{
        overlay.style.display = 'none';
      }, 500);
    }
  }


}
