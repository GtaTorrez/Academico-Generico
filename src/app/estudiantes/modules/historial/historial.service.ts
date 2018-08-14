// Libraries
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { catchError, map, tap }                       from 'rxjs/operators'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { of }         from 'rxjs/observable/of'
import 'rxjs/add/observable/throw'

// Servicios
import { ConfigService as Config } from '../../services/config.service';

@Injectable()
export class HistorialService {

  constructor(
    private http: HttpClient
  ) {}

  obtenerhistorialEstudiante () : Observable<Object> {
    return this.http.get(Config.AUTHORIZATION.obtenerhistorialEstudianteURL, {withCredentials : true})
  }
}
