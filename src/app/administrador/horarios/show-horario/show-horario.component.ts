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
  	console.log("dropping")
  }
  onMateriaDrop(e:any,i:number){
    console.log(e.dragData);
    console.log(i)
  }
  private onDrop(args) {
    let [e, el] = args;
    // do something 
    console.log(e);
    console.log(el);
  }

}
