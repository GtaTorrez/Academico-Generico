// Libraries
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router'
import { Injectable } from '@angular/core'
// Services
import { AuthService } from './auth.service'

@Injectable()
export class GuardService implements CanActivate, CanActivateChild {

  constructor(
    private authService : AuthService,
    private router      : Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.authService.isLogged) {
      this.router.navigate([this.authService.redirectUrl])
      return false
    }
    for (let i in this.authService.routes) {
      if (state.url.startsWith(this.authService.routes[i])) {
        return true
      }
    }
    this.router.navigate([this.authService.redirectUrl])
    return false
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state)
  }
}
