// Libreries
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { catchError, map, tap }                       from 'rxjs/operators'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { of }         from 'rxjs/observable/of'
import 'rxjs/add/observable/throw'

// Servicios
import { Global as Config } from './../../../config/global';

import * as moment from 'moment'

const RESOURCE_URL = `${Config.BASE_URL}:${Config.port}/asistencia`

@Injectable()
export class AsistenciaService {

  constructor(
    private http: HttpClient
  ) {}

  getAsistencias() : Observable<Object> {
    return this.http.get(`${RESOURCE_URL}`)
  }

  // getId(id) : Observable<Object> {
  //   return this.http.get(`${RESOURCE_URL}/${id}`)
  // }

  create(data: any) : Observable<Object> {
    return this.http.post(`${RESOURCE_URL}`, JSON.stringify(data))
  }

  update(data: any, id) : Observable<Object> {
    return this.http.put(`${RESOURCE_URL}/${id}`, JSON.stringify(data))
  }
  //
  // delete(id) : Observable<Object> {
  //   return this.http.delete(`${RESOURCE_URL}/${id}`)
  // }
  //
  // restore(id) : Observable<Object> {
  //   return this.http.put(`${RESOURCE_URL}/${id}/restaurar`, null)
  // }
}
