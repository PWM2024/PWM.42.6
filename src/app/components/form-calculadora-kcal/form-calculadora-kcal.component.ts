import { Component, Input, Renderer2, ViewChild, AfterViewInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'form-calculadora-kcal',
  standalone: true,
  imports: [],
  templateUrl: './form-calculadora-kcal.component.html',
  styleUrls: ['./form-calculadora-kcal.component.css', '../component.css']
})
export class FormCalculadoraKcalComponent implements AfterViewInit, OnChanges{
  @Input() alimentos: any[] = [];
  @ViewChild('select') select: any;
  @ViewChild('cantidad') inputCantidad: any;
  @Output() alimentoElegido = new EventEmitter<Object>();
  factor: number = 0;


  constructor(private renderer: Renderer2) { }

  ngOnChanges(changes: SimpleChanges): void {
    if ('alimentos' in changes) {
      if (this.alimentos && this.alimentos.length === 20) {
        this.populateSelect();
      }
    }
  }

  ngAfterViewInit() {}

  private populateSelect() {
    this.alimentos.forEach((alimento) => {
      let option = this.renderer.createElement('option');
      option.textContent = alimento.nombre;
      option.value = alimento.kcal_por_cada_100gr;
      this.renderer.appendChild(this.select.nativeElement, option);
    });
  }

  updateFactor() {
    if (this.inputCantidad.nativeElement.value !== '' && this.inputCantidad.nativeElement.value !== 'Alimentos') {
      this.factor = Number(this.inputCantidad.nativeElement.value) / 100;
    }
  }

  addAlimento(){
    if (this.factor !== 0){
      let nombre = this.select.nativeElement.options[this.select.nativeElement.selectedIndex].text;
      let kcal = this.select.nativeElement.options[this.select.nativeElement.selectedIndex].value;
      let resultadoKcal = Number(kcal) * this.factor;
      resultadoKcal = Math.round(resultadoKcal * 100) / 100;
      this.alimentoElegido.emit({nombre: nombre, kcal: resultadoKcal});
      console.log(this.alimentoElegido);
    }
  }
}
