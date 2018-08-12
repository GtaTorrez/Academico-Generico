import { Component, OnInit } from '@angular/core';
import {LoginService} from './login.service';


import { Router } from '@angular/router';
import { LoadersService } from '../loader/loaders.service';
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
  ngOnInit() {}
  submit() {
    this.loader.cambiarEstado(true);
    let data={username:this.username,password:this.password};
    let resp=this.serve.postUser(data).subscribe(data=>{
      console.log(data);
      if (data.message==='Acceso satisfactoriamente' && data.user ) {
        this.serve.getData().subscribe(data=>{
          if(data.usuario.rol==='admin'){
            localStorage.setItem('rol','admin');
            localStorage.setItem('user',data.usuario.username);
            this.router.navigate(['/administrador']);
          }
          if(data.usuario.rol==='alumno'){
            localStorage.setItem('rol','alumno');
            localStorage.setItem('user',data.usuario.username);
            this.router.navigate(['/estudiantes/dashboard/account']);
          }
        })
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

}
