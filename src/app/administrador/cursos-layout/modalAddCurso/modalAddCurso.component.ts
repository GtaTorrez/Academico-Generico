import {Component,Inject,OnInit} from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {AdministradorService} from '../../administrador.service';
import { Turno, Grado,Grupo,Curso,Paralelo} from '../../modelos/grupo';

@Component({
    selector: 'form-curso',
    templateUrl: './form-curso.component.html',
    styleUrls:['./form-curso.component.css']
  })
  export class ModalAddCurso implements OnInit {
    turnos:Turno;
    grados:Grado;
    grupos:Grupo;
    paralelos:Paralelo;

    idParalelo:number;
    idTurno:number;
    idGrado:number;
    idGrupo:number;


    constructor(
        public dialogRef: MatDialogRef<ModalAddCurso>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private serve:AdministradorService
    ) {
        this.idTurno=data.idTurno;
        this.turnos=data.turnos;
        this.paralelos=data.paralelos;
        this.grupos=data.grupos;
        this.grados=data.grados;

    }
    onSubmit(){
        // console.log(this.idTurno+" "+this.idGrado+" "+this.idGrupo+" "+this.idParalelo)
        let datos={idTurno:this.idTurno,idGrado:this.idGrado,idGrupo:this.idGrupo,idParalelo:this.idParalelo}
        this.serve.postCurso(datos).subscribe(data=>{
            if(data.id){
                // console.log(data);
                this.dialogRef.close("post")

            }
        })
    }
    ngOnInit(){

    }
    close(){
        this.dialogRef.close();
    }

}
