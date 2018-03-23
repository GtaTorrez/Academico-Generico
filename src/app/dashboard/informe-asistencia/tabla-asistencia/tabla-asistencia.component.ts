import { Component, OnInit } from '@angular/core'
import { Router }      from '@angular/router'

// // Servicios
// import { AuthService } from '../../services/auth/auth.service'
// import { DataService } from '../../services/data/data.service'
// import { NotificationService } from '../../services/notification/notification.service'
// import { ReportService } from '../../services/report/report.service'

// modelos
// import { Usuario } from '../../shared/usuario'

import * as moment from 'moment'
moment.locale('es');

@Component({
  selector: 'tabla-asistencia',
  inputs: ['dataSource:data-source', 'columns'],
  templateUrl: './tabla-asistencia.component.html',
  styleUrls: ['./tabla-asistencia.component.scss']
})
export class TablaAsistenciaComponent implements OnInit {
  columns    : Array<any>
  days       = []
  dataSource = []
  desfaceDias = 0
  mesAsistencia = '03'
  anioAsistencia = '2017'
  mesNombre = ''
  anioNombre = ''
  constructor(
    // public router      : Router,
    // public authService : AuthService,
    // private reportService: ReportService
  ) { }

  actualizar () {
    const mes = `${this.anioAsistencia}-${this.mesAsistencia}-01`
    this.mesNombre = moment(mes).format('MMMM').toUpperCase()
    this.anioNombre = moment(mes).format('YYYY').toUpperCase()
    const nroDias = moment(mes).daysInMonth()
    this.desfaceDias = moment(mes).day()
    let cnt = this.desfaceDias
    this.days = []
    for (let i = 0; i < nroDias; i++, cnt = (cnt % 7) + 1) {
      this.days.push({ id: i+1, nro: cnt })
    }
    const personas = [
      {
        id:1,
        nombre:'Juan Carlos',
        totalAsistencias: 21,
        totalFaltas: 1,
        totalAtrasos: 5,
        asistencias: [
          { fecha:'2017-01-01', atrasado: true },
          { fecha:'2017-01-02', atrasado: false },
          { fecha:'2017-01-03', atrasado: true },
          { fecha:'2017-01-04', atrasado: false },
          { fecha:'2017-01-05', atrasado: false },
          { fecha:'2017-01-06', atrasado: false },
          // { fecha:'2017-01-07', atrasado: false },
          { fecha:'2017-01-08', atrasado: false },
          { fecha:'2017-01-09', atrasado: false },
          { fecha:'2017-01-10', atrasado: false },
          { fecha:'2017-01-11', atrasado: false },
          { fecha:'2017-01-12', atrasado: false },
          { fecha:'2017-01-13', atrasado: true },
          // { fecha:'2017-01-14', atrasado: false },
          { fecha:'2017-01-15', atrasado: false },
          { fecha:'2017-01-16', atrasado: false },
          { fecha:'2017-01-17', atrasado: false },
          { fecha:'2017-01-18', atrasado: false },
          { fecha:'2017-01-19', atrasado: false },
          { fecha:'2017-01-20', atrasado: false },
          // { fecha:'2017-01-21', atrasado: false },
          { fecha:'2017-01-22', atrasado: false },
          { fecha:'2017-01-23', atrasado: true },
          { fecha:'2017-01-24', atrasado: false },
          // { fecha:'2017-01-25', atrasado: false },
          { fecha:'2017-01-26', atrasado: false },
          { fecha:'2017-01-27', atrasado: false },
          // { fecha:'2017-01-28', atrasado: false },
          { fecha:'2017-01-29', atrasado: true },
          { fecha:'2017-01-30', atrasado: false },
          { fecha:'2017-01-31', atrasado: false },
        ]
      }
    ]
    personas.forEach((persona:any) => {
      persona.marcas = []
      persona.asistencias.forEach(asistencia => {
        const dia = parseInt(moment(asistencia.fecha).format('D'))
        persona.marcas.push(dia)
        asistencia.dia = dia
      })
      // persona.totalAsistencias = persona.asistencias.length
      // persona.totalFaltas      = nroDias - persona.asistencias.length
      // persona.totalAtrasos     = persona.asistencias.length
    })
    this.dataSource = personas.concat(personas).concat(personas).concat(personas).concat(personas).concat(personas)
  }

  ngOnInit() {
    this.actualizar()
    console.log("Tabla de asistencia init")
  }
}
