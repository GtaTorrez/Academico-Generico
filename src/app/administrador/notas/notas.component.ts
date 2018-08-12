import { Component, OnInit } from '@angular/core';
import { AdministradorService } from '../administrador.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Curso,Paralelo,Grado,Grupo,Turno } from '../modelos/grupo';


@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent implements OnInit {

  //notas correlativo en el vector de notas [primerBimestre,segundoBimestre,tercerBimestre,CuartoBimestre]
  data=[
    {idPersona:1,nombre:"Angela Maria Daniela", paterno:"paucara",materno:" de la torrez",notas:[64,45,87,81]},
    {idPersona:1,nombre:"Julio", paterno:"quispe",materno:"condori",notas:[100,35,67,80]},
    {idPersona:1,nombre:"Pedro", paterno:"mamani",materno:"huanca",notas:[15,100,14,100]},
    {idPersona:1,nombre:"Zulema", paterno:"mamano",materno:"siles",notas:[85,25,75,98]}
    ];

  texto:string;

  turnos:Turno[];
  grados:Grado[];
  grupos:Grupo[];
  paralelos:Paralelo[];

  idParalelo:number;
  idTurno:number;
  idGrado:number;
  idGrupo:number;

  
  constructor(
    private serve:AdministradorService,
    private notificaciones:MatSnackBar
  ) { }

  ngOnInit() {
    this.getTurnos();
    this.getGrados();
    this.getGrupos();
    this.getParalelos(); 
  }
  
  AbrirNotificacion(mensaje:string,action:string){
    this.notificaciones.open(mensaje,action,{
      duration:1000
    })
  }
  getParalelos(){
    this.serve.getParalelo().subscribe(data=>{
      this.paralelos=data;
      this.idParalelo=data[0].id
    })
  }
  getGrupos(){
    this.serve.getGrupo().subscribe(data=>{
      this.grupos=data;
      this.idGrupo=data[0].id
    })
  } 
  getGrados(){
    this.serve.getGrado().subscribe(data=>{
      this.grados=data;
      this.idGrado=data[0].id
    })
  }
  getTurnos(){
    this.serve.getTurno().subscribe(data=>{
      this.turnos=data;
      this.idTurno=data[0].id
    })
  }
  mostrarEstudiantes($event){

  }
}
