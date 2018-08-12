// libreries
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material'

// Services
import { DataService }      from '../../../services/data.service';
import { DashboardService } from '../../dashboard.service'

import { DatosGeneralesModel } from './datos-generales.model'

@Component({
  selector    : 'dashboard-datos-generales',
  templateUrl : './datos-generales.component.html',
  styleUrls   : ['./datos-generales.component.scss']
})
export class DatosGeneralesComponent implements OnInit {
  rolSesion  : string
  model      : DatosGeneralesModel
  submitted  : boolean = false
  listaRoles : any[]

  constructor (
    private dashboardService : DashboardService,
    public  snackBar         : MatSnackBar,
  ) {
    this.model      = new DatosGeneralesModel()
    this.listaRoles = [
      { id_rol: 1, nombre: 'superadmin' },
      { id_rol: 2, nombre: 'admin' },
      { id_rol: 3, nombre: 'user' }
    ]
  }

  ngOnInit () {
    const SESSION = DataService.getSession()
    const fields = 'ALL'
    this.dashboardService.obtenerCuenta(fields).subscribe((result : any) => {
      this.model.id_usuario                  = result.data.id_usuario
      this.model.persona.nombre              = result.data.persona.nombre              || ' '
      this.model.persona.primer_apellido     = result.data.persona.primer_apellido     || ' '
      this.model.persona.segundo_apellido    = result.data.persona.segundo_apellido    || ' '
      this.model.persona.documento_identidad = result.data.persona.documento_identidad || ' '
      this.model.persona.direccion           = result.data.persona.direccion           || ' '
      this.model.persona.telefono            = result.data.persona.telefono            || ' '
      this.model.persona.email               = result.data.persona.email               || ' '
      this.model.administrador.cargo         = result.data.persona.administador ? result.data.persona.administrador.cargo : ' '
      this.model.roles                       = result.data.rolesId
    },
    error => {
      this.snackBar.open(error.errors[0].msg, 'Error', { duration: 2000 })
    })
  }

  onSubmit () {
    if (this.submitted) { return }
    this.submitted = true
    this.dashboardService.actualizarCuenta(this.model).subscribe((result : any) => {
      this.snackBar.open(result.message, 'Ok', { duration: 2000 })
      this.submitted = false
    },
    error => {
      this.snackBar.open(error.errors[0].msg, 'Error', { duration: 2000 })
      this.submitted = false
    })
  }

}
