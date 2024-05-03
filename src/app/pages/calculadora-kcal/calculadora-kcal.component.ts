import { Component } from '@angular/core';
import { FormCalculadoraKcalComponent } from '../../components/form-calculadora-kcal/form-calculadora-kcal.component';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ListaKcalComponent } from '../../components/lista-kcal/lista-kcal.component';
import { SliderComponent } from '../../components/slider/slider.component';
import { AuthService } from '../../../services/fire.service'

@Component({
  selector: 'app-calculadora-kcal',
  standalone: true,
  imports: [FormCalculadoraKcalComponent, HeaderComponent, FooterComponent, ListaKcalComponent, SliderComponent],
  templateUrl: './calculadora-kcal.component.html',
  styleUrls: ['./calculadora-kcal.component.css']
})
export class CalculadoraKcalComponent {
  /*LISTA DE ALIMENTOS CON ID, Kcal_por_cada_100gr y nombre*/
  alimentos: any[] = [];
  alimentoElegido = {nombre: '', kcal: 0};

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getFood().then((data) => {
      this.alimentos = data;
      console.log(this.alimentos)
    }).catch((error) => {
      console.error("Error al obtener alimentos: ", error);
    });
  }

  getAlimentoElegido(event: any){
    this.alimentoElegido = event;
  }
}
