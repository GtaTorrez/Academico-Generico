import { Component, OnInit } from '@angular/core'
import { Router }      from '@angular/router'

// // Servicios
import {AsistenciaService} from '../../services/asistencia.service';
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
  anioAsistencia = '2018'
  mesNombre = ''
  anioNombre = ''
  constructor(
    // public router      : Router,
    private service:AsistenciaService,
    // private reportService: ReportService
  ) { }

  ngOnInit() {
    this.actualizar()
    console.log("Tabla de asistencia init")
  }

  actualizar () {
    const mes        = `${this.anioAsistencia}-${this.mesAsistencia}-01`
    this.mesNombre   = moment(mes).format('MMMM').toUpperCase()
    this.anioNombre  = moment(mes).format('YYYY').toUpperCase()
    const nroDias    = moment(mes).daysInMonth()
    this.desfaceDias = moment(mes).day()
    let cnt          = this.desfaceDias
    this.days        = []
    let diasHabiles  = 0
    for (let i = 0; i < nroDias; i++, cnt = (cnt % 7) + 1) {
      this.days.push({ id: i+1, nro: cnt })
      if (cnt <= 5) {
        diasHabiles += 1
      }
    }
    this.service.getAsistencias().subscribe((result:any) => {
      console.log(result)
      const personas = []
      result.forEach(registro => {
        const persona = {
          id: registro.idPersona.id,
          nombre: (`${`${registro.idPersona.paterno} ${registro.idPersona.materno}`.trim()} ${registro.idPersona.nombre}`).trim(),
          totalAsistencias: 0,
          totalFaltas: diasHabiles,
          totalAtrasos: 0,
          asistencias: [],
          marcas : [],
          idGestionAcademica: registro.idGestionAcademica.id
        }
        let adicionado = false
        for (let i in personas) {
          if (personas[i].id === persona.id) {
            adicionado = true
            break;
          }
        }
        if (!adicionado) {
          personas.push(persona)
        }
      })
      result.forEach(registro => {
        const ID_PERSONA = registro.idPersona.id
        const DIA = parseInt(moment.utc(registro.fecha).format('DD'))
        const MES = parseInt(moment.utc(registro.fecha).format('MM'))
        const ANIO = parseInt(moment.utc(registro.fecha).format('YYYY'))
        if (ANIO !== parseInt(this.anioAsistencia) || MES !== parseInt(this.mesAsistencia)) {
          return
        }
        let diaSemana = 1
        this.days.forEach(day => {
          if (day.id === DIA) { diaSemana = day.nro }
        })
        const asistencia = {
          id: registro.id,
          fecha: registro.fecha,
          atrasado: false,
          dia: DIA,
          diaSemana: diaSemana,
          estado: registro.estado,
          observacion: registro.observacion
        }
        const ESTADO_CON_LICENCIA = 'Con Licencia'
        for (let i in personas) {
          if (personas[i].id === ID_PERSONA && asistencia.diaSemana <= 5) {
            personas[i].asistencias.push(asistencia)
            if (asistencia.estado !== ESTADO_CON_LICENCIA) {
              personas[i].totalAsistencias += 1
              personas[i].totalFaltas -= 1
            }
            personas[i].marcas.push(DIA)
            break;
          }
        }
      })
      console.log("FINAL = ", personas)
      this.dataSource = personas
    }, error => {
      console.log(error)
    })
  }

  agregarObservacion (dia, persona) {
    console.log("PERSONA = ", persona)
    const ESTADO_CON_LICENCIA = 'Con Licencia'
    const observacion = 'Faltó por baja médica.'
    const data =  {
      idPersona: persona.id,
      idGestionAcademica: persona.idGestionAcademica,
      fecha: moment(`${dia}-${this.mesAsistencia}-${this.anioAsistencia}`, 'DD/MM/YYYY').toDate(),
      estado: ESTADO_CON_LICENCIA,
      observacion: observacion
    }
    // this.service.get()
    this.service.create(data).subscribe(result => {
      console.log(result)
      this.actualizar()
    })
    console.log(data)
  }
}
