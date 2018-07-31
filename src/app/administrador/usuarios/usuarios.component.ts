import { Component, OnInit } from '@angular/core';
import { Persona } from '../modelos/persona';
import {AdministradorService} from '../administrador.service'
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  consulta:boolean=false;
  profesorEdit:Persona;
  busca="CI";
  buscaPor=['CI','Rude'];
  action:string='ver'
  tipo="administrativo";
  select:string;
  parametro:number;

  constructor(
    private serve:AdministradorService,
    private notificacion:MatSnackBar
  ) { }
  
  buscarUsuario(){
    this.consulta=true;
    this.action="ver"
    console.log(this.parametro)
      this.serve.getPersonaPorCi(this.parametro).subscribe((data:any[]) =>{
        console.log(data)
        if(data.length>0){
          if(data[0].rol==="administrativo" || data[0].rol==="superAdmin"){
            this.profesorEdit=data[0];
            if (this.profesorEdit) {
            }
            this.AbrirNotificacion("Datos encontrados","Aceptar")        
          }else{
            this.AbrirNotificacion("No es un estudiante","")  
          }
        }else{
          this.AbrirNotificacion("No existen datos","")  
        }
                
        this.consulta=false;
      },err=>{
        this.AbrirNotificacion("Error con la consulta","")
      })
    
    
  }
  AbrirNotificacion(message: string,action:string) {
    this.notificacion.open(message,action,{
      duration:2000
    })
  }
  ngOnInit() {
  }

  adicionar(){
    
    this.action='nuevo';
    console.log(this.action)
    this.profesorEdit=new Persona();
    this.profesorEdit.rol="administrativo";
    
  }
  verProfesor(profesor:Persona){
    this.profesorEdit=null;
    this.profesorEdit=profesor;
    this.action='ver';
    
  }
  editar(){
    this.action='editar';
  }
  cancelar(){
    this.action='ver';
  }
  guardarP(){
    this.consulta=true;
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
        this.profesorEdit.rol=this.select;
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
