import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-estudiante',
  templateUrl: './perfil-estudiante.component.html',
  styleUrls: ['./perfil-estudiante.component.css']
})
export class PerfilEstudianteComponent implements OnInit {

  user=localStorage.getItem('user');
  estado:string="";
  constructor( private router:Router ) { }

  ngOnInit() {


  }
  logOut(){
    localStorage.clear();
    this.router.navigateByUrl('/login');
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
