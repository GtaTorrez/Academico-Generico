import { Component, OnInit } from '@angular/core'
import { Router }      from '@angular/router'

@Component({
  selector: 'reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})

export class ReportesComponent implements OnInit {
  usuario = { nombre: '' }
  pdfSrc: string = 'archivo.pdf';
  codigo: string = ''

  constructor() {}

  ngOnInit() {}

  aceptar () {}
}
