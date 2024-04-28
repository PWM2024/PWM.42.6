import { Component, Input } from '@angular/core';

@Component({
  selector: 'tarjeta-cesta',
  standalone: true,
  imports: [],
  templateUrl: './tarjeta-cesta.component.html',
  styleUrls: ['./tarjeta-cesta.component.css', '../component.css']
})
export class TarjetaCestaComponent {
  @Input() precio: any;
  @Input() id: any;
  @Input() nombre: any;
  @Input() nombreDetallado: any;

  ngOnInit(): void {

  }
}
