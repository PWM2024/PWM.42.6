import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'imc-detalles',
  standalone: true,
  imports: [],
  templateUrl: './imc-detalles.component.html',
  styleUrls: ['./imc-detalles.component.css', '../component.css']
})
export class ImcDetallesComponent implements OnChanges {
  @Input() imc = "";
  resultadoIMC = 0;
  min = 0;
  mean = 0;

  ngOnChanges(){
    if (this.imc !== ''){
      this.resultadoIMC = Number(this.imc);
    }
  }

  constructor() {
    this.min = 18.5;
    this.mean = 25.0;
  }

}
