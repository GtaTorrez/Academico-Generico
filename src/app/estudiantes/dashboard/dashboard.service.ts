// Libraries
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { catchError, map, tap }                       from 'rxjs/operators'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { of }         from 'rxjs/observable/of'
import 'rxjs/add/observable/throw'

// Servicios
import { ConfigService as Config } from '../services/config.service';

import * as moment from 'moment'
import { Global } from '../../config/global';

const CUENTA_URL = `${Config.AUTHORIZATION.cuentaURL}`

@Injectable()
export class DashboardService {

  constructor(
    private http: HttpClient
  ) {}

  obtenerCuenta() : Observable<Object> {
    return this.http.get(Config.AUTHORIZATION.cuentaURL, { withCredentials: true })
  }

  actualizarCuenta(body) : Observable<Object> {
    return this.http.put(CUENTA_URL, body)
  }

  cambiarPassword (body: any) : Observable<Object> {
    return this.http.post(Config.AUTHORIZATION.cambiarPasswordURL, body, { withCredentials: true })
  }

  postDispositivo(dispositivo){
    console.log("upload ",dispositivo);
    let body={"idDispositivo":dispositivo}
    return this.http.post(Global.BASE_URL+":"+Global.port+"/dispositivo/adicionar",body,{withCredentials:true})
  }
}
