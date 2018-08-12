// Libraries
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit }       from '@angular/core'
import { Router }      from '@angular/router'
import { MatSnackBar } from '@angular/material'
// Services
import { AuthService } from '../../services/auth.service'
// Models
import { Login } from './login.model'

@Component({
  selector    : 'app-login',
  templateUrl : './login.component.html',
  styleUrls   : ['./login.component.css']
})
export class LoginComponent implements OnInit {
  activo    = true
  model     = new Login()
  submitted = false
  hide      = true
  username  = new FormControl(this.model.username, [Validators.required]);
  password  = new FormControl(this.model.password, [Validators.required, Validators.minLength(3)]);

  constructor (
    private router      : Router,
    private authService : AuthService,
    public  snackBar    : MatSnackBar,
  ) {}

  getErrorMessage (inputName) {
    if (inputName === 'username') {
      if (this.username.hasError('required')) return 'Este campo es requerido.'
    }
    if (inputName === 'password') {
      if (this.password.hasError('required'))  return 'Este campo es requerido.'
      if (this.password.hasError('minlength')) return `Se requieren ${this.password.errors.minlength.requiredLength} caracteres.`
    }
    return 'Error de validación.'
  }

  ngOnInit () {
    if(this.authService.isLogged) {
      this.router.navigate([this.authService.redirectUrl])
    }
  }

  onSubmit () {
    if (this.username.invalid || this.password.invalid || this.submitted) { return }
    this.submitted = true
    this.model.tipo_acceso = this.activo ? 'offline' : 'online'
    this.authService.login(this.model).subscribe((result : any) => {
      this.submitted = false
      this.snackBar.open(result.message, 'Ok', { duration: 2000 })
    },
    error => {
      this.submitted = false
      this.snackBar.open(error.errors[0].msg, 'Error', { duration: 4000 })
    })
  }

}
