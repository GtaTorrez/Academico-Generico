import { Component, OnInit } from '@angular/core';
import {AdministradorService} from '../../administrador.service';
import {Curso} from '../../modelos/grupo';
@Component({
  selector: 'app-cursos-layout',
  templateUrl: './cursos-layout.component.html',
  styleUrls: ['./cursos-layout.component.css']
})
export class CursosLayoutComponent implements OnInit {

  cursos:Curso;
  constructor(
    private serve:AdministradorService
  ) { }

  ngOnInit() {
  }

  getCursos(){

  }


}