import {Injectable} from '@angular/core';
import {Router,CanActivate} from '@angular/router';
import {LoginService} from './login.service';
@Injectable()
export class AdminGuard implements CanActivate {

    constructor(
        private router:Router,
        private login:LoginService
    )
    {}
    canActivate():boolean{
        let rol="admin";
        // return true;
        console.log(localStorage.getItem("rol"))
        if(rol===localStorage.getItem("rol")){
            return true;
        }else{
            return false;
        }

    }
}
