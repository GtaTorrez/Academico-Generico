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
    // const SESSION = DataService.getSession()
    this.dashboardService.obtenerCuenta().subscribe((result : any) => {
      console.log("RESULT = ", result)
      this.model.id_usuario                  = result.usuario.id
      this.model.persona.nombre              = result.usuario.nombre         || ' '
      this.model.persona.primer_apellido     = result.usuario.paterno        || ' '
      this.model.persona.segundo_apellido    = result.usuario.materno        || ' '
      this.model.persona.documento_identidad = result.usuario.cedula         || ' '
      this.model.persona.direccion           = result.usuario.direccion      || ' '
      this.model.persona.telefono            = result.usuario.celular        || ' '
      this.model.persona.email               = result.usuario.email          || ' '
      this.model.administrador.cargo         = ''
      this.model.rol                         = result.usuario.rol            || ''
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
