import { Component, OnInit, Inject }                             from '@angular/core'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material'

import { PdfmakeService }   from 'ng-pdf-make/pdfmake/pdfmake.service'
import { Cell, Row, Table } from 'ng-pdf-make/objects/table'

import { AsistenciaService } from '../../services/asistencia.service'
import { ExcelService }      from '../../services/excel.service'

import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter }     from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import 'rxjs/Rx';
import * as moment from 'moment';
import * as _ from 'lodash';

moment.locale('es');

@Component({
  selector:    'tabla-asistencia',
  templateUrl: './tabla-asistencia.component.html',
  styleUrls:   ['./tabla-asistencia.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }
  ]
})
export class TablaAsistenciaComponent implements OnInit {
  loadingMode = 'determinate'

  idGrupo    = -1
  idGrado    = -1
  idTurno    = -1
  idParalelo = -1

  fechaDesde  = moment('2018-03-01')
  fechaHasta  = moment('2018-03-31')
  horaEntrada = '08:00:00 AM'

  turnos    = []
  grados    = []
  grupos    = []
  paralelos = []

  listaMeses = [
    { idMes: 1, nombre: 'Enero 2019', nroDias: 10 },

    { idMes: 2, nombre: 'Febrero 2019', nroDias: 14 }
  ]
  listaFechas = [
    { idFecha: 1, nroDia: 1, diaHabil: true },
    { idFecha: 2, nroDia: 2, diaHabil: true },
    { idFecha: 3, nroDia: 3, diaHabil: true },
    { idFecha: 4, nroDia: 4, diaHabil: true },
    { idFecha: 5, nroDia: 5, diaHabil: true },
    { idFecha: 6, nroDia: 6, diaHabil: true },
    { idFecha: 7, nroDia: 7, diaHabil: false },
    { idFecha: 8, nroDia: 8, diaHabil: true },
    { idFecha: 9, nroDia: 9, diaHabil: true },
    { idFecha: 10, nroDia: 10, diaHabil: true },

    { idFecha: 11, nroDia: 1, diaHabil: true },
    { idFecha: 12, nroDia: 2, diaHabil: true },
    { idFecha: 13, nroDia: 3, diaHabil: true },
    { idFecha: 14, nroDia: 4, diaHabil: false },
    { idFecha: 15, nroDia: 5, diaHabil: true },
    { idFecha: 16, nroDia: 6, diaHabil: true },
    { idFecha: 17, nroDia: 7, diaHabil: true },
    { idFecha: 18, nroDia: 8, diaHabil: true },
    { idFecha: 19, nroDia: 9, diaHabil: true },
    { idFecha: 20, nroDia: 10, diaHabil: true },
    { idFecha: 21, nroDia: 11, diaHabil: false },
    { idFecha: 22, nroDia: 12, diaHabil: true },
    { idFecha: 23, nroDia: 13, diaHabil: true },
    { idFecha: 24, nroDia: 14, diaHabil: true }
  ]
  listaPersonas = [
    {
      nro: 1,
      nombre: 'John Smith Smith',
      nombreCorto: 'John Smith Smith',
      marcas: [
        { idFecha: 1, asistio: true, licencia: false, falto: false, observacion: null},
        { idFecha: 2, asistio: true, licencia: false, falto: false, observacion: null},
        { idFecha: 3, asistio: true, licencia: false, falto: false, observacion: null},
        { idFecha: 4, asistio: false, licencia: false, falto: true, observacion: null},
        { idFecha: 5, asistio: false, licencia: true, falto: false, observacion: 'Visita medica'},
        { idFecha: 6, asistio: false, licencia: false, falto: true, observacion: null},
        { idFecha: 7, asistio: false, licencia: false, falto: true, observacion: null},
        { idFecha: 8, asistio: false, licencia: false, falto: true, observacion: null}
      ],
      total: {
        asistencias: 2,
        licencias: 1,
        faltas: 4
      }
    },
    {
      nro: 2,
      nombre: 'Antonio Banderas De La Fuente',
      nombreCorto: 'Antonio Banderas De La Fuente',
      marcas: [
        { idFecha: 1, asistio: true, licencia: false, falto: false, observacion: null},
        { idFecha: 2, asistio: true, licencia: false, falto: false, observacion: null},
        { idFecha: 3, asistio: true, licencia: false, falto: false, observacion: null},
        { idFecha: 4, asistio: false, licencia: false, falto: true, observacion: null},
        { idFecha: 5, asistio: false, licencia: true, falto: false, observacion: 'Visita medica'},
        { idFecha: 6, asistio: false, licencia: false, falto: true, observacion: null},
        { idFecha: 7, asistio: false, licencia: false, falto: true, observacion: null},
        { idFecha: 8, asistio: false, licencia: false, falto: true, observacion: null}
      ],
      total: {
        asistencias: 3,
        licencias: 1,
        faltas: 3
      }
    },
    {
      nro: 3,
      nombre: 'Antonio Banderas De La Fuente Banderas De La Fuente',
      nombreCorto: 'Antonio Banderas De La Fuente ...',
      marcas: [
        { idFecha: 1, asistio: true, licencia: false, falto: false, observacion: null},
        { idFecha: 2, asistio: true, licencia: false, falto: false, observacion: null},
        { idFecha: 3, asistio: true, licencia: false, falto: false, observacion: null},
        { idFecha: 4, asistio: false, licencia: false, falto: true, observacion: null},
        { idFecha: 5, asistio: false, licencia: true, falto: false, observacion: 'Visita medica'},
        { idFecha: 6, asistio: false, licencia: false, falto: true, observacion: null},
        { idFecha: 7, asistio: false, licencia: false, falto: true, observacion: null},
        { idFecha: 8, asistio: false, licencia: false, falto: true, observacion: null}
      ],
      total: {
        asistencias: 3,
        licencias: 1,
        faltas: 3
      }
    }
  ]

  constructor(
    private service : AsistenciaService,
    public  dialog  : MatDialog,
    public  pdfmake : PdfmakeService,
    private excelService : ExcelService,
    private snackBar : MatSnackBar
  ) {}

  ngOnInit() {
    this.establecerFechasPorDefecto()
    this.actualizarSelectorTurnos()
  }

  establecerFechasPorDefecto () {
    this.fechaDesde = moment().startOf('month')
    this.fechaHasta = moment().endOf('month')
  }

  actualizarSelectorTurnos () {
    this.turnos = []
    this.grados = []
    this.grupos = []
    this.paralelos = []
    this.idTurno = -1
    this.idGrado = -1
    this.idGrupo = -1
    this.idParalelo = -1
    this.service.getTurnos().subscribe((result:any) => {
      result.forEach(turno => {
        this.turnos.push(turno)
      })
      if (this.turnos.length > 0) {
        this.idTurno = this.turnos[0].id
        this.actualizarSelectorGrados()
      }
    })
  }

  actualizarSelectorGrados () {
    this.grados = []
    this.grupos = []
    this.paralelos = []
    this.idGrado = -1
    this.idGrupo = -1
    this.idParalelo = -1
    this.turnos.forEach((turno:any) => {
      if (turno.id === this.idTurno) {
        this.service.getCursosPorTurno(this.idTurno).subscribe((turno:any) => {
          turno.grados.forEach((grado:any) => {
            this.grados.push(grado)
          })
          if (this.grados.length > 0) {
            this.idGrado = this.grados[0].id
            this.actualizarSelectorGrupos()
          }
        })
      }
    })
  }

  actualizarSelectorGrupos () {
    this.grupos = []
    this.paralelos = []
    this.idGrupo = -1
    this.idParalelo = -1
    this.grados.forEach((grado:any) => {
      if (grado.id === this.idGrado) {
        grado.grupos.forEach((grupo:any) => {
          this.grupos.push(grupo)
        })
        if (this.grupos.length > 0) {
          this.idGrupo = this.grupos[0].id
          this.actualizarSelectorParalelos()
        }
      }
    })
  }

  actualizarSelectorParalelos () {
    this.paralelos = []
    this.idParalelo = -1
    this.grupos.forEach((grupo:any) => {
      if (grupo.id === this.idGrupo) {
        grupo.paralelos.forEach((paralelo:any) => {
          this.paralelos.push(paralelo)
        })
        if (this.paralelos.length > 0) {
          this.idParalelo = this.paralelos[0].id
          this.actualizarTablaAsistencias()
        }
      }
    })
  }

  actualizarTablaAsistencias () {
    this.loadingMode = 'indeterminate'
    setTimeout(() => {
      this.loadingMode = 'determinate'
      console.log('Actualizar ok')
      console.log(' FECHA DESDE = ', this.fechaDesde.format('YYYY-MM-DD'))
      console.log(' FECHA HASTA = ', this.fechaHasta.format('YYYY-MM-DD'))

  
      this.listaMeses = [
        { idMes: 1, nombre: 'Enero 2019', nroDias: 10 },
        { idMes: 2, nombre: 'Febrero 2019', nroDias: 14 }
      ]
  
      // var startDate = moment('2012-1');
      // var endDate = moment('2013-1');
      // var out = [startDate];

      const fDesde = _.cloneDeep(this.fechaDesde)
      const fHasta = _.cloneDeep(this.fechaHasta)
  
      fHasta.add(1, 'day')

      console.log('F1 = ', fDesde)
      console.log('F2 = ', fHasta)

      this.listaFechas = []

      let cnt = 1
      let cntDias = 0
      while (fDesde.isBefore(fHasta)) {
        cntDias++

        console.log('Dia = ' + fDesde.format('DD/MM/YYYY'), ' day =', fDesde.day())
        const nombreMes = _.startCase(fDesde.format('MMMM YYYY'))
        const nroDia = parseInt(fDesde.format('DD'))
        const diaHabil = fDesde.day() % 7 !== 0

        this.listaFechas.push({ idFecha: cnt++, nroDia: nroDia, diaHabil: diaHabil })

        fDesde.add(1, 'day');
      }

      console.log('Lista de fechas  = ', this.listaFechas)

      this.snackBar.open('Lista de asistencias actualizada exitosamente', 'OK', {
        duration: 2000,
        panelClass: ['snackbar-green']
      })
    }, 2000)
  }

  reporteGeneralEXCEL () {
    console.log('Reporte EXCEL (General) ok')
  }

  reporteIndividualEXCEL () {
    console.log('Reporte EXCEL (Individual) ok')
  }

  reporteGeneralPDF () {
    console.log('Reporte PDF (General) ok')
  }

  reporteIndividualPDF () {
    console.log('Reporte PDF (Individual) ok')
  }

  editarObservacion () {
    const dialogRef = this.dialog.open(AgregarObservacionDialog, {
      data: { observacion: '' }
    })

    dialogRef.afterClosed().subscribe((resultadoAsistencia: any) => {
      console.log('Registro guardado ok')
    })
  }
}

@Component({
  selector    : 'agregar-observacion-dialog',
  templateUrl : 'agregar-observacion-dialog.html'
})
export class AgregarObservacionDialog {
  conLicencia : boolean = false
  datosDialogo : any

  asistencia : any = {
    observacion: null
  }

  constructor(
    public dialogRef: MatDialogRef<AgregarObservacionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit () {
    console.log('Datos del formulario: ', this.data)
  }

  cancelar () : void {
    this.dialogRef.close()
  }

  aceptar () : void {
    this.datosDialogo = { data: 'ok' }
    this.dialogRef.close(this.datosDialogo)
  }
}
