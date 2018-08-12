// Libraries
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { catchError, map, tap }                       from 'rxjs/operators'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { of }         from 'rxjs/observable/of'
import 'rxjs/add/observable/throw'

// Servicios
import { ConfigService as Config } from '../../services/config.service';

import * as moment from 'moment'

const RESOURCE_URL = `${Config.AUTHORIZATION.api}/usuarios`

@Injectable()
export class UsuariosService {

  constructor(
    private http: HttpClient
  ) {}

  get(fields = 'ALL', order = 'id_usuario', limit = 50, page = 1) : Observable<Object> {
    const QUERY = `fields=${fields}&order=${order}&limit=${limit}&page=${page}`
    return this.http.get(`${RESOURCE_URL}?${QUERY}`).pipe(
      map((result : any) => {
        result.data.forEach(data => {
          const rolesNombre = []
          const rolesId     = []
          data.roles.forEach(rol => {
            if (rol.rol) {
              rolesId.push(rol.rol.id_rol)
              rolesNombre.push(rol.rol.nombre)
            }
          })
          data.rolesId     = rolesId
          data.rolesNombre = rolesNombre
        })
        return result
      })
    )
  }

  getId(fields = 'ALL', id) : Observable<Object> {
    const QUERY = `fields=${fields}`
    return this.http.get(`${RESOURCE_URL}/${id}?${QUERY}`).pipe(
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

  create(data: any) : Observable<Object> {
    return this.http.post(`${RESOURCE_URL}`, JSON.stringify(data))
  }

  update(data: any, id) : Observable<Object> {
    return this.http.put(`${RESOURCE_URL}/${id}`, JSON.stringify(data))
  }

  delete(id) : Observable<Object> {
    return this.http.delete(`${RESOURCE_URL}/${id}`)
  }

  restore(id) : Observable<Object> {
    return this.http.put(`${RESOURCE_URL}/${id}/restaurar`, null)
  }

  enable(id) : Observable<Object> {
    return this.http.post(Config.AUTHORIZATION.habilitarCuentaURL, { id_usuario: id })
  }

  disable(id) : Observable<Object> {
    return this.http.post(Config.AUTHORIZATION.deshabilitarCuentaURL, { id_usuario: id })
  }
}
