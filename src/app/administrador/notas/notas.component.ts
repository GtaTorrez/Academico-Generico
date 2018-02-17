import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent implements OnInit {

  texto:string;

  constructor() { }

  ngOnInit() {
  }
  datos(){
    console.log(this.texto);
  }
}
