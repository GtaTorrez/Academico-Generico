export class Curso{
    id:number;
    nombre:string;
    grados:Grado[];
}

export class Paralelo{
    id:number;
    nombre:string;
}
export class Grupo{
    id:number;
    nombre:string;
    paralelos:Paralelo[];
}
export class Grado{
    id:number;
    nombre:string;
    grupos:Grupo[];
}



