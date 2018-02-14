import { Component, OnInit } from '@angular/core';
import { Persona } from '../modelos/persona';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

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
