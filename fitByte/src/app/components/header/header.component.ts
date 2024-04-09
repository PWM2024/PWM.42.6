import { Component, ElementRef, Renderer2 } from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css', '../component.css']
})
export class HeaderComponent {

  constructor(private renderer: Renderer2, private elementRef: ElementRef,protected router: Router) {}

  showSidebar() {
    const sidebar = this.elementRef.nativeElement.querySelector('.sidebar');
    this.renderer.setStyle(sidebar, 'transform', 'translateX(0)');
  }

  hideSidebar() {
    const sidebar = this.elementRef.nativeElement.querySelector('.sidebar');
    this.renderer.setStyle(sidebar, 'transform', 'translateX(-110%)');
  }

}
