import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'tarjeta-producto',
  standalone: true,
  templateUrl: './tarjeta-producto.component.html',
  styleUrls: ['./tarjeta-producto.component.css', '../component.css']
})
export class TarjetaProductoComponent implements OnInit {

  constructor(protected router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Acciones que deseas realizar cuando cambie la ruta
        console.log('Ruta actual:', this.router.url);
      }
    });
  }
}