import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Socket } from 'ng-socket-io';
import 'rxjs/add/operator/map';


@Injectable()
export class AsistenciaService {

  base="http://192.241.152.146:1337/persona/21"
  constructor(
    private http:HttpClient
  ) { }
  getPersona():Observable<any>{
    return this.http.get(this.base);
  }

}
