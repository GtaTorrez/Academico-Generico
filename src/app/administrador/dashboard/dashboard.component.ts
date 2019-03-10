import { Component, OnInit } from '@angular/core'
import { Router }            from '@angular/router'
import {MediaObserver}     from '@angular/flex-layout'

@Component({
  selector    : 'app-dashboard',
  templateUrl : './dashboard.component.html',
  styleUrls   : ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  usuario = { nombre: 'John Smith Smith' }
  dashboardMenu = []
  constructor(
    public media  : MediaObserver,
    public router : Router
  ) {}

  ngOnInit() {}

  logout() {}
}
