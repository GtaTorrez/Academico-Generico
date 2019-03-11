import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Socket } from 'ng-socket-io';



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
        // console.log(data)
        return data;
      });
  }
  
  close(){
    this.socket.disconnect();
  }

}
