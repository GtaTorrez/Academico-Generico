export class Perfil{
    private nroMatricula:number;
    private paterno:string;
    private materno:string;
    private nombre:string;
    private curso:string;
    private turno:string;
    private img:string;
    private qr:string;
    constructor(
         nroMatricula:number,
         paterno:string,
         materno:string,
         nombre:string,
         curso:string,
         turno:string,
         img:string,
         qr:string
        )
    {
        this.nroMatricula=nroMatricula;
        this.paterno=paterno;
        this.materno=materno;
        this.nombre=nombre;
        this.curso=curso;
        this.turno=turno;
        this.img=img;
        this.qr=qr;
        

    }
}