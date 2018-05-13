import { Profesor } from "./profesor";

export class Asignatura{
     id:number=0;
     sigla:string;
     nombre:string;
     docente:string;
}

export class CampoHorario{
    idMateria:number;
    sigla:string;
    nombre:string;
    profesor:Profesor;
    docente:string;
}