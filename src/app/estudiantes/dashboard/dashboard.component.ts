// Libraries
import { Component, OnInit } from '@angular/core'
import { Router }            from '@angular/router'
// Services
import { AuthService } from '../services/auth.service'
import { DataService } from '../services/data.service'
import { DashboardService } from './dashboard.service';

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
    var OneSignal = window['OneSignal'] || [];
    
    OneSignal.push(["init", {
      appId: "e338a31b-4667-471e-9a1a-4aa0c3cf6d5f",
      autoRegister: false,
      allowLocalhostAsSecureOrigin: true,
      notifyButton: {
        enable: false
      }
    }]);
    
    OneSignal.push(function () {
      
      OneSignal.push(["registerForPushNotifications"])
    });
    OneSignal.push(function () {
      // Occurs when the user's subscription changes to a new value.
      OneSignal.on('subscriptionChange', function (isSubscribed) {
        console.log("The user's subscription state is now:", isSubscribed);
        OneSignal.getUserId().then(function (userId) {
          console.log("User ID is ", userId);
          this.dashboardService.postDispositivo(userId).subscription(data=>{
            if(data.idDispositivo!==null){
              console.log("datos guardados ");

            }
          })

        });
      });
    });
  
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
