// libreries
import { Component, OnInit } from '@angular/core';
// Services
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector    : 'dashboard-modA',
  templateUrl : './modA.component.html',
  styleUrls   : ['./modA.component.scss']
})
export class ModAComponent implements OnInit {

  constructor (
    private authService: AuthService
  ) {}

  ngOnInit () {}

}
