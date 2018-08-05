import { Component, OnInit, Inject }                from '@angular/core'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'

import { PdfmakeService }   from 'ng-pdf-make/pdfmake/pdfmake.service';
import { Cell, Row, Table } from 'ng-pdf-make/objects/table';

// import { saveAs } from "file-saver";

import { AsistenciaService } from '../../services/asistencia.service'

import 'rxjs/Rx'
import * as moment from 'moment'
moment.locale('es')

@Component({
  selector:    'tabla-asistencia',
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

  idGrupo    = -1
  idGrado    = -1
  idTurno    = -1
  idParalelo = -1

  ini         = '2018-01-01'
  fin         = '2018-31-01'
  horaEntrada = '08:00:00 AM'

  turnos    = []
  grados    = []
  grupos    = []
  paralelos = []

  constructor(
    private service : AsistenciaService,
    public  dialog  : MatDialog,
    public  pdfmake : PdfmakeService
  ) {}

  ngOnInit() {
    this.actualizarSelectorTurnos()
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
          this.actualizar()
        }
      }
    })
  }

  actualizar () {
    this.loadingMode = 'indeterminate'
    const mes        = `${this.anioAsistencia}-${this.mesAsistencia}-01`
    this.mesNombre   = moment(mes).format('MMMM').toUpperCase()
    this.anioNombre  = moment(mes).format('YYYY').toUpperCase()
    const nroDias    = moment(mes).daysInMonth()
    this.ini = mes
    this.fin = `${this.anioAsistencia}-${this.mesAsistencia}-${nroDias}`

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
    this.service.getAsistencias(this.idTurno, this.idGrado, this.idGrupo, this.idParalelo, this.ini, this.fin).subscribe((result:any) => {
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
          hora_llegada: registro.hora_llegada,
          hora_salida : registro.hora_salida,
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
      personas.sort((a, b) => { return a.nombre.localeCompare(b.nombre) })
      this.dataSource  = personas
      this.loadingMode = 'determinate'
    }, error => {
      this.loadingMode = 'determinate'
    })
  }

  print (persona) {
    const header1 = new Cell('Nro.')
    const header2 = new Cell('Hora\Entrada')
    const header3 = new Cell('Hora\nLlegada')
    const header4 = new Cell('Hora\nSalida')
    const header5 = new Cell('Atraso')
    const header6 = new Cell('Observación')
    const headerRows = new Row([header1, header2, header3, header4, header5, header6])
    const rows = []
    let cnt = 1
    this.dataSource.forEach(data => {
      if (data.id === persona.id) {
        data.asistencias.forEach(asis => {
          const TA = moment(asis.hora_llegada, 'LTS')
          const TB = moment(this.horaEntrada, 'LTS')
          let TF   = moment.duration(TA.diff(TB)).asMinutes()
          if (TF < 0) { TF = 0 }
          const row = new Row([
            new Cell(cnt++ + ''),
            new Cell(this.horaEntrada),
            new Cell(asis.hora_llegada),
            new Cell(asis.hora_salida),
            new Cell(TF + ' mins.'),
            new Cell(asis.observacion),
          ])
          rows.push(row)
        })
      }
    })

    const widths = [30, 80, 80, 80, 80, '*']
    const table  = new Table(headerRows, rows, widths)
    const MES    = this.mesNombre
    const ANIO   = this.anioNombre
    const NOMBRE = persona.nombre

    this.pdfmake.docDefinition = {
      header: { text: 'Sistema académico', style: 'header', margin: [5, 15] },
      footer: { text: 'Copyright 2018', style: 'footer', margin: [15,15,15,15] },
      content:[
        { text:`\nINFORME DE ASISTENCIA\n${NOMBRE}\n\n`, bold:true, fontSize:12, alignment:'center' }
      ],
      styles: {
        header: {
          fontSize: 11,
          bold: true,
          alignment:'center'
        },
        footer: {
          fontSize: 7,
          italic:true,
          alignment:'right'
        }
      }
    }
    this.pdfmake.addTable(table)
    this.pdfmake.open()
    // this.pdfmake.print();
    // this.pdfmake.download('Reporte general.pdf');
  }

  printGeneral () {
    const header1 = new Cell('Nro.')
    const header2 = new Cell('Nombre')
    const header3 = new Cell('Total\nAsistencias')
    const header4 = new Cell('Total\nFaltas')
    const header5 = new Cell('Total\nLicencias')
    const headerRows = new Row([header1, header2, header3, header4, header5])
    const rows = []
    let cnt = 1
    this.dataSource.forEach(data => {
      const row = new Row([
        new Cell(cnt++ + ''),
        new Cell(data.nombre),
        new Cell(data.totalAsistencias),
        new Cell(data.totalFaltas),
        new Cell(data.totalLicencias),
      ])
      rows.push(row)
    })
    const widths = [50, '*', 60, 60, 60]
    const table  = new Table(headerRows, rows, widths)
    const MES    = this.mesNombre
    const ANIO   = this.anioNombre
    this.pdfmake.docDefinition = {
      header: { text: 'Sistema académico', style: 'header', margin: [5, 15] },
      footer: { text: 'Copyright 2018', style: 'footer', margin: [15, 15, 15, 15] },
      content:[
        { text:`\nINFORME GENERAL DE ASISTENCIA\n${MES} ${ANIO}\n\n`, bold:true, fontSize:12, alignment:'center' }
      ],
      styles: {
        header: {
          fontSize: 11,
          bold: true,
          alignment:'center'
        },
        footer: {
          fontSize: 7,
          italic:true,
          alignment:'right'
        }
      }
    }
    this.pdfmake.addTable(table)
    this.pdfmake.open()
    // this.pdfmake.print()
    // this.pdfmake.download('Reporte general.pdf')
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
            fecha              : moment(`${DIA}/${this.mesAsistencia}/${this.anioAsistencia}`, 'DD/MM/YYYY').toDate(),
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
  ) {}

  ngOnInit () {
    if (this.data.asistencia) {
      this.asistencia = this.data.asistencia
    }
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
