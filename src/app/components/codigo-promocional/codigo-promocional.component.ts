import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-codigo-promocional',
  standalone: true,
  templateUrl: './codigo-promocional.component.html',
  styleUrls: ['./codigo-promocional.component.css', '../component.css']
})
export class CodigoPromocionalComponent {
  @Input() promoCode: any;

  copyPromoCode(): void {
    const promoCodeElement = document.getElementById('promoCode');
    if (promoCodeElement) {
      const promoCodeText = promoCodeElement.innerText;

      const textarea = document.createElement('textarea');
      textarea.value = promoCodeText;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'absolute';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);

      textarea.select();
      document.execCommand('copy');

      document.body.removeChild(textarea);

      alert('Código copiado al portapapeles: ' + promoCodeText);
    }
  }
}
