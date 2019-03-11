import { Component, OnInit,Input } from '@angular/core';
import { Asignatura} from '../../modelos/Asignatura';

@Component({
  selector: 'app-show-horario',
  templateUrl: './show-horario.component.html',
  styleUrls: ['./show-horario.component.css']
})
export class ShowHorarioComponent implements OnInit {

  @Input() horario:any;
  @Input() dias:Asignatura;
  @Input() curso:string;
  constructor(
  	) 
  { 
  }

  ngOnInit() {
  }
  droping(){
  	// console.log("dropping")
  }
  onMateriaDrop(e:any,i:number,clave:string){
    // console.log(i+" **************  "+clave)
    // console.log(e.dragData.nombre);

    switch (clave) {
      case "lunes":
        // console.log(this.horario.periodos[i].lunes);
        this.horario.periodos[i].lunes.idMateria=e.dragData.idMateria;
        this.horario.periodos[i].lunes.nombreMateria=e.dragData.nombre;
        this.horario.periodos[i].lunes.docente=e.dragData.profesor;
        break;

      case "martes":
        this.horario.periodos[i].martes.idMateria=e.dragData.idMateria;
        this.horario.periodos[i].martes.nombreMateria=e.dragData.nombre;
        this.horario.periodos[i].martes.docente=e.dragData.profesor;
        break;

      case "miercoles":
        this.horario.periodos[i].miercoles.idMateria=e.dragData.idMateria;
        this.horario.periodos[i].miercoles.nombreMateria=e.dragData.nombre;
        this.horario.periodos[i].miercoles.docente=e.dragData.profesor;
        break;

      case "jueves":
        this.horario.periodos[i].jueves.idMateria=e.dragData.idMateria;
        this.horario.periodos[i].jueves.nombreMateria=e.dragData.nombre;
        this.horario.periodos[i].jueves.docente=e.dragData.profesor;
        break;

      case "viernes":
        this.horario.periodos[i].viernes.idMateria=e.dragData.idMateria;
        this.horario.periodos[i].viernes.nombreMateria=e.dragData.nombre;
        this.horario.periodos[i].viernes.docente=e.dragData.profesor;
        break;

      case "sabado":
        this.horario.periodos[i].sabado.idMateria=e.dragData.idMateria;
        this.horario.periodos[i].sabado.nombreMateria=e.dragData.nombre;
        this.horario.periodos[i].sabado.docente=e.dragData.profesor;
        break;
      
      default:
        // code...
        break;
    }
    // console.log("9999999999s");
    // console.log(e.dragData);

  }
  private onDrop(args) {
    let [e, el] = args;
    // do something 
    // console.log(e);
    // console.log(el);
  }

}
