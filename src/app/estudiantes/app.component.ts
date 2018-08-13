// Modules
import { Component, OnInit } from '@angular/core'
// Services
import { LoadingBarService } from '@ngx-loading-bar/core'
import { AuthService }       from './services/auth.service'

@Component({
  selector    : 'app-root',
  templateUrl : './app.component.html',
  styleUrls   : ['./app.component.scss']
})
export class AppComponent {
  constructor (
    public authService : AuthService,
    public loader      : LoadingBarService
  ) {}

  ngOnInit () {
    this.authService.restaurarSesion()
  }
}
