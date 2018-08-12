// libreries
import { Component, OnInit } from '@angular/core';
// Services
import { DataService } from '../../services/data.service';

@Component({
  selector    : 'dashboard-account',
  templateUrl : './account.component.html',
  styleUrls   : ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  idUsuario      = 0
  nombre         = ''
  roles          = ''
  tokenAcceso    = ''
  tokenRefresco  = ''

  constructor () {}

  ngOnInit () {
    const SESSION = DataService.getSession()
    if (SESSION) {
      this.idUsuario     = SESSION.usuario.id_usuario
      this.nombre        = SESSION.usuario.nombre
      this.roles         = SESSION.usuario.roles.toString()
      this.tokenAcceso   = SESSION.token_acceso
      this.tokenRefresco = SESSION.token_refresco
    }
  }

}
