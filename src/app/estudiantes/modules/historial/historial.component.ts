// libreries
import { Component, OnInit } from '@angular/core';
// Services
import { DataService } from '../../../login/data.service';
import { AuthService } from '../../services/auth.service';

// export interface Asistencia {
//   nro          : number;
//   fecha        : string;
//   hora_llegada : string;
//   hora_salida  : string;
//   estado       : string;
//   observacion  : string;
// }
//
// const ELEMENT_DATA: Asistencia[] = [
//   {nro: 1, fecha: '02/04/2018', hora_llegada: '08:00', hora_salida: '12:00', estado: '', observacion: ''},,
//   {nro: 2, fecha: '02/04/2018', hora_llegada: '08:00', hora_salida: '12:00', estado: '', observacion: ''},
//   {nro: 3, fecha: '02/04/2018', hora_llegada: '08:00', hora_salida: '12:00', estado: '', observacion: ''}
// ];

@Component({
  selector    : 'dashboard-historial',
  templateUrl : './historial.component.html',
  styleUrls   : ['./historial.component.scss']
})
export class HistorialComponent implements OnInit {
  // displayedColumns: string[] = ['nro', 'fecha', 'hora_llegada', 'hora_salida', 'estado', 'observacion'];
  // dataSource = ELEMENT_DATA;

  constructor (
    private authService: AuthService
  ) {}

  ngOnInit () {
    // console.log("DATA SOURCE = ", this.dataSource)
  }

}
