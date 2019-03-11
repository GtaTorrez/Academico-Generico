import { Component, OnInit } from '@angular/core';
import { Persona } from '../modelos/persona';
import {AdministradorService} from '../administrador.service'
import {MatSnackBar, MatTableDataSource} from '@angular/material';

import { Global} from "../../config/global";

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  consulta:boolean=false;
  persona:Persona;
  busca="CI";
  buscaPor=['CI','Rude'];
  action:string='ver';
  tipo="administrativo";
  select:string;
  parametro:string;
  qr:string;

  resultadoBusqueda : MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns : string[] = ['nro', 'paterno', 'materno', 'nombre', 'identificacion', 'username', 'rol', 'ver', 'reset-pass'];

  constructor(
    private serve:AdministradorService,
    private notificacion:MatSnackBar
  ) { }

  buscarUsuario () {
    if (this.parametro.length < 3) {
      this.resultadoBusqueda = new MatTableDataSource();
      return
    }
    if (this.parametro.length > 3 && this.resultadoBusqueda.data.length > 0) {
      this.resultadoBusqueda.filter = this.parametro.trim().toLowerCase();
      return
    }
    this.consulta=true;
    this.action="ver"
    this.serve.buscarPersona(this.parametro).subscribe((data:any[]) => {
      this.resultadoBusqueda = new MatTableDataSource(data);
      this.consulta=false;
    }, err => {
      this.AbrirNotificacion("Error con la consulta","")
    })
  }
  applyFilter(filterValue: string) {
    this.resultadoBusqueda.filter = filterValue.trim().toLowerCase();
  }
  ver (data) {
    this.action="ver";
    this.persona=data;
    if(this.persona.img!==null){
      if(this.persona.img.indexOf(Global.BASE_URL)==-1){
        this.persona.img=Global.BASE_URL+":"+Global.port+"/"+this.persona.img;
      }
    }

    if (this.persona) {
      this.qr=this.persona.idenficacion;
    }
  }

  AbrirNotificacion(message: string,action:string) {
    this.notificacion.open(message,action,{
      duration:2000
    })
  }

  ngOnInit () { }

  adicionar () {
    this.action='nuevo';
    this.persona=new Persona();
    this.persona.rol="administrador";
  }

  verProfesor(profesor:Persona){
    this.persona=null;
    this.persona=profesor;
    this.action='ver';
  }
  editar(){
    this.action='editar';
  }
  cancelar(){
    this.action='ver';
  }
  guardarPersona(){
    this.consulta=true;
    if(this.persona.id){

      this.serve.updateProfesor(this.persona).subscribe(data=>{
        this.verProfesor(data);
        this.consulta=false;
        this.AbrirNotificacion("Realizado Correctamente","");
      },err=>{
        this.AbrirNotificacion("Error al subir los datos","");
        console.error(err);
      })

    }else{
        this.persona.rol=this.select;
        this.serve.postProfesor(this.persona).subscribe(data=>{
          // console.log(data);
          this.consulta=false;
          this.AbrirNotificacion("Realizado correctamente","");
          this.verProfesor(data)
          this.persona.id=data.id;
        },error=>{
          this.AbrirNotificacion("Error al subir los datos","")
        })

    }
  }

  eliminarPersona(id) {
    if (window.confirm('¿Está seguro de eliminar el registro?')) {
      this.serve.deletePersona(id).subscribe(data=>{
        if(data){
          this.AbrirNotificacion("Exito","Aceptar")
        }
        this.buscarUsuario()
      },err=>{
        this.AbrirNotificacion("Hubo un error","")
      })
    }
  }

  resetPass(data) {
    if (window.confirm(`¿Está seguro de resetear la contraseña de ${data.nombre}?`)) {
      this.serve.resetPass(data.id).subscribe(data=>{
        if(data){
          this.AbrirNotificacion("Exito","Aceptar")
        }
      },err=>{
        this.AbrirNotificacion("Hubo un error","")
      })
    }
  }
}
