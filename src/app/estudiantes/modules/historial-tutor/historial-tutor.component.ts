// libreries
import { Component, OnInit } from '@angular/core';
// Services
import { DataService } from '../../../login/data.service';

import { HistorialTutorService } from './historial-tutor.service';

import * as moment from 'moment'

export interface Asistencia {
  nro          : number;
  fecha        : string;
  hora_llegada : string;
  hora_salida  : string;
  estado       : string;
  observacion  : string;
}

@Component({
  selector    : 'dashboard-historial-tutor',
  templateUrl : './historial-tutor.component.html',
  styleUrls   : ['./historial-tutor.component.scss']
})
export class HistorialTutorComponent implements OnInit {
  estudiantes = []
  displayedColumns : string[]     = ['nro', 'fecha', 'hora_llegada', 'hora_salida', 'estado', 'observacion'];
  dataSource       : Asistencia[] = [];

  constructor (
    private historialTutorService: HistorialTutorService
  ) {}

  ngOnInit () {
    this.estudiantes = []
    this.historialTutorService.obtenerhistorialEstudianteTutor().subscribe((result : any) => {
      result.alumnos.forEach(alumno => {
        let nombreCompleto = alumno.nombre ? alumno.nombre : ''
        nombreCompleto = (nombreCompleto += alumno.paterno ? ` ${alumno.paterno}` : '').trim()
        nombreCompleto = (nombreCompleto += alumno.materno ? ` ${alumno.materno}` : '').trim()
        const dataSource = []
        let nro = 1;
        alumno.asistencias.forEach(asistencia => {
          dataSource.push({
            nro          : nro++,
            fecha        : moment(asistencia.fecha).format('DD/MM/YYYY'),
            hora_llegada : asistencia.hora_llegada,
            hora_salida  : asistencia.hora_salida,
            estado       : asistencia.estado,
            observacion  : asistencia.observacion
          })
        })
        this.estudiantes.push({
          nombreCompleto: nombreCompleto,
          dataSource: dataSource
        })
      })
    },
    error => {
      // console.log("err =", error)
    })
  }

}
