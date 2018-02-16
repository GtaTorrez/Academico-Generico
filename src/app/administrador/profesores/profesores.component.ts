import { Component, OnInit } from '@angular/core';
import {Persona} from '../modelos/persona';
import{Profesor} from '../modelos/profesor';
import {AdministradorService} from '../administrador.service'
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.css']
})
export class ProfesoresComponent implements OnInit {

  myControl: FormControl = new FormControl();
  filteredOptions: Observable<Profesor[]>;
  profesores:Profesor[]=[];
  profesorSelect:Persona;
  profesorEdit:Persona;
  busca="Nombre";
  buscaPor=['Nombre','CI'];
  consulta:boolean=false;
  nuevo:Persona;
  action:string="ver";
  tipo="profesor";
  
  constructor(
    private serve:AdministradorService,
    private notificacion:MatSnackBar

  ) { }

  ngOnInit() {
    this.getProfesores()
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(val => this.filter(val))
    );
     
  }
  
  profesorSelected(profesor){
    this.profesorSelect=profesor;
    console.log(profesor)
  }
  filter(val: string): Profesor[] {
    if(this.busca==='Nombre'){
      return this.profesores.filter(profesor =>
        (profesor.idPersona.nombre+" "+profesor.idPersona.paterno+" "+profesor.idPersona.materno).toLowerCase().indexOf(val.toLowerCase()) === 0);
    }else{
      if(this.busca==='CI'){
        return this.profesores.filter(profesor =>
          (profesor.idPersona.cedula+"").indexOf(val.toString().toLowerCase()) === 0);
      }
    }
    
  }

  AbrirNotificacion(message: string,action:string) {
    this.notificacion.open(message,action,{
      duration:2000
    })
  }

  getProfesores(){
    this.consulta=true;
    this.serve.getProfesores().subscribe(data=>{
      this.profesores=data;
      this.consulta=false;
      console.log(data)
    },err=>{
      console.error(err);
    })
  }

  verProfesor(profesor:Persona){
    this.profesorEdit=null;
    console.log(profesor)
    this.profesorEdit=profesor;
    this.action='ver';
  }
  editar(){
    this.action='editar';
    console.log(this.action)
  }
  cancelar(){
    this.action='ver';
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
  guardarProfesor(event){
    this.consulta=true;
    console.log(event.persona)
    if(event.persona.id){
      if(this.action==='editar'){
        this.serve.updateProfesor(event.persona).subscribe(data=>{
          this.verProfesor(data);
          this.consulta=false;
          this.AbrirNotificacion("Realizado Correctamente","");
        },err=>{
          this.AbrirNotificacion("Error al subir los datos","");
          console.error(err);
        })
      }
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
  adicionar(){
    
    this.action='nuevo';
    console.log(this.action)
    this.profesorEdit=new Persona();
    this.profesorEdit.rol="profesor";
    
  }

}
