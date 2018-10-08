// Libraries
import { Component, OnInit } from '@angular/core'
import { Router }            from '@angular/router'
// Services
import { AuthService } from '../services/auth.service'
import { DataService } from '../../login/data.service'
import { DashboardService } from './dashboard.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector    : 'app-dashboard',
  templateUrl : './dashboard.component.html',
  styleUrls   : ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  usuario       = { nombre: '', rol: '' }
  dashboardMenu = []
  idDevice:string="";
  // oneSignal:any;
  constructor (
    private dashboardService:DashboardService,
    public authService: AuthService,
    private snack:MatSnackBar
  ) {}

  addMenuItem (ROUTE) {
    for (let i in this.dashboardMenu) {
      if (this.dashboardMenu[i].path === ROUTE.path) { return }
    }
    this.dashboardMenu.push(ROUTE)
  }

  ngOnInit() {
    // this.addMenuItem({ path: '/estudiantes/dashboard/usuarios', name: 'Usuarios' })
    const SESSION = DataService.getSession()
    this.usuario.nombre = SESSION.usuario.nombre
    this.usuario.rol    = SESSION.usuario.rol
    if (SESSION.usuario.rol === 'alumno') {
      this.addMenuItem({ path: '/estudiantes/dashboard/account', name: 'Inicio' });
      this.addMenuItem({ path: '/estudiantes/dashboard/historial', name: 'Historial' });
    }
    if (SESSION.usuario.rol === 'tutor') {
      this.addMenuItem({ path: '/estudiantes/dashboard/account', name: 'Inicio' });
      this.addMenuItem({ path: '/estudiantes/dashboard/historial-tutor', name: 'Historial Tutor' });
    }

    const sendDevice = (id) => {
      console.log("Registrando dispositovo desde const",id);
      return this.dashboardService.postDispositivo(id).subscribe(data => {
        localStorage.setItem("notify","1");
        console.log(data)
        this.snack.open("Registro de dispositivo", '', { duration: 4000 });
      }),err=>{
        console.log("**************************************Error", err)
      }
    };


    var oneSignal=window['OneSignal'] || [];

    oneSignal.push(["init", {
      appId: "e338a31b-4667-471e-9a1a-4aa0c3cf6d5f",
      autoRegister: false,
      allowLocalhostAsSecureOrigin: true,
      notifyButton: {
        enable: false
      }
      
    }]);

    oneSignal.push(function() {
      // Occurs when the user's subscription changes to a new value.
      oneSignal.on('subscriptionChange', function (isSubscribed) {
        console.log("The user's subscription state is now:", isSubscribed);
        oneSignal.getUserId().then(function (userId) {
          if (userId !== undefined || userId !== null) {
              console.log("sendDevice(userId)")
              sendDevice(userId);
            }
          }).catch(err => {
            console.log("ERROR oneSignal getUserId: ", err)
          });
      });
    });
  

    // this.oneSignal.getUserId().then(function (userId) {
    //   console.log("User ID is ", userId);
    //   localStorage.setItem('idDevice',userId);
    //   id=userId;
    //   sendDevice(userId);
    // });

    // this.oneSignal.isPushNotificationsEnabled().then(data=>{
    //   console.log(data);
    //   if(localStorage.getItem("notify") !== undefined){
    //     this.oneSignal.getUserId().then(function (userId) {
    //     console.log("USER ID === ", userId)
    //     alert(userId)
    //       if (userId !== undefined || userId !== null) {
    //         console.log("sendDevice(userId)")
    //          sendDevice(userId);
    //       }
    //     }).catch(err => {
    //       console.log("ERROR oneSignal getUserId: ", err)
    //     });
    //   }
    // }).catch(err=>{
    //   console.log(err);
    // })
  }
  uploadDispositivo(val:string){
    const promise =new Promise(( resolve, reject )=>{
      if(val!==null || val!==undefined){
        let dataa=resolve(val);
        console.log("daata", dataa)
      }else{
        reject(new Error("no se pudo guardar"))
      }
    })
    return promise;
  }

  logout() {
    this.authService.logout()
  }

  registrarDispositivo(id){
    console.log("Registrndo dispositivo ",id );
    this.dashboardService.postDispositivo(id).subscribe(data=>{
      console.log(data)
    }),err=>{
      console.log("**************************************Error", err)
    }
  }

  onClick (drawer) {
    if (drawer.mode === 'over') { drawer.close() }
  }

  isLargeScreen() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    return width > 720
  }
}
