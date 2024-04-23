import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
  imports: [],
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css', '../component.css']
})
export class IniciarSesionComponent {
  @Output() volver = new EventEmitter<void>();

  volverClick() {
    this.volver.emit();
  }
}
