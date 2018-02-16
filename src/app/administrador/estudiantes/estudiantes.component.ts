import { Component, OnInit } from '@angular/core';
import { Persona } from '../modelos/persona';
import {AdministradorService} from '../administrador.service';
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css']
})
export class EstudiantesComponent implements OnInit {

  consulta:boolean=false;
  estudiante:Persona;
  busca='CI';
  buscaPor=['CI','Rude'];
  action='ver';
  parametro:number;
  tipo='estudiante';
  constructor(
    private serve:AdministradorService,
    private notificacion:MatSnackBar
  ) { 
    this.action='ver'
  }

  ngOnInit() {
  }
  AbrirNotificacion(message: string,action:string) {
    this.notificacion.open(message,action,{
      duration:2000
    })
  }

  adicionar(){
    
    this.action='nuevo';
    console.log(this.action)
    this.estudiante=new Persona();
    this.estudiante.rol="estudiante";
    
  }
  buscarEstudiante(){
    this.consulta=true;
    this.action="ver"
    this.serve.getPersonaPorCi(this.parametro).subscribe(data=>{
      console.log(data)
      this.estudiante=data[0];
      this.consulta=false;
      this.AbrirNotificacion("Datos encontrados","Aceptar")
    },err=>{
      this.AbrirNotificacion("Error con la consulta","")
    })
  }
  editar(){
    this.action='editar';
    console.log(this.action)
  }
  cancelar(){
    this.action='ver';
  }
  verEstudiante(data){
    this.action="ver";
    this.estudiante=data;
  }
  guardar(){
    this.consulta=true;
    console.log(this.estudiante)
    if(this.estudiante.id){
      
      this.serve.updateProfesor(this.estudiante).subscribe(data=>{
        this.verEstudiante(data);
        this.consulta=false;
        this.AbrirNotificacion("Realizado Correctamente","");
      },err=>{
        this.AbrirNotificacion("Error al subir los datos","");
        console.error(err);
      })
    
    }else{
        this.estudiante.rol="estudiante";
        this.serve.postProfesor(this.estudiante).subscribe(data=>{
          console.log(data);
          this.consulta=false;
          this.AbrirNotificacion("Realizado correctamente","");
          this.verEstudiante(data)
          this.estudiante.id=data.id;
        },error=>{
          this.AbrirNotificacion("Error al subir los datos","")
        })
      
    }
  }
}
