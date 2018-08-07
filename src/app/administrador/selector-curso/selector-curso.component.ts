import { Component, OnInit,Input, Output,EventEmitter } from '@angular/core';
import { Curso,Paralelo,Grado,Grupo,Turno } from '../modelos/grupo';
import {AdministradorService} from '../administrador.service';
import {CdkStepperModule} from '@angular/cdk/stepper';

@Component({
  selector: 'app-selector-curso',
  templateUrl: './selector-curso.component.html',
  styleUrls: ['./selector-curso.component.css']
})
export class SelectorCursoComponent implements OnInit {

  @Input() turnos:Turno[];
  @Input() grados:Grado[];
  @Input() grupos:Grupo[];
  @Input() paralelos:Paralelo[];

  @Output() enviarEstudiantes=new EventEmitter();
  idParalelo:number;
  idTurno:number;
  idGrado:number;
  idGrupo:number;

  constructor( private serve:AdministradorService) { }

  ngOnInit() {
  }

  getEstudiantes() {
  	let curso={idTurno:this.idTurno,idGrado:this.idGrado,idGrupo:this.idGrupo,idParalelo:this.idParalelo};
 	this.serve.getEstudiantesCurso(curso).subscribe((data:any)=>{
 		console.log(data);
 		this.enviarEstudiantes.emit(data);
 	}) 	
  }
  
}
