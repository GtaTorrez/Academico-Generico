import {Injectable} from '@angular/core';
import {Router,CanActivate} from '@angular/router';
import {LoginService} from './login.service';
@Injectable()
export class LoginGuard implements CanActivate {

    constructor(
        private router:Router,
        private login:LoginService        
    )
    {}
    canActivate():boolean{
        let rol="admin";
        if(rol==="admin"){
            return true;
        }else{
            this.router.navigate(['/login']);
            return false;
        }
         
    }   
}