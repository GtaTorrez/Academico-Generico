import { Component, OnInit, Inject }                from '@angular/core'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'

import { saveAs } from "file-saver";

import { AsistenciaService } from '../../services/asistencia.service'

import 'rxjs/Rx'
import * as moment from 'moment'
moment.locale('es')

@Component({
  selector:    'tabla-asistencia',
  inputs:      ['dataSource:data-source', 'columns'],
  templateUrl: './tabla-asistencia.component.html',
  styleUrls:   ['./tabla-asistencia.component.scss']
})
export class TablaAsistenciaComponent implements OnInit {
  columns: Array<any>
  days           = []
  dataSource     = []
  desfaceDias    = 0
  mesAsistencia  = '03'
  anioAsistencia = '2018'
  mesNombre      = ''
  anioNombre     = ''
  loadingMode    = 'determinate'

  constructor(
    private service : AsistenciaService,
    public  dialog  : MatDialog
  ) { }

  ngOnInit() {
    this.actualizar()
  }

  actualizar () {
    this.loadingMode = 'indeterminate'
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
      const personas = []
      result.forEach(registro => {
        const NOMBRE = `${`${registro.idPersona.paterno} ${registro.idPersona.materno}`.trim()} ${registro.idPersona.nombre}`.trim()
        const persona = {
          id               : registro.idPersona.id,
          nombre           : NOMBRE,
          totalAsistencias : 0,
          totalFaltas      : diasHabiles,
          totalLicencias   : 0,
          totalAtrasos     : 0,
          asistencias      : [],
          marcas           : [],
          idGestionAcademica: registro.idGestionAcademica.id
        }
        let adicionado = false
        for (let i in personas) {
          if (personas[i].id === persona.id) {
            adicionado = true
            break;
          }
        }
        if (!adicionado) { personas.push(persona) }
      })
      result.forEach(registro => {
        const ID_PERSONA = registro.idPersona.id
        const DIA        = parseInt(moment.utc(registro.fecha).format('DD'))
        const MES        = parseInt(moment.utc(registro.fecha).format('MM'))
        const ANIO       = parseInt(moment.utc(registro.fecha).format('YYYY'))
        if (ANIO !== parseInt(this.anioAsistencia) || MES !== parseInt(this.mesAsistencia)) { return }
        let diaSemana = 1
        this.days.forEach(day => { if (day.id === DIA) { diaSemana = day.nro } })
        const asistencia = {
          id          : registro.id,
          fecha       : registro.fecha,
          atrasado    : false,
          dia         : DIA,
          diaSemana   : diaSemana,
          estado      : registro.estado,
          observacion : registro.observacion
        }
        const ESTADO_CON_LICENCIA = 'Con Licencia'
        for (let i in personas) {
          if (personas[i].id === ID_PERSONA && asistencia.diaSemana <= 5) {
            personas[i].asistencias.push(asistencia)
            if (asistencia.estado !== ESTADO_CON_LICENCIA) {
              personas[i].totalAsistencias += 1
              personas[i].totalFaltas      -= 1
            } else {
              personas[i].totalLicencias += 1
              personas[i].totalFaltas    -= 1
            }
            personas[i].marcas.push(DIA)
            break;
          }
        }
      })
      this.dataSource  = personas
      this.loadingMode = 'determinate'
    }, error => {
      this.loadingMode = 'determinate'
    })
  }

  print (persona) {
    this.service.getReporte(persona.id).subscribe(data => {
      this.downloadFile(data, 'Reporte de asistencia.pdf')
    },
    error => console.log(error))
  }

  printGeneral () {
    this.service.getReporteGeneral().subscribe((data:any) => {
      this.downloadFile(data, 'Reporte general de asistencia.pdf')
    },
    error => console.log(error))
  }

  downloadFile(data, fileName) {
    try {
      const blob = new Blob([data], { type: 'application/pdf' });
      // saveAs(blob, fileName);
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    } catch (err) { console.log(err) }
  }

  editarObservacion (dia, persona, asistencia) {
    const DIA     = dia < 10 ? `0${dia}` : dia
    const FECHA   = moment(`${DIA}/${this.mesAsistencia}/${this.anioAsistencia}`, 'DD/MM/YYYY').format('LL')
    let dialogRef = this.dialog.open(AgregarObservacionDialog, {
      data: { nombre: persona.nombre, fecha: FECHA, asistencia: asistencia }
    })

    dialogRef.afterClosed().subscribe(observacion => {
      if (observacion) {
        if (asistencia) {
          const data =  {
            observacion: observacion
          }
          this.service.update(data, asistencia.id).subscribe(result => {
            this.actualizar()
          })
        } else {
          const ESTADO_CON_LICENCIA = 'Con Licencia'
          const data =  {
            idPersona          : persona.id,
            idGestionAcademica : persona.idGestionAcademica,
            fecha              : moment(`${dia}-${this.mesAsistencia}-${this.anioAsistencia}`, 'DD/MM/YYYY').toDate(),
            estado             : ESTADO_CON_LICENCIA,
            observacion        : observacion
          }
          this.service.create(data).subscribe(result => {
            this.actualizar()
          })
        }
      }
    })
  }
}

@Component({
  selector    : 'agregar-observacion-dialog',
  templateUrl : 'agregar-observacion-dialog.html'
})
export class AgregarObservacionDialog {
  asistencia = {
    observacion: ''
  }

  constructor(
    public dialogRef: MatDialogRef<AgregarObservacionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit () {
    if (this.data.asistencia) {
      this.asistencia = this.data.asistencia
    }
    console.log("ASISTENCIA = ", this.asistencia)
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  aceptar () {
    if (this.asistencia.observacion !== '') {
      this.dialogRef.close(this.asistencia.observacion)
    }
  }
}
