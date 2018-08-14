// libreries
import { Component, OnInit } from '@angular/core';
// Services
import { DataService } from '../../../login/data.service';

@Component({
  selector    : 'dashboard-home',
  templateUrl : './home.component.html',
  styleUrls   : ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // idUsuario      = 0
  // nombre         = ''
  // roles          = ''
  // tokenAcceso    = ''
  // tokenRefresco  = ''

  constructor () {}

  ngOnInit () {
    // const SESSION = DataService.getSession()
    // if (SESSION) {
    //   this.idUsuario     = SESSION.usuario.id_usuario
    //   this.nombre        = SESSION.usuario.nombre
    //   this.roles         = SESSION.usuario.roles.toString()
    //   this.tokenAcceso   = SESSION.token_acceso
    //   this.tokenRefresco = SESSION.token_refresco
    // }
  }

}
