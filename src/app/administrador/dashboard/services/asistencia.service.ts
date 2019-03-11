// Libreries
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { catchError, map, tap }                       from 'rxjs/operators'
import { Injectable } from '@angular/core'
import { Observable ,  of } from 'rxjs'


// Servicios
import { Global} from './../../../config/global';

import * as moment from 'moment'

const BASE           = `${Global.BASE_URL}:${Global.port}`
const ACTUALIZAR_URL = `${BASE}/asistencia`
const ASISTENCIA_URL = `${BASE}/report/curso`
const CURSOS_URL     = `${BASE}/curso`
const TURNOS_URL     = `${BASE}/turno`
// const REPORT_URL   = `${Config.BASE_URL}:${Config.port}/reporte`
const REPORT_URL     = `http://moswara.com:49000/reporte`

@Injectable()
export class AsistenciaService {

  constructor(
    private http: HttpClient
  ) {}

  getCursosPorTurno (idTurno) {
    return this.http.get(`${CURSOS_URL}/mostrar_turno/${idTurno}`, {withCredentials: true})
  }

  getCursos () {
    return this.http.get(`${CURSOS_URL}`, {withCredentials: true})
  }

  getTurnos () {
    return this.http.get(`${TURNOS_URL}`, {withCredentials: true})
  }

  getAsistencias(idTurno, idGrado, idGrupo, idParalelo, ini, fin) : Observable<Object> {
    return this.http.get(`${ASISTENCIA_URL}?idTurno=${idTurno}&idGrado=${idGrado}&idGrupo=${idGrupo}&idParalelo=${idParalelo}&ini=${ini}&fin=${fin}`, { withCredentials: true })
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
