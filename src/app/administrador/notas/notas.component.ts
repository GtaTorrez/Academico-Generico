import { Component, OnInit } from '@angular/core';
import { AdministradorService } from '../administrador.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Curso,Paralelo,Grado,Grupo,Turno } from '../modelos/grupo';


@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent implements OnInit {

  
  texto:string;

  turnos:Turno[];
  grados:Grado[];
  grupos:Grupo[];
  paralelos:Paralelo[];

  idParalelo:number;
  idTurno:number;
  idGrado:number;
  idGrupo:number;

  
  constructor(
    private serve:AdministradorService,
    private notificaciones:MatSnackBar
  ) { }

  ngOnInit() {
    this.getTurnos();
    this.getGrados();
    this.getGrupos();
    this.getParalelos(); 
  }
  
  AbrirNotificacion(mensaje:string,action:string){
    this.notificaciones.open(mensaje,action,{
      duration:1000
    })
  }
  getParalelos(){
    this.serve.getParalelo().subscribe(data=>{
      this.paralelos=data;
    })
  }
  getGrupos(){
    this.serve.getGrupo().subscribe(data=>{
      this.grupos=data;
    })
  } 
  getGrados(){
    this.serve.getGrado().subscribe(data=>{
      this.grados=data;
    })
  }
  getTurnos(){
    this.serve.getTurno().subscribe(data=>{
      this.turnos=data;
      
    })
  }
}
