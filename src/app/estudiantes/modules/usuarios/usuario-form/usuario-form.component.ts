// Libraries
import { Component, OnInit, ViewChild, Inject }       from '@angular/core'
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material'
import { FormControl, Validators }                    from '@angular/forms'
// Services
import { UsuariosService } from '../usuarios.service'
// Models
import { UsuarioFormModel } from './usuario-form.model'

@Component({
  selector    : 'dashboard-usuario-form',
  templateUrl : './usuario-form.component.html',
  styleUrls   : ['./usuario-form.component.scss']
})
export class UsuarioFormComponent {
  rolSesion  : string
  model      : UsuarioFormModel
  submitted  : boolean = false
  listaRoles : any[]

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public  data            : any,
    private usuariosService : UsuariosService,
    public  snackBar        : MatSnackBar,
    public  dialogRef       : MatDialogRef<UsuarioFormComponent>
  ) {
    this.rolSesion  = 'superadmin'
    this.model      = new UsuarioFormModel()
    this.listaRoles = [
      { id_rol: 1, nombre: 'superadmin', disabled: this.rolSesion !== 'superadmin' },
      { id_rol: 2, nombre: 'admin' },
      { id_rol: 3, nombre: 'user' }
    ]
  }

  ngOnInit() {
    const DATA = this.data
    if (DATA.idUsuario) {
      this.model.id_usuario    = DATA.idUsuario     || 0
      this.model.persona       = DATA.persona
      this.model.administrador = DATA.administrador || {}
      this.model.roles         = DATA.roles
    }
  }

  onCancel () : void {
    this.dialogRef.close()
  }

  onSubmit() {
    if (this.submitted) { return }
    if (this.model.persona.email === '' || this.model.persona.documento_identidad === '') {
      return
    }
    if (this.model.id_usuario === 0) {
      this.onSubmitCreate()
    } else {
      this.onSubmitEdit()
    }
  }

  private onSubmitCreate () {
    this.submitted = true
    this.usuariosService.create(this.model).subscribe((result : any) => {
      this.submitted = false
      this.snackBar.open(result.message, 'Ok', { duration: 2000 })
      this.dialogRef.close(this.model)
    },
    (error : any) => {
      this.submitted = false
      this.snackBar.open(error.errors[0].msg, 'Error', { duration: 2000 })
    })
  }

  private onSubmitEdit() {
    this.submitted = true
    this.usuariosService.update(this.model, this.model.id_usuario).subscribe((result : any) => {
      this.submitted = false
      this.snackBar.open(result.message, 'Ok', { duration: 2000 })
      this.dialogRef.close(this.model)
    },
    (error : any) => {
      this.submitted = false
      this.snackBar.open(error.errors[0].msg, 'Error', { duration: 2000 })
    })
  }
}
