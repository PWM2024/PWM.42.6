import { Component } from '@angular/core';

@Component({
  selector: 'app-form-calculadora-imc',
  standalone: true,
  imports: [],
  templateUrl: './form-calculadora-imc.component.html',
  styleUrls: ['./form-calculadora-imc.component.css', '../component.css']
})
export class FormCalculadoraIMCComponent {

  calculoIMC(): void {
    let peso = (<HTMLInputElement>document.getElementById("peso")).value;
    let altura = (<HTMLInputElement>document.getElementById("altura")).value;

    if (isNaN(parseFloat(peso)) || isNaN(parseFloat(altura)) || parseFloat(altura) < 100 || parseFloat(peso) < 1){
      return;
    }

    let imc = parseFloat(peso) / (parseFloat(altura) / 100) ** 2;

    let detallesIMC = document.getElementById("detallesIMC");

    let elementos = detallesIMC?.querySelectorAll(".imcInfo .imcDetalles label");

    if (elementos && elementos.length >= 2) {
      let texto1: string;
      let texto2: string;

      if (imc < 18.5) {
        texto1 = `<br> <strong>Tu IMC es: ${imc.toFixed(2)}</strong> <br><br> Actualmente usted se encuentra en peso por
        debajo de lo normal. <br> Sigua nuestras recomendaciones de rutinas y dietas para mejorar su situación física.`;
        texto2 = `<br> Le recomendamos que para subir de peso siga nuestra rutina de Hipertrofia, Resistencia y
        Peso corporal o en su defecto la rutina de Entrenamiento en casa.<br> En cuanto a las dietas para aumentar su peso
        le recomendamos la dieta rica en Grasa y Carbohidratos y la dieta de la Zona.`;
      } else if (imc > 18.5 && imc < 25) {
        texto1 = `<br> <strong>Tu IMC es: ${imc.toFixed(2)}</strong> <br><br> Actualmente usted se encuentra en un
        peso normal. <br> Sigua nuestras recomendaciones de rutinas y dietas para mantenerse en su condición actual.`;
        texto2 = `<br> Le recomendamos que para mantenga su peso siga nuestra rutina de Cardio, Peso corporal y
        la rutina HIIT ya que son entrenamientos de una intensidad moderada.<br> En cuanto a las dietas para mantener su peso,
        le recomendamos la dieta rica en Proteínas, la dieta DASH y la dieta rica en Fibras.`;
      } else {
        texto1 = `<br> <strong>Tu IMC es: ${imc.toFixed(2)}</strong> <br><br> Actualmente usted se encuentra en peso por
        encima de lo normal. <br> Sigua nuestras recomendaciones de rutinas y dietas para mejorar su situación física.`;
        texto2 = `<br> Le recomendamos que para reduzca su peso siga nuestra rutina de Alta Intensidad y Baja Duración,
        Potencia y Plyometrics ya que son entrenamientos de potencia y alta intensidad.<br> En cuanto a las dietas para reducir su peso,
        le recomendamos la dieta rica en Avena, la dieta Cetogénica y la dieta Flexitariana.`;
      }

      elementos[0].innerHTML = texto1;
      elementos[1].innerHTML = texto2;
    }
  }

}
