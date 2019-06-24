import { Persona } from "./persona";
import { Asignatura } from "./Asignatura";
export class Profesor{
    public idPersona:Persona;
    public id:number;
}

export class ProfesorDicta{
	public idPersona:Persona;
    public id:number;
    public asignaturas:Asignatura; 
}