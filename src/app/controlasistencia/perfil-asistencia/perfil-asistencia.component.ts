import { Component, OnInit } from '@angular/core';
import { AsistenciaService }  from '../asistencia.service';
import { Perfil } from './perfil'; 

@Component({
  selector: 'app-perfil-asistencia',
  templateUrl: './perfil-asistencia.component.html',
  styleUrls: ['./perfil-asistencia.component.css']
})
export class PerfilAsistenciaComponent implements OnInit {

  tipoInstitucion="UNIDAD ACADEMICA";
  nombrePrimario="AMERICANO";
  nombreSecundario="INSTITUTO";
  perfil:Perfil; 
  constructor(
    private serve:AsistenciaService
  ) { 
    this.getPerfil();
  }

  getPerfil(){
    this.serve.getPersona().subscribe(data=>{
      console.log(data);
      this.perfil=new Perfil(data.id,data.patzerno,data.materno,data.nombre,"Sexto A ","Mañana","",(data.id+data.paterno+data.materno+data.nombre))
    },err=>{
      console.error(err)
    })
  }

  ngOnInit() {
    this.getPerfil();
  }
  

}
