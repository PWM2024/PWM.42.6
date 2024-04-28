import { Component, Input, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'lista-kcal',
  standalone: true,
  imports: [],
  templateUrl: './lista-kcal.component.html',
  styleUrls: ['./lista-kcal.component.css', '../component.css']
})
export class ListaKcalComponent {
  @Input() alimentoElegido: any = {nombre: '', kcal: 0};
  @ViewChild('listaAlimentos') listaAlimentos: any;
  alimentosElegidos: any[] = [];

  constructor(private renderer:Renderer2) { }

  ngOnChanges(): void {
    if (this.alimentoElegido.nombre !== '' && this.alimentoElegido.kcal !== 0) {
      const li = this.renderer.createElement('li');
      const span = this.renderer.createElement('span');
      const button = this.renderer.createElement('button');
      const text = this.renderer.createText(`${this.alimentoElegido.nombre} - ${this.alimentoElegido.kcal} kcal`);
      const textButton = this.renderer.createText('Eliminar');

      this.renderer.appendChild(span, text);
      this.renderer.appendChild(button, textButton);
      this.renderer.appendChild(li, span);
      this.renderer.appendChild(li, button);
      this.renderer.appendChild(this.listaAlimentos.nativeElement, li);
    }
  }

}
