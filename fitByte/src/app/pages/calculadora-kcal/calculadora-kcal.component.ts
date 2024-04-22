import { Component } from '@angular/core';
import { FormCalculadoraKcalComponent } from '../../components/form-calculadora-kcal/form-calculadora-kcal.component';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ListaKcalComponent } from '../../components/lista-kcal/lista-kcal.component';
import { SliderComponent } from '../../components/slider/slider.component';

@Component({
  selector: 'app-calculadora-kcal',
  standalone: true,
  imports: [FormCalculadoraKcalComponent, HeaderComponent, FooterComponent, ListaKcalComponent, SliderComponent],
  templateUrl: './calculadora-kcal.component.html',
  styleUrls: ['./calculadora-kcal.component.css']
})
export class CalculadoraKcalComponent {

}
