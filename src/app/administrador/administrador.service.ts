import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {Global} from '../config/global';
@Injectable()
export class AdministradorService {

  baseUrl=Global.BASE_URL+":"+Global.port;
  headers=new HttpHeaders().set('Content-Type','application/json');
  constructor(private http:HttpClient) { }

  //personas
  postPersonaImg(data):Observable<any>{
    let heimg=new HttpHeaders().set('Content-Type', 'multipart/form-data');
    return this.http.post(this.baseUrl+"/persona/subir",data);
  }
  postPersona(data):Observable<any>{
    return this.http.post(this.baseUrl+"/api/persona",JSON.stringify(data),{headers:this.headers});
  }
  deletePersona(id):Observable<any>{
    return this.http.delete(this.baseUrl+`/persona/${id}`);
  }
  updatePersona(body):Observable<any>{
    return this.http.put(this.baseUrl+`/persona/${body.id}`,body,{headers:this.headers});
  }
  getPersonaCi(id):Observable<any>{
    return this.http.delete(this.baseUrl+`/persona/${id}`);
  }
  getPersonaPorCi(ci:number):Observable<any>{
    return this.http.get(this.baseUrl+"/persona?cedula="+ci);
  }
  getPersonaPorIdentificacion(identificacion:number):Observable<any>{
    return this.http.get(this.baseUrl+"/persona?identificacion="+identificacion);
  }
  
  //materias
  getMateria():Observable<any>{
    return this.http.get(this.baseUrl+"/asignatura");
  }
  postMateria(body):Observable<any>{
    return this.http.post(this.baseUrl+"/asignatura",JSON.stringify(body),{headers:this.headers});
  }
  deleteMateria(id):Observable<any>{
    return this.http.delete(this.baseUrl+`/asignatura/${id}`);
  }
  updateMateria(body):Observable<any>{
    return this.http.put(this.baseUrl+`/asignatura/${body.id}`,body,{headers:this.headers});
  }
  //profesores
  getProfesores():Observable<any>{
    return this.http.get(this.baseUrl+"/profesor");
  }
  postProfesor(data):Observable<any>{
    return this.postPersona(data);
  }
  deleteProfesor(id):Observable<any>{
    return this.deletePersona(id);
  }
  updateProfesor(data):Observable<any>{
    return this.updatePersona(data);
  }
  //grupo 
  getGrupo():Observable<any>{
    return this.http.get(this.baseUrl+"/grupo");
  }
  getGrupoId(id):Observable<any>{
    return this.http.get(this.baseUrl+"/grupo/"+id);
  }
  postGrupo(body):Observable<any>{
    return this.http.post(this.baseUrl+"/grupo",JSON.stringify(body),{headers:this.headers});
  }
  deleteGrupoId(id):Observable<any>{
    return this.http.delete(this.baseUrl+"/grupo/"+id);
  }
  //grado
  getGrado():Observable<any>{
    return this.http.get(this.baseUrl+"/grado");
  }
  getGradoId(id):Observable<any>{
    return this.http.get(this.baseUrl+"/grado/"+id);
  }
  postGrado(body):Observable<any>{
    return this.http.post(this.baseUrl+"/grado",JSON.stringify(body),{headers:this.headers});
  }
  deleteGradoId(id):Observable<any>{
    return this.http.delete(this.baseUrl+"/grado/"+id);
  }
  //Paralelo
  getParalelo():Observable<any>{
    return this.http.get(this.baseUrl+"/paralelo");
  }
  getParaleloId(id):Observable<any>{
    return this.http.get(this.baseUrl+"/paralelo/"+id);
  }
  postParalelo(body):Observable<any>{
    return this.http.post(this.baseUrl+"/paralelo",JSON.stringify(body),{headers:this.headers});
  }
  deleteParaleloId(id):Observable<any>{
    return this.http.delete(this.baseUrl+"/paralelo/"+id);
  }
  //Periodo
  getPeriodo():Observable<any>{
    return this.http.get(this.baseUrl+"/periodo");
  }
  getPeriodoId(id):Observable<any>{
    return this.http.get(this.baseUrl+"/periodo/"+id);
  }
  postPeriodo(body):Observable<any>{
    return this.http.post(this.baseUrl+"/periodo",JSON.stringify(body),{headers:this.headers});
  }
  deletePeriodoId(id):Observable<any>{
    return this.http.delete(this.baseUrl+"/periodo/"+id);
  }
  //dia
  getDia():Observable<any>{
    return this.http.get(this.baseUrl+"/dia");
  }
  getDiaId(id):Observable<any>{
    return this.http.get(this.baseUrl+"/dia/"+id);
  }
  postDia(body):Observable<any>{
    return this.http.post(this.baseUrl+"/dia",JSON.stringify(body),{headers:this.headers});
  }
  deleteDiaId(id):Observable<any>{
    return this.http.delete(this.baseUrl+"/dia/"+id);
  }
  //usuarios
  getUsuario():Observable<any>{
    return this.http.get(this.baseUrl+"/usuario");
  }
  
  deleteUsuarioId(id):Observable<any>{
    return this.http.delete(this.baseUrl+"/usuario/"+id);
  }


}
