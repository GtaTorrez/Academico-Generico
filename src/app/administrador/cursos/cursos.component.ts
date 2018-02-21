import { Component, OnInit } from '@angular/core';
import {AdministradorService} from '../administrador.service';
import {Grado,Grupo,Paralelo,Periodo,Turno} from '../modelos/grupo';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  action="ver";
  grados:Grado[];
  grado:Grado;
  grupos:Grupo[];
  grupo:Grupo;
  turnos:Turno[];
  turno:Turno;
  paralelos:Paralelo[];
  paralelo:Paralelo;
  periodos:Periodo[];
  periodo:Periodo;
  consulta=false;
  swGrado=false;
  swGrupo=false;
  swTurno=false;
  swParalelo=false;
  swPeriodo=false;

  constructor(
    private serve:AdministradorService,
    private notificaciones:MatSnackBar
  ) { }

  ngOnInit() {
    this.getGrado();
    this.getGrupo();
    this.getParalelo();
    this.getPeriodo();
    this.getTurno();
  }
  abrirNotificacion(mensaje,accion){
    this.notificaciones.open(mensaje,accion,{
      duration:2000
    })
  }
  addGrado(){
    this.swGrado=true;
    this.grado=new Grado();
  }
  closeGrado(){
    this.swGrado=false;
  }
  addGrupo(){
    this.swGrupo=true;
    this.grupo=new Grupo();
  }
  closeGrupo(){
    this.swGrupo=false;
  }
  addTurno(){
    this.swTurno=true;
    this.turno=new Turno();
  }
  closeTurno(){
    this.swTurno=false;
  }
  addParalelo(){
    this.swParalelo=true;
    this.paralelo=new Paralelo();
  }
  closeParalelo(){
    this.swParalelo=false;
  }
  addPeriodo(){
    this.swPeriodo=true;
    this.periodo=new Periodo();
  }
  closePeriodo(){
    this.swPeriodo=false;
  }
  postGrado(){
    this.grado.id=0;
    this.serve.postGrado(this.grado).subscribe(data=>{
      this.grados.push(data)
      this.abrirNotificacion("Realizado correctamente","Ok");
      this.swGrado=false;
    },err=>{
      console.log("ERRROR")
      console.log(err);
    })
  }
  putGrado(){
    this.serve.updateGrado(this.grado).subscribe(data=>{
      this.abrirNotificacion("Realizado correctamente","Ok");
    },err=>{
      console.log("ERRROR")
      console.log(err);
    })
  }
  getGrado(){
    this.serve.getGrado().subscribe(data=>{
      this.grados=data;
      this.abrirNotificacion("Realizado correctamente","Ok");
    },err=>{
      console.log("ERRROR")
      console.log(err);
    })
  }
  deleteGrado(id){
    this.serve.deleteGradoId(id).subscribe(data=>{
      this.abrirNotificacion("Realizado correctamente","Ok");
      this.getGrado();
    },err=>{
      console.log("ERRROR")
      console.log(err);
    })
  }
  postGrupo(){
    this.grupo.id=0;
    this.serve.postGrupo(this.grupo).subscribe(data=>{
      this.grupos.push(data);
      this.swGrupo=false;
      this.abrirNotificacion("Realizado correctamente","Ok");
    },err=>{
      console.log("ERRROR")
      console.log(err);
    })
  }
  putGrupo(){
    this.serve.updateGrupo(this.grupo).subscribe(data=>{
      this.abrirNotificacion("Realizado correctamente","Ok");
    },err=>{
      console.log("ERRROR")
      console.log(err);
    })
  }
  getGrupo(){
    this.serve.getGrupo().subscribe(data=>{
      this.grupos=data;
      this.abrirNotificacion("Realizado correctamente","Ok");
    },err=>{
      console.log("ERRROR")
      console.log(err);
    })
  }
  deleteGrupo(id){
    this.serve.deleteGrupoId(id).subscribe(data=>{
      this.abrirNotificacion("Realizado correctamente","Ok");
      this.getGrupo();
    },err=>{
      console.log("ERRROR")
      console.log(err);
    })
  }

  postTurno(){
    this.turno.id=0;
    this.serve.postTurno(this.turno).subscribe(data=>{
      this.turnos.push(data);
      this.swTurno=false;
      this.abrirNotificacion("Realizado correctamente","Ok");
    },err=>{
      console.log("ERRROR")
      console.log(err);
    })
  }
  putTurno(){
    this.serve.updateTurno(this.turno).subscribe(data=>{
      this.abrirNotificacion("Realizado correctamente","Ok");
    },err=>{
      console.log("ERRROR")
      console.log(err);
    })
  }
  getTurno(){
    this.serve.getTurno().subscribe(data=>{
      this.turnos=data;
      this.abrirNotificacion("Realizado correctamente","Ok");
      
    },err=>{
      console.log("ERRROR")
      console.log(err);
    })
  }
  deleteTurno(id){
    this.serve.deleteTurnoId(id).subscribe(data=>{
      this.abrirNotificacion("Realizado correctamente","Ok");
      this.getTurno()
    },err=>{
      console.log("ERRROR")
      console.log(err);
    })
  }
//Paralelo
postParalelo(){
  this.paralelo.id=0;
  this.serve.postParalelo(this.paralelo).subscribe(data=>{
    this.paralelos.push(data);
    this.swParalelo=false;
    this.abrirNotificacion("Realizado correctamente","Ok");
  },err=>{
    console.log("ERRROR")
    console.log(err);
  })
}
putParalelo(){
  this.serve.updateParalelo(this.paralelo).subscribe(data=>{
    this.abrirNotificacion("Realizado correctamente","Ok");
  },err=>{
    console.log("ERRROR")
    console.log(err);
  })
}
getParalelo(){
  this.serve.getParalelo().subscribe(data=>{
    this.paralelos=data;
    this.abrirNotificacion("Realizado correctamente","Ok");
  },err=>{
    console.log("ERRROR")
    console.log(err);
  })
}
deleteParalelo(id){
  this.serve.deleteParaleloId(id).subscribe(data=>{
    this.abrirNotificacion("Realizado correctamente","Ok");
    this.getParalelo()
  },err=>{
    console.log("ERRROR")
    console.log(err);
  })
}
//periodos
postPeriodo(){
  this.periodo.id=0;
  this.serve.postPeriodo(this.periodo).subscribe(data=>{
    this.periodos.push(data);
    this.swPeriodo=false;
    this.abrirNotificacion("Realizado correctamente","Ok");
  },err=>{
    console.log("ERRROR")
    console.log(err);
  })
}
putPeriodo(){
  this.serve.updatePeriodo(this.periodo).subscribe(data=>{
    this.abrirNotificacion("Realizado correctamente","Ok");
  },err=>{
    console.log("ERRROR")
    console.log(err);
  })
}
getPeriodo(){
  this.serve.getPeriodo().subscribe(data=>{
    this.periodos=data;
    this.abrirNotificacion("Realizado correctamente","Ok");
  },err=>{
    console.log("ERRROR")
    console.log(err);
  })
}
deletePeriodo(id){
  this.serve.deletePeriodoId(id).subscribe(data=>{
    this.abrirNotificacion("Realizado correctamente","Ok");
    this.getPeriodo()
  },err=>{
    console.log("ERRROR")
    console.log(err);
  })
}


}
