import { Component, OnInit } from '@angular/core';
import {AdministradorService} from '../../administrador.service';
import {Grado,Grupo,Paralelo,Periodo,Turno} from '../../modelos/grupo';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-paralelo',
  templateUrl: './paralelo.component.html',
  styleUrls: ['./paralelo.component.css']
})
export class ParaleloComponent implements OnInit {

  paralelos:Paralelo[];
  paralelo:Paralelo;
  swParalelo=false;
  action=1;
  constructor(
    private serve:AdministradorService,
    private notificaciones:MatSnackBar
  ) { }

  ngOnInit() {
    this.getParalelo();
  }
  abrirNotificacion(mensaje,accion){
    this.notificaciones.open(mensaje,accion,{
      duration:2000
    })
  }
  edit(paralelo:Paralelo){
    this.action=0;
    this.swParalelo=true;
    this.paralelo=paralelo;
  }
  addParalelo(){
    this.action=1;
    this.swParalelo=true;
    this.paralelo=new Paralelo();
  }
  closeParalelo(){
    this.swParalelo=false;
  }
  postParalelo(){
    this.paralelo.id=0;
    this.serve.postParalelo(this.paralelo).subscribe(data=>{
      this.paralelos.push(data);
      this.swParalelo=false;
      this.abrirNotificacion("Realizado correctamente","Ok");
      this.closeParalelo();
    },err=>{
      console.log("ERRROR")
      console.log(err);
    })
  }
  putParalelo(){
    this.serve.updateParalelo(this.paralelo).subscribe(data=>{
      this.abrirNotificacion("Realizado correctamente","Ok");
      this.closeParalelo();
    },err=>{
      console.log("ERRROR")
      console.log(err);
    })
  }
  getParalelo(){
    this.serve.getParalelo().subscribe(data=>{
      this.paralelos=data;
      this.abrirNotificacion("Realizado correctamente","Ok");
    },err=>{
      console.log("ERRROR")
      console.log(err);
    })
  }
  deleteParalelo(id){
    this.serve.deleteParaleloId(id).subscribe(data=>{
      this.abrirNotificacion("Realizado correctamente","Ok");
      this.getParalelo()
    },err=>{
      console.log("ERRROR")
      console.log(err);
    })
  }
  guardar(){
    if (this.action) {
      this.postParalelo();
    } else {
      this.putParalelo();
    }
    
  }
}
