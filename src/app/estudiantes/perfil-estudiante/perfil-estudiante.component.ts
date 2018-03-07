import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil-estudiante',
  templateUrl: './perfil-estudiante.component.html',
  styleUrls: ['./perfil-estudiante.component.css']
})
export class PerfilEstudianteComponent implements OnInit {

  user=localStorage.getItem('user');
  estado:string="";
  constructor() { }

  ngOnInit() {


  }
  logOut(){
    localStorage.clear();
    
  }
  estadoN(){
    this.estado="Notas";
  }
  estadoA(){
    this.estado="Asistencia";
  }
  estadoH(){
    this.estado="Horario";
  }

}
