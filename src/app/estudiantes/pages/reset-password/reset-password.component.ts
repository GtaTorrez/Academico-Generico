// Libraries
import { FormControl, Validators }          from '@angular/forms';
import { Component, OnInit }                from '@angular/core'
import { Router, ParamMap, ActivatedRoute } from '@angular/router'
import { MatSnackBar } from '@angular/material'
// Services
import { AuthService } from '../../services/auth.service'
// Models
import { ResetPassword } from './reset-password.model'

@Component({
  selector    : 'app-reset-password',
  templateUrl : './reset-password.component.html',
  styleUrls   : ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  activo        = true
  model         = new ResetPassword()
  submitted     = false
  hide          = true
  nombreUsuario = ''

  constructor (
    private route       : ActivatedRoute,
    private router      : Router,
    private authService : AuthService,
    public  snackBar    : MatSnackBar,
  ) {}

  ngOnInit () {
    if(this.authService.isLogged) {
      this.router.navigate([this.authService.redirectUrl])
    }
    this.route.queryParams.subscribe(params => {
      this.model.codigo = params['codigo'] || ''
      if (this.model.codigo !== '') {
        this.authService.infoCodigoPassword(this.model.codigo).subscribe((result : any) => {
          this.nombreUsuario = result.data.nombre
        }, error => {
          this.model.codigo = ''
          this.snackBar.open(error.errors[0].msg, 'Error', { duration: 2000 })
        })
      }
    })
  }

  onSubmit () {
    if (this.model.codigo === '') { return this.onSubmitRecordar() }
    if (this.model.codigo !== '') { return this.onSubmitRecuperar() }
  }

  onSubmitRecordar () {
    this.submitted = true
    const BODY = { email: this.model.email }
    this.authService.recordarPassword(BODY).subscribe((result : any) => {
      this.submitted = false
      this.snackBar.open(result.message, 'Ok', { duration: 4000 })
    },
    error => {
      this.submitted = false
      this.snackBar.open(error.errors[0].msg, 'Error', { duration: 2000 })
    })
  }

  onSubmitRecuperar () {
    this.submitted = true
    const BODY = { codigo: this.model.codigo, password: this.model.password, password_confirm: this.model.password_confirm }
    this.authService.recuperarPassword(BODY).subscribe((result : any) => {
      this.submitted = false
      this.snackBar.open(result.message, 'Ok', { duration: 2000 })
    },
    error => {
      this.submitted = false
      this.snackBar.open(error.errors[0].msg, 'Error', { duration: 2000 })
    })
  }

}
