// libreries
import { Component, OnInit } from '@angular/core';
// Services
import { DataService } from '../../../login/data.service';

import { HistorialService } from './historial.service';

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
  selector    : 'dashboard-historial',
  templateUrl : './historial.component.html',
  styleUrls   : ['./historial.component.scss']
})
export class HistorialComponent implements OnInit {
  displayedColumns : string[]     = ['nro', 'fecha', 'hora_llegada', 'hora_salida', 'estado', 'observacion'];
  dataSource       : Asistencia[] = [];

  constructor (
    private historialService: HistorialService
  ) {}

  ngOnInit () {
    const SESSION = DataService.getSession()
    if (SESSION.usuario.rol === 'alumno') {
      this.cargarHistorialEstudiante()
    }
    if (SESSION.usuario.rol === 'profesor') {
      this.cargarHistorialDocente()
    }
    if (SESSION.usuario.rol === 'administrador') {
      this.cargarHistorialAdministrativo()
    }
  }

  cargarHistorialEstudiante () {
    this.historialService.obtenerhistorialEstudiante().subscribe((result : any) => {
      let nro = 1;
      this.dataSource = []
      result.forEach(asistencia => {
        this.dataSource.push({
          nro          : nro++,
          fecha        : moment(asistencia.fecha).format('DD/MM/YYYY'),
          hora_llegada : asistencia.hora_llegada,
          hora_salida  : asistencia.hora_salida,
          estado       : asistencia.estado,
          observacion  : asistencia.observacion
        })
      })
    },
    error => {
      console.log("err =", error)
    })
  }

  cargarHistorialDocente () {
    this.historialService.obtenerhistorialDocente().subscribe((result : any) => {
      let nro = 1;
      this.dataSource = []
      result.forEach(asistencia => {
        this.dataSource.push({
          nro          : nro++,
          fecha        : moment(asistencia.fecha).format('DD/MM/YYYY'),
          hora_llegada : asistencia.hora_llegada,
          hora_salida  : asistencia.hora_salida,
          estado       : asistencia.estado,
          observacion  : asistencia.observacion
        })
      })
    },
    error => {
      console.log("err =", error)
    })
  }

  cargarHistorialAdministrativo () {
    this.historialService.obtenerhistorialAdministrativo().subscribe((result : any) => {
      let nro = 1;
      this.dataSource = []
      result.forEach(asistencia => {
        this.dataSource.push({
          nro          : nro++,
          fecha        : moment(asistencia.fecha).format('DD/MM/YYYY'),
          hora_llegada : asistencia.hora_llegada,
          hora_salida  : asistencia.hora_salida,
          estado       : asistencia.estado,
          observacion  : asistencia.observacion
        })
      })
    },
    error => {
      console.log("err =", error)
    })
  }

}
