import { Component, OnInit } from '@angular/core';
import { AdministradorService } from '../administrador.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ModalAddCurso } from './modalAddCurso/modalAddCurso.component';
import { Curso,Paralelo,Grado,Grupo,Turno } from '../modelos/grupo';

@Component({
  selector: 'app-cursos-layout',
  templateUrl: './cursos-layout.component.html',
  styleUrls: ['./cursos-layout.component.css']
})
export class CursosLayoutComponent implements OnInit {

  idTurnoActual:number;
  consulta:boolean=false;
  turnos:Turno[];
  grados:Grado[];
  grupos:Grupo[];
  paralelos:Paralelo[];
  cursos:Curso=new Curso();

  constructor(
    private serve:AdministradorService,
    public dialog:MatDialog,
    private notificaciones:MatSnackBar
  ) { }

  ngOnInit() {
    this.getTurnos();
    this.getGrados();
    this.getGrupos();
    this.getParalelos(); 
  }

  openModal() {
    let dialogRef=this.dialog.open(ModalAddCurso, {
      width: '330px',height:'555px',
      data: {
        animal: 'panda',
        idTurno:this.idTurnoActual,
        paralelos:this.paralelos,
        turnos:this.turnos,
        grupos:this.grupos,
        grados:this.grados
      }
    });
    
    dialogRef.afterClosed().subscribe(data=>{
      if(data==="post"){
        this.getCursos(this.idTurnoActual)
        this.AbrirNotificacion("Datos guardados","");
      }

    })
  }
  cambioCursos(id){
    this.getCursos(id)
  }

  AbrirNotificacion(mensaje:string,action:string){
    this.notificaciones.open(mensaje,action,{
      duration:1000
    });
  }
  getCursos(id){
    this.consulta=true;
    this.serve.getCursoTurno(id).subscribe((data:Curso)=>{
      if(data){
        this.cursos=data;
      }else{
        this.AbrirNotificacion("","");
      }
      this.consulta=false;    
    },err=>{
      this.AbrirNotificacion("Error de conexion","");
    });
  }
  getParalelos(){
    this.consulta=true;
    this.serve.getParalelo().subscribe(data=>{
      this.paralelos=data;
      this.consulta=false;
    },err=>{
      this.consulta=false;
      this.AbrirNotificacion("Error de conexion","");
    });
  }
  getGrupos(){
    this.consulta=true;
    this.serve.getGrupo().subscribe(data=>{
      this.grupos=data;
      this.consulta=false;
    });
  } 
  getGrados(){
    this.consulta=true;
    this.serve.getGrado().subscribe(data=>{
      this.grados=data;
      this.consulta=false;
    });
  }
  getTurnos(){
    this.consulta=true;
    this.serve.getTurno().subscribe(data=>{
      this.turnos=data;
      this.consulta=false;
      if(this.turnos.length>0){
        this.idTurnoActual=this.turnos[0].id
        this.getCursos(this.idTurnoActual)
      }
    });
  }
}

