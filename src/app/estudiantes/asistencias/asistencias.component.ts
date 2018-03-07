import { Component, OnInit } from '@angular/core';
import { AlumnoService } from '../alumno.service';
import { Asistencia } from '../modelos/asistencia';
import { forEach } from '@angular/router/src/utils/collection';


@Component({
  selector: 'app-asistencias',
  templateUrl: './asistencias.component.html',
  styleUrls: ['./asistencias.component.css']
})
export class AsistenciasComponent implements OnInit {

  asistencias:Asistencia[];
  displayedColumns = ['fechas', 'llegadas', 'salidas', 'estados'];
  dataSource = this.asistencias;
  nroAsistencias=0;
  nroFaltas=0;

  constructor(private serve:AlumnoService) { }

  ngOnInit() {
    this.getAsistencia();
  }
  
  getAsistencia(){
    this.serve.getAsistenciaHistorial().subscribe(data=>{
      console.log(data)
      this.asistencias=data;
      this.asistencias.forEach(element => {
        if(element.estado==="Falto"){
          this.nroFaltas++;
        }else{
          this.nroAsistencias++;
        }
      });
      console.log(data)
    },err=>{
      console.error(err)
    })
  }

}
