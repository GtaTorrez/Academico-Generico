import { Component, OnInit } from '@angular/core';
import {AdministradorService} from '../administrador.service';
import {Grado,Grupo,Paralelo,Periodo,Turno} from '../modelos/grupo';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  action="ver";
  
  consulta=false;
  
  
  

  constructor(
    private notificaciones:MatSnackBar
  ) { }

  ngOnInit() {
    
    
  }
  abrirNotificacion(mensaje,accion){
    this.notificaciones.open(mensaje,accion,{
      duration:2000
    })
  }
  
  
  
  

}
