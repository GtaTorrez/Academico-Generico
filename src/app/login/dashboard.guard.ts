import { Injectable }          from '@angular/core';
import { Router, CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild
} from '@angular/router';

import { DataService } from './data.service';

@Injectable()
export class DashboardGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router) {}

  canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean {
    const SESSION = DataService.getSession()
    if(SESSION) {
      const ROL = SESSION.usuario.rol
      const URL = state.url
      if (ROL === 'admin' && !URL.startsWith('/administrador')) {
        if (URL === '/user/dashboard/account') {
          return true;
        }
        this.router.navigate(['/login']);
        return false;
      }
      if (ROL === 'tutor' && URL === '/user/dashboard/historial') {
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }
}
