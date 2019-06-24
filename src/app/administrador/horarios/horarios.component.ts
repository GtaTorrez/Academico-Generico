import { Component, OnInit } from '@angular/core';
import { Asignatura, AsignaturaProfesor } from '../modelos/Asignatura';
import { AdministradorService } from '../administrador.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css']
})
export class HorariosComponent implements OnInit {

  materias:AsignaturaProfesor[];
  campoHorario:Asignatura;
  consulta:boolean=false;
  dias:any[]=[];
  options: any = {
    copy: true
  }
  horario:any={
    id:1,
    idTurno:1,
    idParalelo:1,
    idGrado:1,
    idGrupo:1,
    periodos:[
      {idperiodo:"1",HoraIni:"08:00" ,HoraFin:"8:30",lunes:{idMateria:"",nombreMateria:"matematicas",docente:{"id":1,"paterno":"To","materno":"Ar","nombre":"Ju"},},martes:{idMateria:"",nombreMateria:"Fisica",docente:{"id":1,"paterno":"To","materno":"Ar","nombre":"Ju"},},miercoles:{idMateria:"",nombreMateria:"matematicas",docente:{"id":1,"paterno":"To","materno":"Ar","nombre":"Ju"},},jueves:{idMateria:"",nombreMateria:"Fisica",docente:{"id":1,"paterno":"To","materno":"Ar","nombre":"Ju"},},viernes:{idMateria:"",nombreMateria:"literatura",docente:{"id":1,"paterno":"To","materno":"Ar","nombre":"Ju"},},sabado:{idMateria:"",nombreMateria:"Filosofia",docente:{"id":1,"paterno":"To","materno":"Ar","nombre":"Ju"},}},
      {idperiodo:"2",HoraIni:"08:30" ,HoraFin:"9:00",lunes:{idMateria:"",nombreMateria:"matematicas",docente:{"id":1,"paterno":"To","materno":"Ar","nombre":"Ju"},},martes:{idMateria:"",nombreMateria:"Fisica",docente:{"id":1,"paterno":"To","materno":"Ar","nombre":"Ju"},},miercoles:{idMateria:"",nombreMateria:"matematicas",docente:{"id":1,"paterno":"To","materno":"Ar","nombre":"Ju"},},jueves:{idMateria:"",nombreMateria:"Fisica",docente:{"id":1,"paterno":"To","materno":"Ar","nombre":"Ju"},},viernes:{idMateria:"",nombreMateria:"literatura",docente:{"id":1,"paterno":"To","materno":"Ar","nombre":"Ju"},},sabado:{idMateria:"",nombreMateria:"Filosofia",docente:{"id":1,"paterno":"To","materno":"Ar","nombre":"Ju"},}},
      {idperiodo:"3",HoraIni:"09:00" ,HoraFin:"9:30",lunes:{idMateria:"",nombreMateria:"Cs. Naturales",docente:{"id":1,"paterno":"To","materno":"Ar","nombre":"Ju"},},martes:{idMateria:"",nombreMateria:"Musica",docente:{"id":1,"paterno":"To","materno":"Ar","nombre":"Ju"},},miercoles:{idMateria:"",nombreMateria:"Cs. Naturales",docente:{"id":1,"paterno":"To","materno":"Ar","nombre":"Ju"},},jueves:{idMateria:"",nombreMateria:"Religion",docente:{"id":1,"paterno":"To","materno":"Ar","nombre":"Ju"},},viernes:{idMateria:"",nombreMateria:"Civica",docente:{"id":1,"paterno":"To","materno":"Ar","nombre":"Ju"},},sabado:{idMateria:"",nombreMateria:"",docente:{"id":1,"paterno":"To","materno":"Ar","nombre":"Ju"},}},
      {idperiodo:"4",HoraIni:"10:00" ,HoraFin:"10:30",lunes:{idMateria:"",nombreMateria:"Cs. Naturales",docente:{"id":1,"paterno":"To","materno":"Ar","nombre":"Ju"},},martes:{idMateria:"",nombreMateria:"Musica",docente:{"id":1,"paterno":"To","materno":"Ar","nombre":"Ju"},},miercoles:{idMateria:"",nombreMateria:"Cs. Naturales",docente:{"id":1,"paterno":"To","materno":"Ar","nombre":"Ju"},},jueves:{idMateria:"",nombreMateria:"Religion",docente:{"id":1,"paterno":"To","materno":"Ar","nombre":"Ju"},},viernes:{idMateria:"",nombreMateria:"Civica",docente:{"id":1,"paterno":"To","materno":"Ar","nombre":"Ju"},},sabado:{idMateria:"",nombreMateria:"",docente:{"id":1,"paterno":"To","materno":"Ar","nombre":"Ju"},}},
      {idperiodo:"6",HoraIni:"11:00" ,HoraFin:"11:30",lunes:{idMateria:"",nombreMateria:"Recreo",docente:""},martes:{idMateria:"",nombreMateria:"recreo",docente:""},miercoles:{idMateria:"",nombreMateria:"recreo",docente:""},jueves:{idMateria:"",nombreMateria:"recreo",docente:""},viernes:{idMateria:"",nombreMateria:"recreo",docente:""},sabado:{idMateria:"",nombreMateria:"",docente:""}},
      {idperiodo:"5",HoraIni:"10:30" ,HoraFin:"11:00",lunes:{idMateria:"",nombreMateria:"Edu. Fisica",docente:{"id":1,"paterno":"To","materno":"Ar","nombre":"Ju"},},martes:{idMateria:"",nombreMateria:"Quimica",docente:{"id":1,"paterno":"To","materno":"Ar","nombre":"Ju"},},miercoles:{idMateria:"",nombreMateria:"computacion",docente:{"id":1,"paterno":"To","materno":"Ar","nombre":"Ju"},},jueves:{idMateria:"",nombreMateria:"Quimica",docente:{"id":1,"paterno":"To","materno":"Ar","nombre":"Ju"},},viernes:{idMateria:"",nombreMateria:"Psicologia",docente:{"id":1,"paterno":"To","materno":"Ar","nombre":"Ju"},},sabado:{idMateria:"",nombreMateria:"",docente:{"id":1,"paterno":"To","materno":"Ar","nombre":"Ju"},}},
      {idperiodo:"7",HoraIni:"11:30" ,HoraFin:"12:00",lunes:{idMateria:"",nombreMateria:"Edu. Fisica",docente:{"id":1,"paterno":"To","materno":"Ar","nombre":"Ju"},},martes:{idMateria:"",nombreMateria:"Quimica",docente:{"id":1,"paterno":"To","materno":"Ar","nombre":"Ju"},},miercoles:{idMateria:"",nombreMateria:"Computacion",docente:{"id":1,"paterno":"To","materno":"Ar","nombre":"Ju"},},jueves:{idMateria:"",nombreMateria:"Quimica",docente:{"id":1,"paterno":"To","materno":"Ar","nombre":"Ju"},},viernes:{idMateria:"",nombreMateria:"Psicologia",docente:{"id":1,"paterno":"To","materno":"Ar","nombre":"Ju"},},sabado:{idMateria:"",nombreMateria:"",docente:{"id":1,"paterno":"To","materno":"Ar","nombre":"Ju"},}}
  
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
    // console.log("Empieza a arrastrar");
    // console.log(materia);
  }

  materiaDrag(materia){
    // console.log(materia);
    this.campoHorario=materia;
  }

  getMaterias(){
    this.consulta=true;
     // let data=this.serve.getMateria().subscribe(datos=>{
     //   this.materias=datos;
     //   this.consulta=false;
     // },(err)=>{
     //    // console.log("**********")
     //    // console.log(err)
     //    this.openSnackBar("Error de conexion con el servidor" ,"");
     // });
     this.materias=[
      {
      ​"idMateria"​: ​1​,
      ​"sigla"​: ​"Mat"​,
      ​"nombre"​: ​"Matematica",
      "profesores":[
        {"id":1,"paterno":"To","materno":"Ar","nombre":"Ju"},
        {"id":2,"paterno":"Az","materno":"As","nombre":"Ma"}
      ],
      "profesor":{}
      },
      {
      ​"idMateria"​: ​4​,
      ​"sigla"​: ​"Filo"​,
      ​"nombre"​: ​"Filosofia",
      "profesores":[
        {"id":1,"paterno":"To","materno":"Ar","nombre":"Ju"},
        {"id":2,"paterno":"Az","materno":"As","nombre":"Ma"}
      ],
      "profesor":{}
      },
      {
      ​"idMateria"​: ​3​,
      ​"sigla"​: ​"Edu-Fis"​,
      ​"nombre"​: ​"Educacion Fisica",
      "profesores":[
        {"id":1,"paterno":"To","materno":"Ar","nombre":"Ju"},
        {"id":2,"paterno":"Az","materno":"As","nombre":"Ma"}
      ],
      "profesor":{}
      },{
      ​"idMateria"​: 2​,
      ​"sigla"​: ​"Fis"​,
      ​"nombre"​: ​"Fisica",
      "profesores":[
        {"id":1,"paterno":"To","materno":"Ar","nombre":"Ju"},
        {"id":2,"paterno":"Az","materno":"As","nombre":"Ma"}
      ],
      "profesor":{}
      },
      {
      ​"idMateria"​: ​4​,
      ​"sigla"​: ​"QMC"​,
      ​"nombre"​: ​"Quimica",
      "profesores":[
        {"id":1,"paterno":"To","materno":"Ar","nombre":"Ju"},
        {"id":2,"paterno":"Az","materno":"As","nombre":"Ma"}
      ],
      "profesor":{}
      },
      {
      ​"idMateria"​: ​3​,
      ​"sigla"​: ​"CIV"​,
      ​"nombre"​: ​"Civica",
      "profesores":[
        {"id":1,"paterno":"To","materno":"Ar","nombre":"Ju"},
        {"id":2,"paterno":"Az","materno":"As","nombre":"Ma"}
      ],
      "profesor":{}
      },
      {
      ​"idMateria"​: ​1​,
      ​"sigla"​: ​"Cs. Sc"​,
      ​"nombre"​: ​"Sociales",
      "profesores":[
        {"id":1,"paterno":"To","materno":"Ar","nombre":"Ju"},
        {"id":2,"paterno":"Az","materno":"As","nombre":"Ma"}
      ],
      "profesor":{}
      },
      {
      ​"idMateria"​: ​4​,
      ​"sigla"​: ​"Geo"​,
      ​"nombre"​: ​"Geografia",
      "profesores":[
        {"id":1,"paterno":"To","materno":"Ar","nombre":"Ju"},
        {"id":2,"paterno":"Az","materno":"As","nombre":"Ma"}
      ],
      "profesor":{}
      },
      {
      ​"idMateria"​: ​3​,
      ​"sigla"​: ​"MUS"​,
      ​"nombre"​: ​"Musica",
      "profesores":[
        {"id":1,"paterno":"To","materno":"Ar","nombre":"Ju"},
        {"id":2,"paterno":"Az","materno":"As","nombre":"Ma"}
      ],
      "profesor":{}
      }
      ]
  }

}

