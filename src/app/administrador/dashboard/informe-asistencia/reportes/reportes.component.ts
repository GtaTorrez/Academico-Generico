import { Component, OnInit } from '@angular/core'
import { Router }      from '@angular/router'

// // Servicios
// import { AuthService } from '../../services/auth/auth.service'
// import { DataService } from '../../services/data/data.service'

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})

export class ReportesComponent implements OnInit {
  usuario = { nombre: '' }
  pdfSrc: string = 'archivo.pdf';

  constructor(
    // public router      : Router,
    // public authService : AuthService,
  ) {}

  ngOnInit() {
    console.log("Reportes init")
  }
}
