import { Component, OnInit } from '@angular/core';
import { Asignatura } from '../modelos/Asignatura';
import { AdministradorService } from '../administrador.service';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css']
})
export class HorariosComponent implements OnInit {

  materias:Asignatura[];
  consulta:boolean=false;

  constructor(
    private serve:AdministradorService,
    private snackBar:MatSnackBar
    ) {

  }

  ngOnInit() {


  }

  openSnackBar(message: string,action:string) {
    this.snackBar.open(message,action,{
      duration:2000
    })
  }
  
  getMaterias(){
    this.consulta=true;
     let data=this.serve.getMateria().subscribe(datos=>{
       this.materias=datos;
       this.consulta=false;
     },(err)=>{
        console.log("**********")
        console.log(err)
        this.openSnackBar("Error de conexion con el servidor" ,"");
     })
  }

}
