import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Asignatura} from '../../modelos/Asignatura';
import { Persona } from '../../modelos/persona';
import {AdministradorService} from '../../administrador.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.css']
})
export class MateriaComponent implements OnInit {

  materiasLista: Asignatura[] ;
  @Input() materias: Asignatura[];
  @Input() profesor: Persona;
  selectMateria:string;
  adicionar:boolean=false;
  @Output() cargarMaterias=new EventEmitter();
  @Output() cargando=new EventEmitter();

  constructor(
    private serve: AdministradorService,
    private notificacion:MatSnackBar
  ) { }
  
  AbrirNotificacion(message: string,action:string) {
    this.notificacion.open(message,action,{
      duration:2000
    })
  }

  ngOnInit() {
    this.serve.getMateria().subscribe(data=>{
      this.materiasLista=data;
    })
  }
  adiciona(){
    this.adicionar = this.adicionar ? false : true;
  }
  guardar(){
    this.cargando.emit(true);
    let asignatura:Asignatura;
    this.materiasLista.forEach(element => {
      if(element.nombre==this.selectMateria){
        asignatura=element
      }
    });
    
    let data={"idProfesor":this.profesor.id,"idAsignatura":asignatura.id};
    this.serve.postProfesorAsignatura(data).subscribe((res:any)=>{
      if(res.idAsignatura===data.idAsignatura){
        this.materias.push(asignatura);
        this.AbrirNotificacion("Guardado","");
      }
      this.cargando.emit(false);
    },err=>{
      this.AbrirNotificacion("Error no guardado","");
      this.cargando.emit(false);
    })
  }

  eliminar(dato:Asignatura) {
    this.cargando.emit(true);
    let data={"idProfesor":this.profesor.id,"idAsignatura":dato.id};
    this.serve.deleteProfesorAsignatura(data).subscribe(res => {
      if(res==="se quitó la materia con éxito"){
        this.cargarMaterias.emit();
        this.AbrirNotificacion("Se quitó la materia con éxito","");
      }
      this.cargando.emit(false);
    },err => {
      this.AbrirNotificacion("Error no borrado","");
      this.cargando.emit(false);
    });
  }


}
