import { Component, OnInit } from '@angular/core'
import { Router }      from '@angular/router'

@Component({
  selector: 'app-informe-asistencia',
  templateUrl: './informe-asistencia.component.html',
  styleUrls: ['./informe-asistencia.component.scss']
})

export class InformeAsistenciaComponent implements OnInit {
  usuario = { nombre: '' }

  constructor() {}

  ngOnInit() {}
}
