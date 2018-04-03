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
  //1 para crear  0 para editar 
  action = 1;

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
  editGrado(grado:Grado)
  {
    this.action=0;
    this.swGrado=true;
    this.grado=grado;
  }
  addGrado(){
    this.action=1;
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
      this.closeGrado();
    },err=>{
      console.log("ERRROR")
      console.log(err);
    })
  }
  putGrado(){
    this.serve.updateGrado(this.grado).subscribe(data=>{
      this.abrirNotificacion("Realizado correctamente","Ok");
      this.closeGrado();
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
  guardarGrado(){
    if(this.action===1){
      this.postGrado();
    }else{
      if(this.action===0){
        this.putGrado();
      }
    }
  }

}
