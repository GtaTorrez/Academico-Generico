import { Component, OnInit } from '@angular/core';
import {AdministradorService} from '../../administrador.service';
import {Grado,Grupo,Paralelo,Periodo,Turno} from '../../modelos/grupo';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-periodo',
  templateUrl: './periodo.component.html',
  styleUrls: ['./periodo.component.css']
})
export class PeriodoComponent implements OnInit {

  periodos:Periodo[];
  periodo:Periodo;
  swPeriodo=false;
  action=1;
  constructor(
    private serve:AdministradorService,
    private notificaciones:MatSnackBar
  ) { }

  ngOnInit() {
    this.getPeriodo();
  }
  abrirNotificacion(mensaje,accion){
    this.notificaciones.open(mensaje,accion,{
      duration:2000
    })
  }
  edit(periodo:Periodo){
    this.action=0;
    this.swPeriodo=true;
    this.periodo=periodo;
  }
  addPeriodo(){
    this.action=1;
    this.swPeriodo=true;
    this.periodo=new Periodo();
  }
  closePeriodo(){
    this.swPeriodo=false;
  }

//periodos
postPeriodo(){
  console.log(this.periodo)
  this.serve.postPeriodo(this.periodo).subscribe(data=>{
    this.periodos.push(data);
    this.swPeriodo=false;
    this.abrirNotificacion("Realizado correctamente","Ok");
    this.closePeriodo();
  },err=>{
    console.log("ERRROR")
    console.log(err);
  })
}
putPeriodo(){
  this.serve.updatePeriodo(this.periodo).subscribe(data=>{
    this.abrirNotificacion("Realizado correctamente","Ok");
    this.closePeriodo();
  },err=>{
    console.log("ERRROR")
    console.log(err);
  })
}
getPeriodo(){
  this.serve.getPeriodo().subscribe(data=>{
    this.periodos=data;
    this.abrirNotificacion("Realizado correctamente","Ok");
  },err=>{
    console.log("ERRROR")
    console.log(err);
  })
}
deletePeriodo(id){
  this.serve.deletePeriodoId(id).subscribe(data=>{
    this.abrirNotificacion("Realizado correctamente","Ok");
    this.getPeriodo()
  },err=>{
    console.log("ERRROR")
    console.log(err);
  })
}
guardar(){
  if (this.action) {
    this.postPeriodo();
  } else {
    this.putPeriodo();

  }
}
}
