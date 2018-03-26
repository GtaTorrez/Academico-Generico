import { Component, OnInit,Input } from '@angular/core';
import {AdministradorService} from '../../administrador.service';
import {Turno,Paralelo} from '../../modelos/grupo';
import {Curso} from '../../modelos/curso';
import { MatSnackBar } from '@angular/material';
import {LoadersService} from '../../../loader/loaders.service';
@Component({
  selector: 'app-lista-cursos',
  templateUrl: './lista-cursos.component.html',
  styleUrls: ['./lista-cursos.component.css']
})
export class ListaCursosComponent implements OnInit {

  @Input() idTurno:number;
  @Input() cursos:Curso;
  @Input() paralelos:Paralelo;

  constructor(
    private serve:AdministradorService,
    private notificaciones:MatSnackBar,
    private load:LoadersService
  ) { }

  ngOnInit() {
    
  }
  AbrirNotificacion(mensaje:string,action:string){
    this.notificaciones.open(mensaje,action,{
      duration:1000
    })
  }

  getParalelos(){
    this.serve.getParalelo().subscribe(data=>{
      this.paralelos=data;
    },err=>{
      this.AbrirNotificacion("Error de conexion con el servidor","");
    })
  }

  


}
