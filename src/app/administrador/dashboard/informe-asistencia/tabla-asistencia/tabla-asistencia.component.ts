import { Component, OnInit, Inject }                from '@angular/core'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'

import { PdfmakeService }   from 'ng-pdf-make/pdfmake/pdfmake.service'
import { Cell, Row, Table } from 'ng-pdf-make/objects/table'

import { AsistenciaService } from '../../services/asistencia.service'
import { ExcelService }      from '../../services/excel.service'

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
  mesAsistencia  = moment().format('MM')
  anioAsistencia = moment().format('YYYY')
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
    public  pdfmake : PdfmakeService,
    private excelService : ExcelService
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
    const FECHA_ACTUAL = moment().toDate()
    for (let i = 0; i < nroDias; i++, cnt = (cnt % 7) + 1) {
      const FECHA_ITERACION = moment(`${this.anioAsistencia}-${this.mesAsistencia}-${i+1}`, 'YYYY-MM-DD').toDate()
      const ACTIVO = FECHA_ITERACION.getTime() < FECHA_ACTUAL.getTime() && cnt < 7
      this.days.push({ id: i+1, nro: cnt, active: ACTIVO })
      if (ACTIVO) {
        diasHabiles += 1
      }
    }
    this.service.getAsistencias(this.idTurno, this.idGrado, this.idGrupo, this.idParalelo, this.ini, this.fin).subscribe((result:any) => {
      // console.log(result)
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
        if (registro.idGestionAcademica.horaEntrada) {
          this.horaEntrada = registro.idGestionAcademica.horaEntrada
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
        let ACTIVO = false
        this.days.forEach(day => {
          if (day.id === DIA) {
            diaSemana = day.nro
            ACTIVO = day.active
          }
        })
        const asistencia = {
          id          : registro.id,
          activo      : ACTIVO,
          fecha       : registro.fecha,
          atrasado    : false,
          dia         : DIA,
          diaSemana   : diaSemana,
          estado      : registro.estado,
          hora_llegada: registro.hora_llegada,
          hora_salida : registro.hora_salida,
          observacion : registro.observacion
        }
        for (let i in personas) {
          if (personas[i].id === ID_PERSONA && asistencia.activo) {
            personas[i].asistencias.push(asistencia)
            if (asistencia.estado === 'asistió') {
              personas[i].totalAsistencias += 1
              personas[i].totalFaltas      -= 1
            }
            if (asistencia.estado === 'con licencia') {
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
      //console.log("DATASOURCE = ", this.dataSource)
      this.loadingMode = 'determinate'
    }, error => {
      this.loadingMode = 'determinate'
    })
  }

  exportGeneralToExcel () {
    const MES    = this.mesNombre
    const ANIO   = this.anioNombre
    const TURNO_NOMBRE    = this.obtenerNombreTurno()
    const GRADO_NOMBRE    = this.obtenerNombreGrado()
    const GRUPO_NOMBRE    = this.obtenerNombreGrupo()
    const PARALELO_NOMBRE = this.obtenerNombreParalelo()
    const CURSO  = `Turno: ${TURNO_NOMBRE}   Grado: ${GRADO_NOMBRE}   Grupo: ${GRUPO_NOMBRE}   Paralelo: ${PARALELO_NOMBRE}`
    const WorkBook = []
    WorkBook.push({ A: "INFORME GENERAL DE ASISTENCIA" })
    WorkBook.push({ A: `${MES} ${ANIO}` })
    WorkBook.push({ A: "" })
    WorkBook.push({ A: `${CURSO}` })
    WorkBook.push({ A: "" })
    WorkBook.push({
      A: "N°",
      B: "Estudiante",
      C: "Total asistencias",
      D: "Total Licencias",
      E: "Total Faltas"
    })
    const rows = []
    let cnt = 1
    this.dataSource.forEach(data => {
      const row = {
        A: cnt++ + '',
        B: data.nombre,
        C: data.totalAsistencias,
        D: data.totalLicencias,
        E: data.totalFaltas
      }
      WorkBook.push(row)
    })
    this.excelService.exportAsExcelFile(WorkBook, 'informe-general-asistencia')
  }

  exportToExcel (persona: any) {
    const MES    = this.mesNombre
    const ANIO   = this.anioNombre
    const NOMBRE = persona.nombre
    const HORA_ENTRADA = moment(this.horaEntrada, 'LTS A').format('HH:mm:ss')
    const TURNO_NOMBRE    = this.obtenerNombreTurno()
    const GRADO_NOMBRE    = this.obtenerNombreGrado()
    const GRUPO_NOMBRE    = this.obtenerNombreGrupo()
    const PARALELO_NOMBRE = this.obtenerNombreParalelo()
    const CURSO  = `Turno: ${TURNO_NOMBRE}   Grado: ${GRADO_NOMBRE}   Grupo: ${GRUPO_NOMBRE}   Paralelo: ${PARALELO_NOMBRE}`

    const WorkBook = []
    WorkBook.push({ A: "INFORME DE ASISTENCIA" })
    WorkBook.push({ A: `${MES} ${ANIO}` })
    WorkBook.push({ A: "" })
    WorkBook.push({ A: `Estudiante: ${NOMBRE}` })
    WorkBook.push({ A: `${CURSO}` })
    // WorkBook.push({ A: "" })
    // WorkBook.push({ A: `Hora de entrada: ${HORA_ENTRADA}` })
    WorkBook.push({ A: "" })
    WorkBook.push({
      A: "Fecha",
      B: "Hora de llegada",
      C: "Hora de salida",
      D: "Estado",
      E: "Observación"
    })
    let totalAsistencias = 0
    let totalFaltas      = 0
    let totalLicencias   = 0
    this.dataSource.forEach(data => {
      if (data.id === persona.id) {
        totalAsistencias = data.totalAsistencias
        totalLicencias   = data.totalLicencias
        totalFaltas      = data.totalFaltas

        for (let i in this.days) {
          const DAY = this.days[i]
          let row
          if (DAY.active) {
            data.asistencias.forEach(asis => {
              if (DAY.id === parseInt(asis.dia)) {
                const FECHA = moment(asis.fecha).format('DD/MM/YYYY')
                const TA = moment(asis.hora_llegada, 'LTS A')
                const TB = moment(this.horaEntrada, 'LTS A')
                let DIFF = TA.diff(TB) / 1000
                let segundos = parseInt(`${DIFF % 60}`)
                let minutos = parseInt(`${(DIFF / 60) % 60}`)
                let horas = parseInt(`${(DIFF / 60) / 60}`)
                // let ATRASO = (isNaN(DIFF) || DIFF < 0) ? '' : `${horas < 10 ? '0' + horas : horas}:${minutos < 10 ? '0' + minutos : minutos}:${segundos < 10 ? '0' + segundos : segundos}`
                const HORA_LLEGADA = asis.hora_llegada ? moment(asis.hora_llegada, 'LTS A').format('HH:mm:ss') : ''
                const HORA_SALIDA  = asis.hora_salida ? moment(asis.hora_salida, 'LTS A').format('HH:mm:ss') : ''
                row = {
                  A: FECHA,
                  B: HORA_LLEGADA,
                  C: HORA_SALIDA,
                  D: asis.estado,
                  E: asis.observacion
                }
              }
            })
          }
          if (!row) {
            const FECHA = `${DAY.id < 10 ? `0${DAY.id}` : DAY.id }/${this.mesAsistencia}/${this.anioAsistencia}`
            row = {
              A: FECHA,
              B: '',
              C: '',
              D: DAY.active ? 'faltó' : ' - - - ',
              E: ''
            }
          }
          if (DAY.active) {
            WorkBook.push(row)
          }
        }
      }
    })
    WorkBook.push({ A: "" })
    WorkBook.push({ A: "Total asistencias:", B: totalAsistencias })
    WorkBook.push({ A: "Total licencias:", B: totalLicencias })
    WorkBook.push({ A: "Total faltas:", B: totalFaltas })
    this.excelService.exportAsExcelFile(WorkBook, 'informe-asistencia')
  }

  print (persona) {
    const header1 = new Cell('Fecha')
    const header2 = new Cell('Hora\nLlegada')
    const header3 = new Cell('Hora\nSalida')
    // const header4 = new Cell('Atraso')
    const header5 = new Cell('Estado')
    const header6 = new Cell('Observación')
    const headerRows = new Row([header1, header2, header3, header5, header6])
    const rows = []
    let totalAsistencias = 0
    let totalFaltas      = 0
    let totalLicencias   = 0
    this.dataSource.forEach(data => {
      if (data.id === persona.id) {
        totalAsistencias = data.totalAsistencias
        totalLicencias   = data.totalLicencias
        totalFaltas      = data.totalFaltas
        // data.asistencias.sort((a: any, b: any) => {
        //   const fechaA = (new Date(a.fecha)).getTime()
        //   const fechaB = (new Date(b.fecha)).getTime()
        //   return fechaA - fechaB
        // })
        for (let i in this.days) {
          const DAY = this.days[i]
          let row
          if (DAY.active) {
            data.asistencias.forEach(asis => {
              if (DAY.id === parseInt(asis.dia)) {
                const FECHA = moment(asis.fecha).format('DD/MM/YYYY')
                const TA = moment(asis.hora_llegada, 'LTS A')
                const TB = moment(this.horaEntrada, 'LTS A')
                let DIFF = TA.diff(TB) / 1000
                let segundos = parseInt(`${DIFF % 60}`)
                let minutos = parseInt(`${(DIFF / 60) % 60}`)
                let horas = parseInt(`${(DIFF / 60) / 60}`)
                let ATRASO = (isNaN(DIFF) || DIFF < 0) ? '' : `${horas < 10 ? '0' + horas : horas}:${minutos < 10 ? '0' + minutos : minutos}:${segundos < 10 ? '0' + segundos : segundos}`
                const HORA_LLEGADA = asis.hora_llegada ? moment(asis.hora_llegada, 'LTS A').format('HH:mm:ss') : ''
                const HORA_SALIDA  = asis.hora_salida ? moment(asis.hora_salida, 'LTS A').format('HH:mm:ss') : ''
                row = new Row([
                  new Cell(FECHA),
                  new Cell(HORA_LLEGADA),
                  new Cell(HORA_SALIDA),
                  // new Cell(ATRASO),
                  new Cell(asis.estado),
                  new Cell(asis.observacion),
                ])
              }
            })
          }
          if (!row) {
            const FECHA = `${DAY.id < 10 ? `0${DAY.id}` : DAY.id }/${this.mesAsistencia}/${this.anioAsistencia}`
            row = new Row([
              new Cell(FECHA),
              new Cell(''),
              new Cell(''),
              // new Cell(''),
              new Cell(DAY.active ? 'faltó' : ' - - - '),
              new Cell(''),
            ])
          }
          if (DAY.active) {
            rows.push(row)
          }
        }
      }
    })

    const widths = [70, 50, 50, 70, '*']
    const table  = new Table(headerRows, rows, widths)
    const MES    = this.mesNombre
    const ANIO   = this.anioNombre
    const NOMBRE = persona.nombre
    const HORA_ENTRADA = moment(this.horaEntrada, 'LTS A').format('HH:mm:ss')
    const TURNO_NOMBRE    = this.obtenerNombreTurno()
    const GRADO_NOMBRE    = this.obtenerNombreGrado()
    const GRUPO_NOMBRE    = this.obtenerNombreGrupo()
    const PARALELO_NOMBRE = this.obtenerNombreParalelo()
    const CURSO  = `Turno: ${TURNO_NOMBRE}   Grado: ${GRADO_NOMBRE}   Grupo: ${GRUPO_NOMBRE}   Paralelo: ${PARALELO_NOMBRE}`
    this.pdfmake.docDefinition = {
      header: { text: 'Sistema académico', style: 'header', margin: [15, 15] },
      footer: { text: `Fecha de impresión: ${moment().format('DD/MM/YYYY HH:mm:ss')}`, style: 'footer', margin: [15,15,15,15] },
      content:[
        { text:`INFORME DE ASISTENCIA\n${MES} ${ANIO}\n\nEstudiante: ${NOMBRE}\n${CURSO}\n\n`, bold:true, fontSize:11, alignment:'center' },
        // { text:`Hora de entrada: ${HORA_ENTRADA}\n\n`, fontSize:11, alignment:'left' },
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
    // this.pdfmake.configureStyles({ table: { fontSize: 10 } })
    this.pdfmake.addTable(table)
    this.pdfmake.addText(`\n`)
    this.pdfmake.addText(`Total asistencias: ${totalAsistencias}`)
    this.pdfmake.addText(`Total licencias: ${totalLicencias}`)
    this.pdfmake.addText(`Total faltas: ${totalFaltas}`)
    this.pdfmake.open()
  }

  printGeneral () {
    const header1 = new Cell('N°')
    const header2 = new Cell('Estudiante')
    const header3 = new Cell('Total\nAsistencias')
    const header5 = new Cell('Total\nLicencias')
    const header4 = new Cell('Total\nFaltas')
    const headerRows = new Row([header1, header2, header3, header4, header5])
    const rows = []
    let cnt = 1
    this.dataSource.forEach(data => {
      const row = new Row([
        new Cell(cnt++ + ''),
        new Cell(data.nombre),
        new Cell(data.totalAsistencias),
        new Cell(data.totalLicencias),
        new Cell(data.totalFaltas),
      ])
      rows.push(row)
    })
    const widths = [30, '*', 65, 60, 60]
    const table  = new Table(headerRows, rows, widths)
    const MES    = this.mesNombre
    const ANIO   = this.anioNombre
    const TURNO_NOMBRE    = this.obtenerNombreTurno()
    const GRADO_NOMBRE    = this.obtenerNombreGrado()
    const GRUPO_NOMBRE    = this.obtenerNombreGrupo()
    const PARALELO_NOMBRE = this.obtenerNombreParalelo()
    const CURSO  = `Turno: ${TURNO_NOMBRE}   Grado: ${GRADO_NOMBRE}   Grupo: ${GRUPO_NOMBRE}   Paralelo: ${PARALELO_NOMBRE}`
    this.pdfmake.docDefinition = {
      header: { text: 'Sistema académico', style: 'header', margin: [15, 15] },
      footer: { text: `Fecha de impresión: ${moment().format('DD/MM/YYYY HH:mm:ss')}`, style: 'footer', margin: [15,15,15,15] },
      content:[
        { text:`INFORME GENERAL DE ASISTENCIA\n${MES} ${ANIO}\n\n${CURSO}\n\n`, bold:true, fontSize:11, alignment:'center' }
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
    // this.pdfmake.configureStyles({ table: { fontSize: 10 } })
    this.pdfmake.addTable(table)
    this.pdfmake.open()
    // this.pdfmake.print()
    // this.pdfmake.download('Reporte general.pdf')
  }

  private obtenerNombreTurno () {
    for (let i in this.turnos) { if (this.turnos[i].id === this.idTurno) { return this.turnos[i].nombre } }
  }

  private obtenerNombreGrado () {
    for (let i in this.grados) { if (this.grados[i].id === this.idGrado) { return this.grados[i].nombre } }
  }

  private obtenerNombreGrupo () {
    for (let i in this.grupos) { if (this.grupos[i].id === this.idGrupo) { return this.grupos[i].nombre } }
  }

  private obtenerNombreParalelo () {
    for (let i in this.paralelos) { if (this.paralelos[i].id === this.idParalelo) { return this.paralelos[i].nombre } }
  }

  editarObservacion (dia, persona, asistencia) {
    // console.log("Asistencia = ", asistencia)
    const DIA     = dia < 10 ? `0${dia}` : dia
    const FECHA   = moment(`${DIA}/${this.mesAsistencia}/${this.anioAsistencia}`, 'DD/MM/YYYY').format('LL')
    let dialogRef = this.dialog.open(AgregarObservacionDialog, {
      data: { nombre: persona.nombre, fecha: FECHA, asistencia: asistencia }
    })

    dialogRef.afterClosed().subscribe((resultadoAsistencia: any) => {
      // console.log(resultadoAsistencia)
      if (!resultadoAsistencia) { return }
      if (!asistencia) {
        const data =  {
          idPersona          : persona.id,
          idGestionAcademica : persona.idGestionAcademica,
          fecha              : moment(`${DIA}/${this.mesAsistencia}/${this.anioAsistencia}`, 'DD/MM/YYYY').toDate(),
          observacion        : resultadoAsistencia.observacion,
          estado             : resultadoAsistencia.estado
        }
        // console.log("CREANDO ...\n", data)
        return this.service.create(data).subscribe(result => {
          // console.log("RESULT = ", result)
          this.actualizar()
        })
      }
      // console.log("ACTUALIZANDO ...\n", resultadoAsistencia)
      return this.service.update(resultadoAsistencia, asistencia.id).subscribe(result => {
        // console.log("RESULTADO = ", result)
        this.actualizar()
      })
    })
  }
}

@Component({
  selector    : 'agregar-observacion-dialog',
  templateUrl : 'agregar-observacion-dialog.html'
})
export class AgregarObservacionDialog {
  conLicencia : boolean = false

  asistencia : any = {
    observacion: null
  }

  constructor(
    public dialogRef: MatDialogRef<AgregarObservacionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit () {
    if (this.data.asistencia) {
      this.asistencia = this.data.asistencia
      this.conLicencia = this.data.asistencia.estado === 'con licencia'
    }
  }

  cancelar () : void {
    this.dialogRef.close()
  }

  aceptar () : void {
    this.asistencia.estado = this.conLicencia ? 'con licencia' : (this.asistencia.hora_llegada ? 'asistió' : 'faltó')
    this.dialogRef.close(this.asistencia)
  }
}
