import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Asignatura} from '../../modelos/Asignatura';
import { Persona } from '../../modelos/persona';
import {AdministradorService} from '../../administrador.service';

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

  constructor(
    private serve: AdministradorService
  ) { }

  ngOnInit() {
    this.serve.getMateria().subscribe(data=>{
      this.materiasLista=data;
    })
  }
  adiciona(){
    this.adicionar = this.adicionar ? false : true;
    console.log(this.profesor);
  }
  guardar(){
    let asignatura:Asignatura;
    this.materiasLista.forEach(element => {
      if(element.nombre==this.selectMateria){
        asignatura=element
      }
    });
    console.log(asignatura);
    
    let data={"idProfesor":this.profesor.id,"idAsignatura":asignatura.id};
    this.serve.postProfesorAsignatura(data).subscribe(res=>{
      console.log(res);
      if(res.idAsignatura===data.idAsignatura){
        this.materias.push(asignatura);
      }
    })
  }

  eliminar(dato:Asignatura) {
    let data={"idProfesor":this.profesor.id,"idAsignatura":dato.id};
    this.serve.deleteProfesorAsignatura(data).subscribe(res => {
      console.log(res);
      if(res==="se quitó la materia con éxito"){
        this.cargarMaterias.emit();
      }
      // this.getMaterias();
      // this.openSnackBar('Realizado Corretamente','Aceptar');
    },err => {
      console.error(err);
    });
  }


}
