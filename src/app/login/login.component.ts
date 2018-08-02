import { Component, OnInit } from '@angular/core';
import {LoginService} from './login.service';

import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  username:string;
  password:string;
  constructor(private serve:LoginService,private router:Router) { }
  ngOnInit() {}
  submit() {
    let data={username:this.username,password:this.password};
    console.log(data);
    let resp=this.serve.postUser(data).subscribe(data=>{
      console.log(data);
      if (data.message==='Acceso satisfactoriamente' && data.user ) {
        this.serve.getData().subscribe(data=>{
          console.log(data);
          if(data.usuario.rol==='admin'){
            console.log("redireccionar admin")
            localStorage.setItem('rol','admin');
            localStorage.setItem('user',data.usuario.username);
            this.router.navigate(['/administrador']);
          }
          if(data.usuario.rol==='alumno'){
            console.log("redireccionar alumno")
            localStorage.setItem('rol','alumno');
            localStorage.setItem('user',data.usuario.username);
            this.router.navigate(['/estudiantes']);
          }

        })
      }
    },error=>{
      console.error(error);
    })
  }

}
