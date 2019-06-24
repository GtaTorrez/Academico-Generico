import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { Router }     from '@angular/router'
import { Curso,Paralelo,Grado,Grupo,Turno } from '../../modelos/grupo';
import { Persona } from '../../modelos/persona';
import {AdministradorService } from '../../administrador.service';
@Component({
  selector: 'app-lista-estudiantes',
  templateUrl: './lista-estudiantes.component.html',
  styleUrls: ['./lista-estudiantes.component.css']
})
export class ListaEstudiantesComponent implements OnInit {


  @Output() mostrar = new EventEmitter();
  @Output() borrar = new EventEmitter();
  @Input() estudiantes:Persona[];

  displayedColumns = ['paterno', 'materno', 'nombre', 'editar','borrar'];

  constructor(private serve:AdministradorService, private router : Router) { }

  ngOnInit() { }

  ver(persona:any){
  	this.mostrar.emit(persona);
    // this.router.navigate(['/administrador/menu/estudiantes'], { fragment: `idPersona-${persona.id}` })
  }
  eliminar(id){
  	this.borrar.emit(id);
  }

}
