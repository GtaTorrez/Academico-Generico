import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class LoadersService {

  estado=false;
  private _bhEstado=new BehaviorSubject<any>(this.estado);
  observableEstado=this._bhEstado.asObservable();

  constructor() { }
  cambiarEstado(sw:boolean){
    this.estado=sw;
    this._bhEstado.next(this.estado);
  }


}
