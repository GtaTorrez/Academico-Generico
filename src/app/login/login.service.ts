import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Global} from '../config/global';

@Injectable()
export class LoginService {

  url=Global.BASE_URL+":"+Global.port;
  headersPost=new HttpHeaders().set('Content-Type','application/json');
  
  rol:string;
  constructor(private http:HttpClient) {
 
   }

  postUser(data):Observable<any>{
    return this.http.post(this.url+"/auth/login",JSON.stringify(data),{headers:this.headersPost,withCredentials:true});
  }
  getRol(){
    return this.rol;
  }

  getData():Observable<any>{
    return this.http.get(this.url+'/autentificacion',{withCredentials:true});
  }



}
