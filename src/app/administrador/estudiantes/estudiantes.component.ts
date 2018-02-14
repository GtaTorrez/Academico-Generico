import { Component, OnInit } from '@angular/core';
import { Persona } from '../modelos/persona';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css']
})
export class EstudiantesComponent implements OnInit {

  consulta:boolean=false;
  profesorEdit:Persona;
  busca="CI";
  buscaPor=['CI','Rude'];
  action:string='ver'
  constructor() { }

  ngOnInit() {
  }
  adicionar(){
    
    this.action='nuevo';
    console.log(this.action)
    this.profesorEdit=new Persona();
    this.profesorEdit.rol="profesor";
    
  }

}
