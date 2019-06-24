// Modules
import { Component, OnInit } from '@angular/core'
// Services
import { LoadingBarService } from '@ngx-loading-bar/core'

@Component({
  selector    : 'app-root',
  templateUrl : './app.component.html',
  styleUrls   : ['./app.component.scss']
})
export class AppComponent {
  constructor (
    public loader : LoadingBarService
  ) {}

  ngOnInit () {}
}
