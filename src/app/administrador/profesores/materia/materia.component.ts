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

  adicionar:boolean=false;


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
  }

  eliminar(dato) {
    this.serve.deleteMateria(dato.id).subscribe(res => {
      console.log(res);
      // this.getMaterias();
      // this.openSnackBar('Realizado Corretamente','Aceptar');
    },err => {
      console.error(err);
    });
  }


}
