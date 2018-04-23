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

const BASE           = `${Config.BASE_URL}:${Config.port}`
const ACTUALIZAR_URL = `${BASE}/asistencia`
const ASISTENCIA_URL = `${BASE}/report/curso`
const CURSOS_URL     = `${BASE}/curso`
// const REPORT_URL   = `${Config.BASE_URL}:${Config.port}/reporte`
const REPORT_URL     = `http://localhost:4000/reporte`

@Injectable()
export class AsistenciaService {

  constructor(
    private http: HttpClient
  ) {}

  getCursos () {
    return this.http.get(`${CURSOS_URL}`)
  }

  getAsistencias(idTurno, idGrado, idGrupo, idParalelo, ini, fin) : Observable<Object> {
    return this.http.get(`${ASISTENCIA_URL}?idTurno=${idTurno}&idGrado=${idGrado}&idGrupo=${idGrupo}&idParalelo=${idParalelo}&ini=${ini}&fin=${fin}`)
    // return this.http.get(`${ASISTENCIA_URL}`)
  }

  // getReporte(idPersona) : Observable<Object> {
  //   // return this.http.get(`${REPORT_URL}/asistencia/individual`)
  //   return this.http.get(`${REPORT_URL}/asistencia/individual/${idPersona}`, { responseType: "blob" })
  // }
  //
  // getReporteGeneral(idTurno, idGrado, idGrupo, idParalelo) : Observable<Object> {
  //   // return this.http.get(`${REPORT_URL}/asistencia/general`)
  //   return this.http.get(`${REPORT_URL}/asistencia/general`, { responseType: "blob" })
  //   // return this.http.get(`http://192.168.0.102:1337/reportes/output.pdf`, { responseType: "blob" })
  // }
  // getId(id) : Observable<Object> {
  //   return this.http.get(`${ASISTENCIA_URL}/${id}`)
  // }

  create(data: any) : Observable<Object> {
    return this.http.post(`${ACTUALIZAR_URL}`, JSON.stringify(data))
  }

  update(data: any, id) : Observable<Object> {
    return this.http.put(`${ACTUALIZAR_URL}/${id}`, JSON.stringify(data))
  }
  //
  // delete(id) : Observable<Object> {
  //   return this.http.delete(`${ASISTENCIA_URL}/${id}`)
  // }
  //
  // restore(id) : Observable<Object> {
  //   return this.http.put(`${ASISTENCIA_URL}/${id}/restaurar`, null)
  // }
}
