import { Component, OnInit,Inject } from '@angular/core';
import { Persona } from '../modelos/persona';
import {AdministradorService} from '../administrador.service';
import {MatSnackBar} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Curso,Paralelo,Grado,Grupo,Turno } from '../modelos/grupo';
import { Global} from "../../config/global";


@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css']
})
export class EstudiantesComponent implements OnInit {

  consulta:boolean=false;
  estudiante:Persona;
  estudiantes:Persona[]=[];
  tutores:Persona[];
  busca='CI';
  buscaPor=['CI','Rude'];
  action='ver';
  parametro:number;
  tipo='estudiante';
  qr:string;

  turnos:Turno[];
  grados:Grado[];
  grupos:Grupo[];
  paralelos:Paralelo[];

  idParalelo:number;
  idTurno:number;
  idGrado:number;
  idGrupo:number;

  constructor(
    private serve:AdministradorService,
    private notificacion:MatSnackBar,
    private dialog: MatDialog,
    
  ) { 
    this.action='ver'
  }

  ngOnInit() {

    this.getTurnos();  
    this.getGrados();
    this.getGrupos();
    this.getParalelos(); 

  }
  AbrirNotificacion(message: string,action:string) {
    this.notificacion.open(message,action,{
      duration:2000
    })
  }

  adicionar(){
    
    this.action='nuevo';
    console.log(this.action)
    this.estudiante=new Persona();
    this.estudiante.rol="alumno";
      
  }
  deletePersona(id){
    this.serve.deletePersona(id).subscribe(data=>{
      if(data){
        this.AbrirNotificacion("Exito","Aceptar")
      } 
    },err=>{
      this.AbrirNotificacion("Hubo un error","")
    })
  }
  getTutores(id){
    this.serve.getTutorEstudiate(id).subscribe(data=>{
      this.tutores=data;
    })
  }
  getParalelos(){
    this.serve.getParalelo().subscribe(data=>{
      this.paralelos=data;
      this.idParalelo=data[0].id
    })
  }
  getGrupos(){
    this.serve.getGrupo().subscribe(data=>{
      this.grupos=data;
      this.idGrupo=data[0].id
    })
  } 
  getGrados(){
    this.serve.getGrado().subscribe(data=>{
      this.grados=data;
      this.idGrado=data[0].id
    })
  }
  getTurnos(){
    this.serve.getTurno().subscribe(data=>{
      this.turnos=data;
      this.idTurno=data[0].id
    })
  }
  mostrarEstudiantes(data){
    this.estudiantes=data;
  }
  buscarEstudiante(){
    this.consulta=true;
    this.action="ver"
    if(this.busca==="CI"){
      this.serve.getPersonaPorCi(this.parametro).subscribe((data:any[]) =>{
        console.log(data)
        if(data.length>0){
          if(data[0].rol==="alumno"){
            this.estudiante=data[0];
            if (this.estudiante) {
            this.qr=this.estudiante.idenficacion;                        
            }
            this.getTutores(this.estudiante.id);  
            this.AbrirNotificacion("Datos encontrados","Aceptar")        
          }else{
            this.AbrirNotificacion("No es un estudiante","")  
          }
        }else{
          this.AbrirNotificacion("No existen datos","")  
        }
                
        this.consulta=false;
      },err=>{
        this.AbrirNotificacion("Error con la consulta","")
      })
    }else{
      if(this.busca==="Rude"){
        this.serve.getPersonaPorIdentificacion(this.parametro).subscribe(data=>{
          console.log(data)
          if(data[0].rol==="alumno"){
            this.estudiante=data[0];
            if (this.estudiante) {
              this.qr=this.estudiante.idenficacion;                        
              }
            this.getTutores(this.estudiante.id);  
            this.AbrirNotificacion("Datos encontrados","Aceptar")          
          }else{
            this.AbrirNotificacion("No es un estudiante","")  
          }
          this.consulta=false;
        },err=>{
          this.AbrirNotificacion("Error con la consulta","")
        })
      }
    }
    
  }
  editar(){
    this.action='editar';
    console.log(this.action)
  }
  editarPadre(padre){
    let dialogRef = this.dialog.open(ModalP, {
      width: '300px',
      height:'470px',
      data: {action:'editar',padre}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("observable de adicionar")

      if(result){
        if(result.action!='cancel' && result.action==='editar' ){
          this.consulta=true;
          this.serve.updatePersona(result.padre).subscribe(res=>{
            console.log(res);
            this.AbrirNotificacion('Realizado Corretamente','Aceptar');
            this.getTutores(this.estudiante.id);

          },err=>{
            console.error(err);
            
          })
        }
      }
      
    });
  }
  cancelar(){
    this.action='ver';
  }
  verEstudiante(data){
    this.action="ver";
    console.log(data);
    this.estudiante=data;
    if(this.estudiante.img.indexOf(Global.BASE_URL)==-1){
      this.estudiante.img=Global.BASE_URL+":"+Global.port+"/"+this.estudiante.img;
    }

    if (this.estudiante) {
      this.qr=this.estudiante.idenficacion;
      this.getTutores(this.estudiante.id);                        
    }
  }
  guardar(){
    this.consulta=true;
    console.log(this.estudiante)
    if(this.estudiante.id){
      
      this.serve.updateProfesor(this.estudiante).subscribe(data=>{
        this.verEstudiante(data);
        this.consulta=false;
        this.AbrirNotificacion("Realizado Correctamente","");
      },err=>{
        this.AbrirNotificacion("Error al subir los datos","");
        console.error(err);
      })
    
    }else{
        this.estudiante.rol="alumno";
        this.serve.postProfesor(this.estudiante).subscribe(data=>{
          console.log(data);
          this.consulta=false;
          this.AbrirNotificacion("Realizado correctamente","");
          this.verEstudiante(data)
          this.estudiante.id=data.id;
        },error=>{
          this.AbrirNotificacion("Error al subir los datos","")
        })
      
    }
  }

  adicionarPadres(): void {
    
    let dialogRef = this.dialog.open(ModalP, {
      width: '300px',
      height:'470px',
      data: {action:'nueva' }
    });
    this.tutores=[];
    dialogRef.afterClosed().subscribe(result => {
      console.log("observable de adicionar")

      if(result){
        if(result.action!='cancel' && result.action==='nueva' ){
          this.consulta=true;
          console.log(result.padre);
          this.serve.postPersona(result.padre).subscribe(res=>{
            console.log(res);
            this.AbrirNotificacion('Realizado Corretamente','Aceptar');
            let data={"idAlumno":this.estudiante.id,"idTutor":res.id}
            this.serve.postTutor(data).subscribe(res=>{
              this.AbrirNotificacion('Realizado Corretamente','Aceptar');
              this.getTutores(this.estudiante.id)
            },err=>{
              this.AbrirNotificacion('Error, no realizado','');
            })
            this.getTutores(this.estudiante.id);
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
  templateUrl: './padres.html',
  styleUrls:['./estudiantes.component.css']
})
export class ModalP {
  
  padre:Persona;

  constructor(
    public dialogRef: MatDialogRef<ModalP>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      if(data.action==='editar'){
        this.padre=data.padre
        console.log(data)
      }else{
        if(data.action==='nueva'){
          this.padre=new Persona();
          this.padre.rol="tutor"
        }
      }
     }
  
  
  onNoClick(): void {
    this.dialogRef.close({action:'cancel'});
  }
  submit():void{

    console.log("enviar() "+this.padre);
    this.dialogRef.close({action:this.data.action,padre:this.padre})
  }
  

}