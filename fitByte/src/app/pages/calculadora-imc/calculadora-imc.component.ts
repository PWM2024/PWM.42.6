import { Component } from '@angular/core';
import { FormCalculadoraIMCComponent } from '../../components/form-calculadora-imc/form-calculadora-imc.component';
import { ImcDetallesComponent } from '../../components/imc-detalles/imc-detalles.component';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CestaComponent } from '../../components/cesta/cesta.component';
import { SliderComponent } from '../../components/slider/slider.component';

@Component({
  selector: 'app-calculadora-imc',
  standalone: true,
  imports: [FormCalculadoraIMCComponent, ImcDetallesComponent, HeaderComponent, FooterComponent, CestaComponent, SliderComponent],
  templateUrl: './calculadora-imc.component.html',
  styleUrl: './calculadora-imc.component.css'
})
export class CalculadoraIMCComponent {
  detalles = [
    { id: "id1", content: []},
    { id: "id2", content: []},
  ]
}
