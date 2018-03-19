import { Component, OnInit } from '@angular/core';
import {AdministradorService} from '../../administrador.service';
import {Grado,Grupo,Paralelo,Periodo,Turno} from '../../modelos/grupo';
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-turno',
  templateUrl: './turno.component.html',
  styleUrls: ['./turno.component.css']
})
export class TurnoComponent implements OnInit {

  turnos:Turno[];
  turno:Turno;

  swTurno=false;
  
  constructor(
    private serve:AdministradorService,
    private notificaciones:MatSnackBar
  ) { }

  ngOnInit() {
    this.getTurno();
  }
  abrirNotificacion(mensaje,accion){
    this.notificaciones.open(mensaje,accion,{
      duration:2000
    })
  }
  addTurno(){
    this.swTurno=true;
    this.turno=new Turno();
  }
  closeTurno(){
    this.swTurno=false;
  }
  postTurno(){
    this.turno.id=0;
    this.serve.postTurno(this.turno).subscribe(data=>{
      this.turnos.push(data);
      this.swTurno=false;
      this.abrirNotificacion("Realizado correctamente","Ok");
    },err=>{
      console.log("ERRROR")
      console.log(err);
    })
  }
  putTurno(){
    this.serve.updateTurno(this.turno).subscribe(data=>{
      this.abrirNotificacion("Realizado correctamente","Ok");
    },err=>{
      console.log("ERRROR")
      console.log(err);
    })
  }
  getTurno(){
    this.serve.getTurno().subscribe(data=>{
      this.turnos=data;
      this.abrirNotificacion("Realizado correctamente","Ok");
      
    },err=>{
      console.log("ERRROR")
      console.log(err);
    })
  }
  deleteTurno(id){
    this.serve.deleteTurnoId(id).subscribe(data=>{
      this.abrirNotificacion("Realizado correctamente","Ok");
      this.getTurno()
    },err=>{
      console.log("ERRROR")
      console.log(err);
    })
  }

}
