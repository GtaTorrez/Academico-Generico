// Libraries
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'

// Servicios
import { ConfigService } from '../../services/config.service';

@Injectable()
export class HistorialService {

  constructor(
    private http: HttpClient
  ) {}

  obtenerhistorialEstudiante () : Observable<Object> {
    return this.http.get(ConfigService.AUTHORIZATION.obtenerhistorialEstudianteURL, {withCredentials : true})
  }

  obtenerhistorialDocente () : Observable<Object> {
    return this.http.get(ConfigService.AUTHORIZATION.obtenerhistorialDocenteURL, {withCredentials : true})
  }

  obtenerhistorialAdministrativo () : Observable<Object> {
    return this.http.get(ConfigService.AUTHORIZATION.obtenerhistorialAdministrativoURL, {withCredentials : true})
  }
}
