import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-registrar-usuario',
  standalone: true,
  imports: [],
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css', '../component.css']
})
export class RegistrarUsuarioComponent {

  @Output() volver = new EventEmitter<void>();

  volverClick() {
    this.volver.emit();
  }

}
