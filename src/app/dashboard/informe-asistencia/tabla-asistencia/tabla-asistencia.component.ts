import { Component, OnInit } from '@angular/core'
import { Router }      from '@angular/router'

// // Servicios
// import { AuthService } from '../../services/auth/auth.service'
// import { DataService } from '../../services/data/data.service'
// import { NotificationService } from '../../services/notification/notification.service'
// import { ReportService } from '../../services/report/report.service'

// modelos
// import { Usuario } from '../../shared/usuario'

@Component({
  selector: 'tabla-asistencia',
  inputs: ['dataSource:data-source', 'columns'],
  templateUrl: './tabla-asistencia.component.html',
  styleUrls: ['./tabla-asistencia.component.scss']
})

export class TablaAsistenciaComponent implements OnInit {
  columns    : Array<any>
  dataSource : Array<any>
  constructor(
    // public router      : Router,
    // public authService : AuthService,
    // private reportService: ReportService
  ) { }

  ngOnInit() {
    this.columns = [
      { id: 1, name: 'Col 1' },
      { id: 2, name: 'Col 2' },
      { id: 3, name: 'Col 3' }
    ]
    this.dataSource = [
      { id: 1, nombre: 'Juan Perez', asistencias: [ { id: 1, fecha: '02/01/2017', hora: '08:12:20' } ] },
      { id: 2, nombre: 'Juan Perez', asistencias: [ { id: 2, fecha: '02/01/2017', hora: '08:12:20' } ] }
    ]
    console.log("Tabla de asistencia init")
  }
}
