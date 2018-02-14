import { Component, OnInit } from '@angular/core';
import {LoginService} from './login.service';
import { error } from 'util';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  username:string;
  password:string;
  constructor(private serve:LoginService) { }

  ngOnInit() {
  }
  submit(){
    
    let data={username:this.username,password:this.password};
    console.log(data);
    let resp=this.serve.postUser(data).subscribe(data=>{
      console.log("*************")
      console.log(data);
    },error=>{
      console.error(error);
    })
  }

}
