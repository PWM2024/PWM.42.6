import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-form-calculadora-imc',
  standalone: true,
  imports: [],
  templateUrl: './form-calculadora-imc.component.html',
  styleUrls: ['./form-calculadora-imc.component.css', '../component.css']
})
export class FormCalculadoraIMCComponent {
  pesoUsuario = "";
  alturaUsuario = "";
  imc = 0;
  @Output() imcCalculado = new EventEmitter<number>();

  getPesoUser(event:any){
    this.pesoUsuario = event.target.value;
  }

  getAlturaUser(event:any){
    this.alturaUsuario = event.target.value;
  }

  calcularIMC(event:any){
    event.preventDefault()
    let peso = parseFloat(this.pesoUsuario);
    let altura = parseFloat(this.alturaUsuario);

    console.log(peso);
    console.log(altura);

    this.imc = (peso/(altura/100)**2);
    this.imcCalculado.emit(this.imc);
  }

}
