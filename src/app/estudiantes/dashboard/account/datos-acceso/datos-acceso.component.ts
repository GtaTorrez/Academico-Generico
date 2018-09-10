// libreries
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material'

// Services
import { DataService }      from '../../../../login/data.service';
import { DashboardService } from '../../dashboard.service'

import { DatosAccesoModel } from './datos-acceso.model'

@Component({
  selector    : 'dashboard-datos-acceso',
  templateUrl : './datos-acceso.component.html',
  styleUrls   : ['./datos-acceso.component.scss']
})
export class DatosAccesoComponent implements OnInit {
  rolSesion : string
  model     : DatosAccesoModel
  submitted : boolean = false
  listaRoles : any[]

  constructor (
    private dashboardService : DashboardService,
    public  snackBar         : MatSnackBar,
  ) {
    this.model = new DatosAccesoModel()
  }

  ngOnInit () {
    const SESSION = DataService.getSession()
    this.model.id       = SESSION.usuario.id
    this.model.username = SESSION.usuario.username
    this.model.rol      = SESSION.usuario.rol
  }

  onSubmit () {
    if (this.submitted) { return }
    if (this.model.password !== this.model.password_confirm) {
      return this.snackBar.open('Las contraseñas no coinciden', 'Error', { duration: 2000 })
    }
    const DATA = {
      id             : this.model.id,
      actualPassword : this.model.password_actual,
      nuevoPassword  : this.model.password
    }
    this.submitted = true
    this.dashboardService.cambiarPassword(DATA).subscribe((result : any) => {
      this.submitted = false
      this.snackBar.open('Contraseña actualizada exitosamente', 'Ok', { duration: 2000 })
    },
    error => {
      console.log("ERROR = ", error)
      this.snackBar.open('Fatal Error', 'Error', { duration: 2000 })
    })
  }

}
