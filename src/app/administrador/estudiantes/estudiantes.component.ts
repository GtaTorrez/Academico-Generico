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
  profesorEdit:Persona;
  busca="CI";
  buscaPor=['CI','Rude'];
  action:string='ver'
  parametro:number;
  constructor(
    private serve:AdministradorService,
    private notificacion:MatSnackBar
  ) { }

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
    this.profesorEdit=new Persona();
    this.profesorEdit.rol="profesor";
    
  }
  buscarEstudiante(){
    this.consulta=true;
    this.action="ver;"
    this.serve.getPersonaPorCi(this.parametro).subscribe(data=>{
      console.log(data)
      this.profesorEdit=data[0];
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
  verProfesor(data){
    this.action="ver";
    this.profesorEdit=data;
  }
  guardarP(){
    this.consulta=true;
    console.log(this.profesorEdit)
    if(this.profesorEdit.id){
      
      this.serve.updateProfesor(this.profesorEdit).subscribe(data=>{
        this.verProfesor(data);
        this.consulta=false;
        this.AbrirNotificacion("Realizado Correctamente","");
      },err=>{
        this.AbrirNotificacion("Error al subir los datos","");
        console.error(err);
      })
    
    }else{
        this.profesorEdit.rol="profesor";
        this.serve.postProfesor(this.profesorEdit).subscribe(data=>{
          console.log(data);
          this.consulta=false;
          this.AbrirNotificacion("Realizado correctamente","");
          this.verProfesor(data)
          this.profesorEdit.id=data.id;
        },error=>{
          this.AbrirNotificacion("Error al subir los datos","")
        })
      
    }
  }
}
