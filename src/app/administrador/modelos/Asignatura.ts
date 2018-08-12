import { Persona } from "./persona";

export class Asignatura{
     id:number;
     sigla:string;
     nombre:string;
     docente:string;
}

export class AsignaturaProfesor{
    idMateria:number;
    sigla:string;
    nombre:string;
    profesores:any[];
    profesor:any;

}