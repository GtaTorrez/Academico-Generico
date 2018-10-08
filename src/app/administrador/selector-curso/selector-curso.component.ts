import { Component, OnInit,Input, Output,EventEmitter } from '@angular/core';
import { Curso,Paralelo,Grado,Grupo } from '../modelos/curso';
import {AdministradorService} from '../administrador.service';
import {MatStepper} from '@angular/material/stepper';
import { Turno } from '../modelos/grupo';
import { MatSnackBar } from '@angular/material';
import { timeInterval } from 'rxjs/operators';

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
  @Output() nuevoActivado=new EventEmitter();
  @Output() actualizarCursoId=new EventEmitter();

  idParalelo:any;
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
  
  nextStep(stepper: MatStepper){
    stepper.next();
    this.envioIdCurso( this.idTurno,this.idGrado,this.idGrupo,this.idParalelo,this.actualizarCursoId);
    this.isDisableButton()
  }
  
  getCurso(turno:Turno){
    console.log("obtencion de curso")
    this.idTurno=turno.id;
    this.idGrado=undefined;
    this.idGrupo=undefined;
    this.idParalelo=undefined;

    this.labelNivel="Nivel";
    this.labelGrado="Grado";
    this.labelParalelo="Paralelo";


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
      console.log("Error al obtener cursos");
    });
  }
  fillGroup(grado:Grado){
    this.idGrado=grado.id;
    this.idGrupo=undefined;
    this.idParalelo=undefined;
    this.labelGrado="Grado";
    this.labelParalelo="Paralelo";
    this.labelNivel=grado.nombre;
    this.grupos=grado.grupos;
  }

  fillParallel(grupo:Grupo){
    this.idGrupo=grupo.id;
    this.idParalelo=undefined;
    this.labelGrado=grupo.nombre;
    this.paralelos=grupo.paralelos;

    this.labelParalelo="Paralelo";
  }

  completeStep(paralelo:Paralelo){
    this.idParalelo=paralelo;
    this.labelParalelo=paralelo.nombre;

  }
  envioIdCurso( idTurno,idGrado,idGrupo,idParalelo,actualizarCursoId){
    let curso={idTurno:idTurno,idGrado:idGrado,idGrupo:idGrupo,idParalelo:idParalelo};
    setTimeout(()=>actualizarCursoId.emit(curso),200)
    
    
  }

  isDisableButton(){
    if(this.idTurno!==undefined  && this.idGrado !== undefined && this.idGrupo !== undefined && this.idParalelo !== undefined){
      this.nuevoActivado.emit(false);
    }else{
      this.nuevoActivado.emit(true);
    }


  }
  
}
