import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {Global} from '../config/global';
@Injectable()
export class AlumnoService {
  baseUrl=Global.BASE_URL+":"+Global.port;
  headers=new HttpHeaders().set('Content-Type','application/json');
  constructor(private http:HttpClient) { }

  getAsistenciaHistorial():Observable<any>{
    return this.http.get(this.baseUrl+"/asistencia/historial",{withCredentials:true});
  }
}
