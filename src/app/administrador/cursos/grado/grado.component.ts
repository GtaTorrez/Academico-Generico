import { Component, OnInit } from '@angular/core';
import {AdministradorService} from '../../administrador.service';
import {Grado} from '../../modelos/grupo';
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-grado',
  templateUrl: './grado.component.html',
  styleUrls: ['./grado.component.css']
})
export class GradoComponent implements OnInit {

  grados:Grado[];
  grado:Grado;
  swGrado=false;
  constructor(
    private serve:AdministradorService,
    private notificaciones:MatSnackBar
  ) { }

  ngOnInit() {
    this.getGrado();
  }
  abrirNotificacion(mensaje,accion){
    this.notificaciones.open(mensaje,accion,{
      duration:2000
    })
  }
  addGrado(){
    this.swGrado=true;
    this.grado=new Grado();
  }
  closeGrado(){
    this.swGrado=false;
  }
  postGrado(){
    this.grado.id=0;
    this.serve.postGrado(this.grado).subscribe(data=>{
      this.grados.push(data)
      this.abrirNotificacion("Realizado correctamente","Ok");
      this.swGrado=false;
    },err=>{
      console.log("ERRROR")
      console.log(err);
    })
  }
  putGrado(){
    this.serve.updateGrado(this.grado).subscribe(data=>{
      this.abrirNotificacion("Realizado correctamente","Ok");
    },err=>{
      console.log("ERRROR")
      console.log(err);
    })
  }
  getGrado(){
    this.serve.getGrado().subscribe(data=>{
      this.grados=data;
      this.abrirNotificacion("Realizado correctamente","Ok");
    },err=>{
      console.log("ERRROR")
      console.log(err);
    })
  }
  deleteGrado(id){
    this.serve.deleteGradoId(id).subscribe(data=>{
      this.abrirNotificacion("Realizado correctamente","Ok");
      this.getGrado();
    },err=>{
      console.log("ERRROR")
      console.log(err);
    })
  }

}
