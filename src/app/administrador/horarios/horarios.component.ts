import { Component, OnInit } from '@angular/core';
import { Asignatura, CampoHorario } from '../modelos/Asignatura';
import { AdministradorService } from '../administrador.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css']
})
export class HorariosComponent implements OnInit {

  materias:any[];
  campoHorario:CampoHorario;
  consulta:boolean=false;
  dias:any[]=[];
  options: any = {
    copy: true
  }
  horario:any={
    id:1,
    periodos:[
      {idperiodo:"1",HoraIni:"08:00" ,HoraFin:"8:30",lunes:{idMateria:"",nombreMateria:"matematicas",docente:"Nombre"},martes:{idMateria:"",nombreMateria:"Fisica",docente:"Nombre"},miercoles:{idMateria:"",nombreMateria:"matematicas",docente:"Nombre"},jueves:{idMateria:"",nombreMateria:"Fisica",docente:"Nombre"},viernes:{idMateria:"",nombreMateria:"literatura",docente:"Nombre"},sabado:{idMateria:"",nombreMateria:"Filosofia",docente:"Nombre"}},
      {idperiodo:"2",HoraIni:"08:30" ,HoraFin:"9:00",lunes:{idMateria:"",nombreMateria:"matematicas",docente:"Nombre"},martes:{idMateria:"",nombreMateria:"Fisica",docente:"Nombre"},miercoles:{idMateria:"",nombreMateria:"matematicas",docente:"Nombre"},jueves:{idMateria:"",nombreMateria:"Fisica",docente:"Nombre"},viernes:{idMateria:"",nombreMateria:"literatura",docente:"Nombre"},sabado:{idMateria:"",nombreMateria:"Filosofia",docente:"Nombre"}},
      {idperiodo:"3",HoraIni:"09:00" ,HoraFin:"9:30",lunes:{idMateria:"",nombreMateria:"Cs. Naturales",docente:"Nombre"},martes:{idMateria:"",nombreMateria:"Musica",docente:"Nombre"},miercoles:{idMateria:"",nombreMateria:"Cs. Naturales",docente:"Nombre"},jueves:{idMateria:"",nombreMateria:"Religion",docente:"Nombre"},viernes:{idMateria:"",nombreMateria:"Civica",docente:"Nombre"},sabado:{idMateria:"",nombreMateria:"",docente:"Nombre"}},
      {idperiodo:"4",HoraIni:"10:00" ,HoraFin:"10:30",lunes:{idMateria:"",nombreMateria:"Cs. Naturales",docente:"Nombre"},martes:{idMateria:"",nombreMateria:"Musica",docente:"Nombre"},miercoles:{idMateria:"",nombreMateria:"Cs. Naturales",docente:"Nombre"},jueves:{idMateria:"",nombreMateria:"Religion",docente:"Nombre"},viernes:{idMateria:"",nombreMateria:"Civica",docente:"Nombre"},sabado:{idMateria:"",nombreMateria:"",docente:"Nombre"}},
      {idperiodo:"6",HoraIni:"11:00" ,HoraFin:"11:30",lunes:{idMateria:"",nombreMateria:"Recreo",docente:""},martes:{idMateria:"",nombreMateria:"recreo",docente:""},miercoles:{idMateria:"",nombreMateria:"recreo",docente:""},jueves:{idMateria:"",nombreMateria:"recreo",docente:""},viernes:{idMateria:"",nombreMateria:"recreo",docente:""},sabado:{idMateria:"",nombreMateria:"",docente:""}},
      {idperiodo:"5",HoraIni:"10:30" ,HoraFin:"11:00",lunes:{idMateria:"",nombreMateria:"Edu. Fisica",docente:"Nombre"},martes:{idMateria:"",nombreMateria:"Quimica",docente:"Nombre"},miercoles:{idMateria:"",nombreMateria:"computacion",docente:"Nombre"},jueves:{idMateria:"",nombreMateria:"Quimica",docente:"Nombre"},viernes:{idMateria:"",nombreMateria:"Psicologia",docente:"Nombre"},sabado:{idMateria:"",nombreMateria:"",docente:"Nombre"}},
      {idperiodo:"7",HoraIni:"11:30" ,HoraFin:"12:00",lunes:{idMateria:"",nombreMateria:"Edu. Fisica",docente:"Nombre"},martes:{idMateria:"",nombreMateria:"Quimica",docente:"Nombre"},miercoles:{idMateria:"",nombreMateria:"Computacion",docente:"Nombre"},jueves:{idMateria:"",nombreMateria:"Quimica",docente:"Nombre"},viernes:{idMateria:"",nombreMateria:"Psicologia",docente:"Nombre"},sabado:{idMateria:"",nombreMateria:"",docente:"Nombre"}}
  
    ]
  }
  constructor(
    private serve:AdministradorService,
    private snackBar:MatSnackBar,
    ) {
  }
  
  

  ngOnInit() {
    this.getMaterias();
    this.getDia();

  }

  openSnackBar(message: string,action:string) {
    this.snackBar.open(message,action,{
      duration:2000
    })
  }
  getDia(){
    this.serve.getDia().subscribe(data=>{
      this.dias=data;
    })
  }
  dragging(materia){
    console.log("Empieza a arrastrar");
    console.log(materia);
  }

  materiaDrag(materia){
    console.log(materia);
    this.campoHorario=materia;
  }

  getMaterias(){
    this.consulta=true;
     // let data=this.serve.getMateria().subscribe(datos=>{
     //   this.materias=datos;
     //   this.consulta=false;
     // },(err)=>{
     //    console.log("**********")
     //    console.log(err)
     //    this.openSnackBar("Error de conexion con el servidor" ,"");
     // });
     this.materias=[
      {
      ​"idMateria"​: ​1​,
      ​"sigla"​: ​"Mat"​,
      ​"nombre"​: ​"Matematica",
      "docente":""
      },
      {
      ​"idMateria"​: ​4​,
      ​"sigla"​: ​"Filo"​,
      ​"nombre"​: ​"Filosofia",
      "docente":""
      },
      {
      ​"idMateria"​: ​3​,
      ​"sigla"​: ​"Edu-Fis"​,
      ​"nombre"​: ​"Educacion Fisica",
      "docente":""
      },{
      ​"idMateria"​: 2​,
      ​"sigla"​: ​"Fis"​,
      ​"nombre"​: ​"Fisica",
      "docente":""
      },
      {
      ​"idMateria"​: ​4​,
      ​"sigla"​: ​"QMC"​,
      ​"nombre"​: ​"Quimica",
      "docente":""
      },
      {
      ​"idMateria"​: ​3​,
      ​"sigla"​: ​"CIV"​,
      ​"nombre"​: ​"Civica",
      "docente":""
      },
      {
      ​"idMateria"​: ​1​,
      ​"sigla"​: ​"Cs. Sc"​,
      ​"nombre"​: ​"Sociales",
      "docente":""
      },
      {
      ​"idMateria"​: ​4​,
      ​"sigla"​: ​"Geo"​,
      ​"nombre"​: ​"Geografia",
      "docente":""
      },
      {
      ​"idMateria"​: ​3​,
      ​"sigla"​: ​"MUS"​,
      ​"nombre"​: ​"Musica",
      "docente":""
      }
      ]
  }

}

