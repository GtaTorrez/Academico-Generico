export class Grado{
    id:number;
    nombre:string;
}

export class Grupo{
    id:number;
    nombre:string;
}

export class Periodo{
    id:number;
    hora_ini:string;
    hora_fin:string;
}
export class Turno{
    id:number;
    nombre:string;
}
export class Paralelo{
    id:number;
    nombre:string;
}

export class Curso{
    id:number;
    idParalelo:Paralelo;
    idTurno:Turno;
    idGrado:Grado;
    idGrupo:Grupo;
}