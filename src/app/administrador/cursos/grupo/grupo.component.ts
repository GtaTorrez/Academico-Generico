import { Component, OnInit } from '@angular/core';
import {AdministradorService} from '../../administrador.service';
import {Grupo} from '../../modelos/grupo';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.css']
})
export class GrupoComponent implements OnInit {

  grupos:Grupo[];
  grupo:Grupo;
  swGrupo=false;

  constructor(
    private serve:AdministradorService,
    private notificaciones:MatSnackBar
  ) { }

  ngOnInit() {
    this.getGrupo();
  }
  abrirNotificacion(mensaje,accion){
    this.notificaciones.open(mensaje,accion,{
      duration:2000
    })
  }

  addGrupo(){
    this.swGrupo=true;
    this.grupo=new Grupo();
  }
  closeGrupo(){
    this.swGrupo=false;
  }
  postGrupo(){
    this.grupo.id=0;
    this.serve.postGrupo(this.grupo).subscribe(data=>{
      this.grupos.push(data);
      this.swGrupo=false;
      this.abrirNotificacion("Realizado correctamente","Ok");
    },err=>{
      console.log("ERRROR")
      console.log(err);
    })
  }
  putGrupo(){
    this.serve.updateGrupo(this.grupo).subscribe(data=>{
      this.abrirNotificacion("Realizado correctamente","Ok");
    },err=>{
      console.log("ERRROR")
      console.log(err);
    })
  }
  getGrupo(){
    this.serve.getGrupo().subscribe(data=>{
      this.grupos=data;
      this.abrirNotificacion("Realizado correctamente","Ok");
    },err=>{
      console.log("ERRROR")
      console.log(err);
    })
  }
  deleteGrupo(id){
    this.serve.deleteGrupoId(id).subscribe(data=>{
      this.abrirNotificacion("Realizado correctamente","Ok");
      this.getGrupo();
    },err=>{
      console.log("ERRROR")
      console.log(err);
    })
  }
}