import { Injectable }         from '@angular/core';
import { Router,CanActivate } from '@angular/router';

import { LoginService } from './login.service';
import { DataService }  from './data.service';

@Injectable()
export class EstudianteGuard implements CanActivate {

  constructor(
    private router:Router,
    private login:LoginService
  ) {}

  canActivate () : boolean {
    if(DataService.getSession().usuario.rol === 'alumno'){
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
