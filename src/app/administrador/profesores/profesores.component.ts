import { Component, OnInit } from '@angular/core';
import {Persona} from '../modelos/persona';
import{Profesor} from '../modelos/profesor';
import {AdministradorService} from '../administrador.service'
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.css']
})
export class ProfesoresComponent implements OnInit {

  myControl: FormControl = new FormControl();
  filteredOptions: Observable<Profesor[]>;
  profesores: Profesor[] = [];
  materias: any[] = [];
  profesoresFil:Profesor[]=[];
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
  }
  filter(val: string): Profesor[] {
    let a=this.profesores;
    this.profesoresFil=[]
    this.profesores.forEach(profe=>{
      if(profe.idPersona){
        this.profesoresFil.push(profe);
      }
    })


    if(this.busca==='Nombre'){
      return this.profesoresFil.filter(profesor =>
        (profesor.idPersona.nombre+" "+profesor.idPersona.paterno+" "+profesor.idPersona.materno).toLowerCase().indexOf(val.toLowerCase()) === 0);
    }else{
      if(this.busca==='CI'){
        return this.profesoresFil.filter(profesor =>
          (profesor.idPersona.cedula+"").indexOf(val.toString().toLowerCase()) === 0);
      }
    }

  }

  AbrirNotificacion(message: string,action:string) {
    this.notificacion.open(message,action,{
      duration:2000
    })
  }

  getProfeDicta(id){
    this.serve.getProfesorDicta(id).subscribe((data:any[])=>{
      console.log(data)
      if (data) {
        if(data.length > 0){
          this.materias=data;
        }else{
          this.materias=data;
        }
      } else {
        this.materias=[]
      }
    })
  }
  getProfesores(){
    this.consulta=true;
    this.serve.getProfesores().subscribe(data=>{
      this.profesores=data;
      this.consulta=false;
    },err=>{
      console.error(err);
    })
  }

  verProfesor(profesor:Persona){
    this.profesorEdit=null;
    this.profesorEdit=profesor;
    this.action='ver';
    console.log(profesor)
    this.getProfeDicta(this.profesorEdit.id)
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
        },err => {
          this.AbrirNotificacion("Error al subir los datos","");
          console.error(err);
        })
      }
    }else{
        this.profesorEdit.rol="profesor";
        this.serve.postProfesor(this.profesorEdit).subscribe(data=>{
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
    this.profesorEdit=new Persona();
    this.profesorEdit.rol="profesor";
  }
}
