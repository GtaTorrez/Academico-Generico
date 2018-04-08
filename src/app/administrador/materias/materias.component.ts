import { Component,Inject, OnInit,DoCheck } from '@angular/core';
import {Asignatura} from '../modelos/Asignatura';
import {AdministradorService} from '../administrador.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { LoadersService } from '../../loader/loaders.service';

import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})
export class MateriasComponent implements OnInit {

  
  asignaturas:Asignatura[]=[]
  consulta:boolean=false;
  displayedColumns = ['sigla', 'materia', 'editar', 'borrar'];
  dataSource = this.asignaturas;

  constructor(
    private serve:AdministradorService,
    private loaderService:LoadersService,
    public dialog: MatDialog,
    private snackBar:MatSnackBar
  ) { 
    
    console.log(this.dataSource)
  }
  openSnackBar(message: string,action:string) {
    this.snackBar.open(message,action,{
      duration:2000
    })
  }

  ngOnInit() {
    this.getMaterias();
  }
  getMaterias(){
    this.consulta=true;
    this.loaderService.cambiarEstado(true);
     let data=this.serve.getMateria().subscribe(datos=>{
       this.asignaturas=datos;
       this.consulta=false;
       this.loaderService.cambiarEstado(false);
       this.dataSource=this.asignaturas
     },(err)=>{
        console.log("**********")
        console.log(err)
        this.openSnackBar("Error de conexion con el servidor" ,"");
        this.loaderService.cambiarEstado(false); 
     })
  }

  editar(materia){
    console.log(materia)
    
      let dialogRef = this.dialog.open(Modal, {
        width: '250px',
        data: {materia,action:'editar'}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        
        console.log("observable editar")
        if(result){
          if(result.action!='cancel' && result.action==='editar' ){
            this.consulta=true;
            this.serve.updateMateria(result.materia).subscribe(res=>{
              console.log(res);
              this.getMaterias();
              this.consulta=false;
              this.openSnackBar('Realizado Corretamente','Aceptar');
            },error=>{
              console.error(error);
            })
          }
        }
      });
  }
  eliminar(dato){
    this.consulta=true;
    this.serve.deleteMateria(dato.id).subscribe(res=>{
      console.log(res);
      this.getMaterias();
      this.openSnackBar('Realizado Corretamente','Aceptar');
    },err=>{
      console.error(err)
    })
  }

  adicionar(): void {
    let dialogRef = this.dialog.open(Modal, {
      width: '300px',
      height:'300px',
      data: {action:'nueva' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("observable de adicionar")

      if(result){
        if(result.action!='cancel' && result.action==='nueva' ){
          this.consulta=true;
          console.log(result.materia);
          this.serve.postMateria(result.materia).subscribe(res=>{
            console.log(res);
            this.getMaterias();
            this.openSnackBar('Realizado Corretamente','Aceptar');
          },err=>{
            console.error(err);
            
          })
        }
      }
      
    });
  }

}

@Component({
  selector: 'modal',
  templateUrl: './modal.html',
  styleUrls:['./materias.component.css']
})
export class Modal {
  
  materia:Asignatura;

  constructor(
    public dialogRef: MatDialogRef<Modal>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      if(data.action==='editar'){
        this.materia=data.materia
        console.log(data)
      }else{
        if(data.action==='nueva'){
          this.materia=new Asignatura();
        }
      }
     }
  
  
  onNoClick(): void {
    this.dialogRef.close({action:'cancel'});
  }
  submit():void{
    console.log("enviar() "+this.materia);
    this.dialogRef.close({action:this.data.action,materia:this.materia})
  }
}

export interface Element {
  sigla: string;
  nombre: string;
  editar: string;
  borrar: string;
}