import { Component, OnInit } from '@angular/core'
import { Router }      from '@angular/router'

// // Servicios
// import { AuthService } from '../../services/auth/auth.service'
// import { DataService } from '../../services/data/data.service'

@Component({
  selector: 'app-informe-asistencia',
  templateUrl: './informe-asistencia.component.html',
  styleUrls: ['./informe-asistencia.component.scss']
})

export class InformeAsistenciaComponent implements OnInit {
  usuario = { nombre: '' }

  constructor(
    // public router      : Router,
    // public authService : AuthService,
  ) {
  }

  ngOnInit() {
    console.log("Informe asistencia init")
  }
}
