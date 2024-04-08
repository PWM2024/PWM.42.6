import {Component, Output, EventEmitter, OnInit} from '@angular/core';

@Component({
  selector: 'app-descripcion',
  standalone: true,
  imports: [],
  templateUrl: './descripcion.component.html',
  styleUrls: ['./descripcion.component.css', '../component.css']
})
export class DescripcionComponent implements OnInit{

  @Output() volver = new EventEmitter<void>();

  ngOnInit(){

  }

  volverClick() {
    this.volver.emit();
  }
}


