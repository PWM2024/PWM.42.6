import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stats-form',
  standalone: true,
  imports: [],
  templateUrl: './stats-form.component.html',
  styleUrls: ['./stats-form.component.css', '../component.css']
})
export class StatsFormComponent {

  @Input() nickName: any;
  @Input() kcals: any;
  @Input() imc: any;

}
