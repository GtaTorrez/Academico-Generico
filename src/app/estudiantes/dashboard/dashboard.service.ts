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

const CUENTA_URL = `${Config.AUTHORIZATION.cuentaURL}`

@Injectable()
export class DashboardService {

  constructor(
    private http: HttpClient
  ) {}

  obtenerCuenta(fields = 'ALL') : Observable<Object> {
    const QUERY = `fields=${fields}`
    return this.http.get(`${CUENTA_URL}?${QUERY}`).pipe(
      map((result: any) => {
        const rolesId     = []
        const rolesNombre = []
        result.data.roles.forEach(rol => {
          if (rol.rol) {
            rolesNombre.push(rol.rol.nombre)
            rolesId.push(rol.rol.id_rol)
          }
        })
        result.data.rolesId     = rolesId
        result.data.rolesNombre = rolesNombre
        return result
      })
    )
  }

  actualizarCuenta(body) : Observable<Object> {
    return this.http.put(CUENTA_URL, body)
  }

  cambiarPassword (body: any) : Observable<Object> {
    return this.http.post(Config.AUTHORIZATION.cambiarPasswordURL, body)
  }
}
