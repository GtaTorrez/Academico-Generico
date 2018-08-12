import { Component, OnInit,Input, Output,EventEmitter } from '@angular/core';
import { Curso,Paralelo,Grado,Grupo } from '../modelos/curso';
import {AdministradorService} from '../administrador.service';
import {MatStepper} from '@angular/material/stepper';
import { Turno } from '../modelos/grupo';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-selector-curso',
  templateUrl: './selector-curso.component.html',
  styleUrls: ['./selector-curso.component.css'],
  providers:[MatStepper]
})
export class SelectorCursoComponent implements OnInit {

  @Input() turnos:Turno[];
  grados:Grado[];
  grupos:Grupo[];
  paralelos:Paralelo[];

  @Output() enviarEstudiantes=new EventEmitter();
  @Output() consultando=new EventEmitter();

  idParalelo:number;
  idTurno:number;
  idGrado:number;
  idGrupo:number;
  cursos:Curso=new Curso();

  labelTurno:string;
  labelNivel:string;
  labelGrado:string;
  labelParalelo:string;

  constructor( 
    private serve:AdministradorService,
    private notificacion:MatSnackBar
    ) { }

  inicializarLabel(){
    this.labelTurno="Turno";
    this.labelNivel="Nivel";
    this.labelGrado="Grado";
    this.labelParalelo="Paralelo";
  }
  ngOnInit() {
    this.inicializarLabel();
  }
  AbrirNotificacion(message: string,action:string) {
    this.notificacion.open(message,action,{
      duration:2000
    })
  }
  nextStep(stepper: MatStepper){
    stepper.next();
    console.log(this.idTurno,this.idGrupo,this.idGrado,this.idParalelo);
  }
  getEstudiantes() {
    this.consultando.emit(true);
  	let curso={idTurno:this.idTurno,idGrado:this.idGrado,idGrupo:this.idGrupo,idParalelo:this.idParalelo};
 	this.serve.getEstudiantesCurso(curso).subscribe((data:any[])=>{
 		console.log(data);
    this.enviarEstudiantes.emit(data);
    this.consultando.emit(false);
    if(data.length===0){
      this.AbrirNotificacion("No existen datos","");
    }
 	}),err=>{
     this.AbrirNotificacion("Hubo un error ","");
   } 	
  }
  getCurso(turno:Turno){
    console.log("obtencion de curso")
    this.cursos=new Curso();
    this.grados=[];
    this.grupos=[];
    this.paralelos=[];
    this.labelTurno=turno.nombre;
    this.serve.getCursoTurno(turno.id).subscribe((data:Curso)=>{
      if(data){
        this.cursos=data;
        this.grados=this.cursos.grados;
      }
      // this.consulta=false;    
    },err=>{
      console.log("Error al obtener cursos")
    });
  }
  
  fillGroup(grado:Grado){
    this.labelNivel=grado.nombre;
    this.grupos=grado.grupos;
  }
  fillParallel(grupo:Grupo){
    this.labelGrado=grupo.nombre;
    this.paralelos=grupo.paralelos;
  }
  completeStep(paralelo:Paralelo){
    this.labelParalelo=paralelo.nombre;
  }
  
}
