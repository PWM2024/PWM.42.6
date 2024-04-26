import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-codigo-promocional',
  standalone: true,
  imports: [],
  templateUrl: './codigo-promocional.component.html',
  styleUrls: ['./codigo-promocional.component.css', '../component.css']
})
export class CodigoPromocionalComponent {
  @Input() promoCode: any;
}
