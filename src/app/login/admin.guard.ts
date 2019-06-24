import { Injectable }          from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { DataService } from './data.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate () : boolean {
    const SESSION = DataService.getSession()
    if(SESSION && SESSION.usuario.rol === 'admin') {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
