import { Component, OnInit } from '@angular/core';
import {Router, NavigationEnd, RouterLink, RouterLinkActive} from '@angular/router';

@Component({
    selector: 'tarjeta-producto',
    standalone: true,
    templateUrl: './tarjeta-producto.component.html',
    imports: [
        RouterLink,
        RouterLinkActive
    ],
    styleUrls: ['./tarjeta-producto.component.css', '../component.css']
})
export class TarjetaProductoComponent implements OnInit {

  constructor(protected router: Router) { }

  ngOnInit(): void {

  }

  toggleClicked(event: MouseEvent): void {
    const iconoEstrella = event.target as HTMLElement;
    iconoEstrella.classList.toggle("clicked");
  }
}

//@input() producto