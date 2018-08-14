// libreries
import { Component, OnInit } from '@angular/core';
// Services
import { DataService } from '../../../login/data.service';
import { AuthService } from '../../services/auth.service';

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
    private authService: AuthService,
    private historialService: HistorialService
  ) {}

  ngOnInit () {
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

}
