import { Component, Input } from '@angular/core';

@Component({
  selector: 'imc-detalles',
  standalone: true,
  imports: [],
  templateUrl: './imc-detalles.component.html',
  styleUrls: ['./imc-detalles.component.css', '../component.css']
})
export class ImcDetallesComponent {
  @Input() imc: any
}
