import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Socket } from 'ng-socket-io';
import 'rxjs/add/operator/map';


@Injectable()
export class AsistenciaService {

  base="http://192.241.152.146:1337/persona/21"
  event:string='message';

  constructor(
    private http:HttpClient,
    private socket:Socket
  ) { }
  getPersonas():any{
    return this.socket
      .fromEvent<any>(this.event)
      .map( data => {
        console.log(data)
        return data;
      });
  }
  
  close(){
    this.socket.disconnect();
  }

}
