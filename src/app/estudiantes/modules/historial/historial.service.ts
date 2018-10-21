// Libraries
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'

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

  obtenerhistorialDocente () : Observable<Object> {
    return this.http.get(Config.AUTHORIZATION.obtenerhistorialDocenteURL, {withCredentials : true})
  }

  obtenerhistorialAdministrativo () : Observable<Object> {
    return this.http.get(Config.AUTHORIZATION.obtenerhistorialAdministrativoURL, {withCredentials : true})
  }
}
