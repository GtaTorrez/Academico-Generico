import {Injectable} from '@angular/core';
import {Router,CanActivate} from '@angular/router';
import {LoginService} from './login.service';
@Injectable()
export class EstudianteGuard implements CanActivate {

    constructor(
        private router:Router,
        private login:LoginService        
    )
    {}
    canActivate():boolean{
        let rol="alumno";
        if(rol===localStorage.getItem("rol")){
            return true;
        }else{
            this.router.navigate(['/login']);
            return false;
        }
         
    }   
}