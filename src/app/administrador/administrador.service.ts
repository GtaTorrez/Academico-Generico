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
  postPersonaImgs(data):Observable<any>{
    let heimg=new HttpHeaders().set('Content-Type', 'multipart/form-data');
    return this.http.post(this.baseUrl+"/persona/subir",data);
  }
  postPersonaImg(data,id):Observable<any>{
    return this.http.post(this.baseUrl+"/persona/avatar/"+id,data);
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
  
  // tutores
  getTutorEstudiate(id):Observable<any>{
    return this.http.get(this.baseUrl+"/alumno/tutores/"+id)
    
  }
  postTutor(data):Observable<any>{
    return this.http.post(this.baseUrl+"/alumno/adicionar_tutor",data,{headers:this.headers})
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
  getProfesorDicta(id):Observable<any>{
    return this.http.get(this.baseUrl+`/profesor/dicta_asignatura/${id}`);
  }
  postProfesorAsignatura(data):Observable<any>{
    return this.http.post(this.baseUrl+'/profesor/adicionar_asignatura',data,{headers:this.headers});
  }
  deleteProfesorAsignatura(data):Observable<any>{
    return this.http.post(this.baseUrl+'/profesor/quitar_asignatura',data,{headers:this.headers});
  }


  //Materias de profesor
  getMateriasProfesor(id):Observable<any>{
    return this.http.get(this.baseUrl+`/profesor/dicta_asignatura/${id}`);
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
  updateGrupo(body):Observable<any>{
    return this.http.put(this.baseUrl+`/grupo/${body.id}`,body,{headers:this.headers});
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
  updateGrado(body):Observable<any>{
    return this.http.put(this.baseUrl+`/grado/${body.id}`,body,{headers:this.headers});
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
  updateParalelo(body):Observable<any>{
    return this.http.put(this.baseUrl+`/paralelo/${body.id}`,body,{headers:this.headers});
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
  updatePeriodo(body):Observable<any>{
    return this.http.put(this.baseUrl+`/periodo/${body.id}`,body,{headers:this.headers});
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
  updateDia(body):Observable<any>{
    return this.http.put(this.baseUrl+`/dia/${body.id}`,body,{headers:this.headers});
  }
  //turno
  getTurno():Observable<any>{
    return this.http.get(this.baseUrl+"/turno");
  }
  getTurnoId(id):Observable<any>{
    return this.http.get(this.baseUrl+"/turno/"+id);
  }
  postTurno(body):Observable<any>{
    return this.http.post(this.baseUrl+"/turno",JSON.stringify(body),{headers:this.headers});
  }
  deleteTurnoId(id):Observable<any>{
    return this.http.delete(this.baseUrl+"/turno/"+id);
  }
  updateTurno(body):Observable<any>{
    return this.http.put(this.baseUrl+`/turno/${body.id}`,body,{headers:this.headers});
  }
  //cursos
  getCurso():Observable<any>{
    return this.http.get(this.baseUrl+"/curso");
  }
  getCursoId(id):Observable<any>{
    return this.http.get(this.baseUrl+"/curso/"+id);
  }
  postCurso(body):Observable<any>{
    return this.http.post(this.baseUrl+"/curso",JSON.stringify(body),{headers:this.headers});
  }
  deleteCursoId(id):Observable<any>{
    return this.http.delete(this.baseUrl+"/curso/"+id);
  }
  updateCurso(body):Observable<any>{
    return this.http.put(this.baseUrl+`/curso/${body.id}`,body,{headers:this.headers});
  }
  //alternativa cursos

  getCursoTurno(idTurno):Observable<any>{
    return this.http.get(this.baseUrl+`/curso/mostrar_turno/${idTurno}`);
  }

  //usuarios
  getUsuario():Observable<any>{
    return this.http.get(this.baseUrl+"/usuario");
  }
  
  deleteUsuarioId(id):Observable<any>{
    return this.http.delete(this.baseUrl+"/usuario/"+id);
  }


//alumno asistencia 

  getAsistenciaAlumno(id){
    return this.http.get(this.baseUrl+`/asistencia/historial_alumno/${id}`);
  }

//pensiones
  getPensionesPadre(id){
    return this.http.get(this.baseUrl+`/pension/pension_por_tutor/${id}`);
    }
}
