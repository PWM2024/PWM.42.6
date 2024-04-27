import { Component } from '@angular/core';

@Component({
  selector: 'app-cesta',
  standalone: true,
  imports: [],
  templateUrl: './cesta.component.html',
  styleUrls: ['./cesta.component.css', '../component.css']
})
export class CestaComponent {


  @Output() volver = new EventEmitter<void>();

  volverClick() {
    this.volver.emit();
  }
  
}
