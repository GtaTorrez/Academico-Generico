// Libraries
import { Component, OnInit } from '@angular/core'
import { Router }            from '@angular/router'
// Services
import { AuthService } from '../services/auth.service'
import { DataService } from '../services/data.service'
import { DashboardService } from './dashboard.service'

@Component({
  selector    : 'app-dashboard',
  templateUrl : './dashboard.component.html',
  styleUrls   : ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  usuario       = { nombre: '' }
  dashboardMenu = []

  constructor (
    public dashboardService: DashboardService,
    public authService: AuthService
  ) {}

  addMenuItem (ROUTE) {
    for (let i in this.dashboardMenu) {
      if (this.dashboardMenu[i].path === ROUTE.path) { return }
    }
    this.dashboardMenu.push(ROUTE)
  }

  ngOnInit() {
    this.addMenuItem({ path: '/estudiantes/dashboard/usuarios', name: 'Usuarios' })
    this.addMenuItem({ path: '/estudiantes/dashboard/modA',     name: 'Módulo A' })

    this.dashboardService.obtenerCuenta().subscribe((result : any) => {
      this.usuario = result.usuario
    })

    // const SESSION = DataService.getSession()
    // if (!SESSION) { return }
    // this.usuario = SESSION.usuario
    // for(let i in SESSION.usuario.roles) {
    //   const rol = SESSION.usuario.roles[i]
    //   if (rol === 'superadmin') {
    //     this.addMenuItem({ path: '/estudiantes/dashboard/usuarios', name: 'Usuarios' })
    //     this.addMenuItem({ path: '/estudiantes/dashboard/modA',     name: 'Módulo A' })
    //   }
    //   if (rol === 'admin') {
    //     this.addMenuItem({ path: '/estudiantes/dashboard/modA', name: 'Módulo A' })
    //   }
    // }
  }

  logout() {
    this.authService.logout()
  }

  onClick (drawer) {
    if (drawer.mode === 'over') { drawer.close() }
  }

  isLargeScreen() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    return width > 720
  }
}
