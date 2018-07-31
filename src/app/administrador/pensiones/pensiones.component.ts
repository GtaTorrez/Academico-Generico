import { Component, OnInit } from '@angular/core';
import { AdministradorService } from '../administrador.service';

@Component({
  selector: 'app-pensiones',
  templateUrl: './pensiones.component.html',
  styleUrls: ['./pensiones.component.css']
})
export class PensionesComponent implements OnInit {

  

  data:any;
  estudianteSelect:Estudiante;  
  pensiones:Mes[];
  displayedColumns = ['nombre', 'ci', 'ver'];
  displayedColumn = ['mes', 'action'];
  dataSource:any[];
  cedulaIdentidad:number;
  constructor(
    private serve:AdministradorService
  ) { }

  ngOnInit() {
  }
  buscar(){
    this.serve.getPersonaPorCi(this.cedulaIdentidad).subscribe(data=>{
      let persona=data[0];
      console.log(persona)
      this.serve.getPensionesPadre(persona.id).subscribe((datos:any)=>{
        console.log(datos)
        this.data=datos;
        this.dataSource=this.data.estudiantes;
      })
    });
  }
  verPension(persona){
    console.log(persona);
    this.pensiones=persona.mensualidades;
    console.log(this.pensiones);
  }

}

export interface Mes{
  mes:string
  pago:boolean
}
export interface Estudiante{
  id:number;
  nombre:string;
  paterno:string;
  materno:string;
  cedula:number;
  pension:Mes[];

}