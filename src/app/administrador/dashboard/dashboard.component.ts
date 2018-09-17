import { Component, OnInit } from '@angular/core'
import { Router }            from '@angular/router'
import {ObservableMedia}     from '@angular/flex-layout'

@Component({
  selector    : 'app-dashboard',
  templateUrl : './dashboard.component.html',
  styleUrls   : ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  usuario = { nombre: 'John Smith Smith' }
  dashboardMenu = []
  constructor(
    public media  : ObservableMedia,
    public router : Router
  ) {}

  ngOnInit() {}

  logout() {}
}
