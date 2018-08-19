import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { LoginService } from './login.service';

import { LoadersService } from '../loader/loaders.service';
import { DataService }    from './data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  username:string;
  password:string;
  errorLog:boolean;
  msgError:string;
  constructor(
    private serve:LoginService,
    private router:Router,
    private loader:LoadersService

  ) { }
  ngOnInit() {
    const SESSION = DataService.getSession()
    if (SESSION) {
      this.redirectToHome(SESSION.usuario.rol)
    }
  }
  submit() {
    this.loader.cambiarEstado(true);
    let data={username:this.username,password:this.password};
    let resp=this.serve.postUser(data).subscribe(data=>{
      if (data.message==='Acceso satisfactoriamente' && data.user ) {
        const SESSION = {
          usuario: {
            id       : data.user.usuario.id,
            username : data.user.usuario.username,
            rol      : data.user.usuario.rol,
            nombre   : `${data.user.nombre ? data.user.nombre : ''} ${data.user.apellido ? data.user.apellido : ''}`.trim()
          }
        }
        DataService.setSession(SESSION)
        this.redirectToHome(SESSION.usuario.rol)
      }else{
        if(data.message==='Usuario No encontrado' || data.message==='Password invalido'){
          this.errorLog=true;
          this.msgError=data.message;
        }
      }
      this.loader.cambiarEstado(false);
    },error=>{
      this.loader.cambiarEstado(false);
      console.error(error);
    })
  }

  redirectToHome (rol) {
    if (rol === 'admin') {
      this.router.navigate(['/administrador'])
    }
    if (rol === 'alumno') {
      this.router.navigate(['/estudiantes/dashboard/account']);
    }
    if (rol === 'tutor') {
      this.router.navigate(['/estudiantes/dashboard/account']);
    }
  }

}
