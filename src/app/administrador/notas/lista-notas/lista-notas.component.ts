import { Component, OnInit,Input } from '@angular/core';
import {Sort} from '@angular/material';

@Component({
  selector: 'app-lista-notas',
  templateUrl: './lista-notas.component.html',
  styleUrls: ['./lista-notas.component.css']
})
export class ListaNotasComponent implements OnInit {

  @Input() datos:any[];
  sortedData;
  constructor() { 

  }
//idPersona:1,nombre:"Ana", paterno:"paucara",materno:"torrez",notas:[64,45,87,98]
  ngOnInit() {
    this.sortedData = this.datos.slice();
  }
  sortData(sort: Sort) {
    const data = this.datos.slice();
    if (!sort.active || sort.direction == '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      let isAsc = sort.direction == 'asc';
      //
      switch (sort.active) {
        case 'paterno': return compare(a.paterno, b.paterno, isAsc);
        case 'materno': return compare(+a.materno, +b.materno, isAsc);
        case 'nombre': return compare(+a.nombre, +b.nombre, isAsc);
        case 'bimestre1': return compare(+a.notas[0], +b.notas[0], isAsc);
        case 'bimestre2': return compare(+a.notas[1], +b.notas[1], isAsc);
        case 'bimestre3': return compare(+a.notas[2], +b.notas[2], isAsc);
        case 'bimestre4': return compare(+a.notas[3], +b.notas[3], isAsc);
        default: return 0;
      }
    });
  }

} 
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}