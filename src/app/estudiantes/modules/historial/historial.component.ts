// libreries
import { Component, OnInit } from '@angular/core';
// Services
import { DataService } from '../../../login/data.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector    : 'dashboard-historial',
  templateUrl : './historial.component.html',
  styleUrls   : ['./historial.component.scss']
})
export class HistorialComponent implements OnInit {

  constructor (
    private authService: AuthService
  ) {}

  ngOnInit () {}

}
