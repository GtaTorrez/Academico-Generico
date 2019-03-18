// Libraries
import { Component, OnInit } from '@angular/core'
import { Router }            from '@angular/router'
// Services
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
    private router: Router,
    private dashboardService:DashboardService,
    private snack:MatSnackBar
  ) {}

  addMenuItem (ROUTE) {
    for (let i in this.dashboardMenu) {
      if (this.dashboardMenu[i].path === ROUTE.path) { return }
    }
    this.dashboardMenu.push(ROUTE)
  }

  ngOnInit() {
    const SESSION = DataService.getSession()
    this.usuario.nombre = SESSION.usuario.nombre
    this.usuario.rol    = SESSION.usuario.rol
    if (SESSION.usuario.rol === 'admin') {
      this.addMenuItem({ path: '/user/dashboard/account', name: 'Inicio' });
      this.addMenuItem({ path: '/administrador/menu/usuarios', name: 'Panel de control' });
    }
    if (SESSION.usuario.rol === 'alumno') {
      this.addMenuItem({ path: '/user/dashboard/account', name: 'Inicio' });
      this.addMenuItem({ path: '/user/dashboard/historial', name: 'Historial' });
    }
    if (SESSION.usuario.rol === 'tutor') {
      this.addMenuItem({ path: '/user/dashboard/account', name: 'Inicio' });
      this.addMenuItem({ path: '/user/dashboard/historial-tutor', name: 'Historial Tutor' });
    }
    if (SESSION.usuario.rol === 'profesor') {
      this.addMenuItem({ path: '/user/dashboard/account', name: 'Inicio' });
      this.addMenuItem({ path: '/user/dashboard/historial', name: 'Historial' });
    }
    if (SESSION.usuario.rol === 'administrador') {
      this.addMenuItem({ path: '/user/dashboard/account', name: 'Inicio' });
      this.addMenuItem({ path: '/user/dashboard/historial', name: 'Historial' });
    }

    const sendDevice = (id) => {
      // // console.log("Registrando dispositovo desde const",id);
      return this.dashboardService.postDispositivo(id).subscribe(data => {
        localStorage.setItem("notify","1");
        // // console.log(data)
        this.snack.open("Registro de dispositivo", '', { duration: 4000 });
      }),err=>{
        // // console.log("**************************************Error", err)
      }
    };

    const ONE_SIGNAL    = localStorage.getItem('oneSignal')
    const ENABLE_BY_ROL = this.usuario.rol !== 'admin'

    if (ENABLE_BY_ROL && !ONE_SIGNAL) {
      var oneSignal=window['OneSignal'] || [];
      // console.log('ONE SIGNAL ', oneSignal)

      localStorage.setItem('oneSignal', 'init')
      oneSignal.push(["init", {
        appId: "8fb6e21d-bcd8-418a-ba39-fec8f46e18a0",
        autoRegister: false,
        allowLocalhostAsSecureOrigin: true,
        notifyButton: {
          enable: false
        }
      }]);

      // console.log('ONE SIGNAL INITIALIZED')

      oneSignal.push(function() {
        // Occurs when the user's subscription changes to a new value.
        oneSignal.on('subscriptionChange', function (isSubscribed) {
          // // console.log("The user's subscription state is now:", isSubscribed);
          oneSignal.getUserId().then(function (userId) {
            if (userId !== undefined || userId !== null) {
                // // console.log("sendDevice(userId)")
                sendDevice(userId);
              }
            }).catch(err => {
              // // console.log("ERROR oneSignal getUserId: ", err)
            });
        });
      });
    }

    // this.oneSignal.getUserId().then(function (userId) {
    //   // console.log("User ID is ", userId);
    //   localStorage.setItem('idDevice',userId);
    //   id=userId;
    //   sendDevice(userId);
    // });

    // this.oneSignal.isPushNotificationsEnabled().then(data=>{
    //   // console.log(data);
    //   if(localStorage.getItem("notify") !== undefined){
    //     this.oneSignal.getUserId().then(function (userId) {
    //     // console.log("USER ID === ", userId)
    //     alert(userId)
    //       if (userId !== undefined || userId !== null) {
    //         // console.log("sendDevice(userId)")
    //          sendDevice(userId);
    //       }
    //     }).catch(err => {
    //       // console.log("ERROR oneSignal getUserId: ", err)
    //     });
    //   }
    // }).catch(err=>{
    //   // console.log(err);
    // })
  }
  uploadDispositivo(val:string){
    const promise =new Promise(( resolve, reject )=>{
      if(val!==null || val!==undefined){
        let dataa=resolve(val);
        // // console.log("daata", dataa)
      }else{
        reject(new Error("no se pudo guardar"))
      }
    })
    return promise;
  }

  logout() {
    this.dashboardService.logout()
    location.reload()
  }

  registrarDispositivo(id){
    // // console.log("Registrndo dispositivo ",id );
    this.dashboardService.postDispositivo(id).subscribe(data=>{
      // // console.log(data)
    }),err=>{
      // // console.log("**************************************Error", err)
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
