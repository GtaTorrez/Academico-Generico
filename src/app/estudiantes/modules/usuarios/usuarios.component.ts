// Libraries
import { Component, OnInit, ViewChild, Inject }                              from '@angular/core'
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material'
import { Observable } from 'rxjs/Observable'
import { merge }      from 'rxjs/observable/merge'
import { catchError } from 'rxjs/operators/catchError'
import { map }        from 'rxjs/operators/map'
import { startWith }  from 'rxjs/operators/startWith'
import { switchMap }  from 'rxjs/operators/switchMap'
// Components
import { UsuarioFormComponent } from './usuario-form/usuario-form.component'
// Services
import { AuthService }    from '../../services/auth.service'
import { UsuariosService } from './usuarios.service'

@Component({
  selector    : 'dashboard-usuarios',
  templateUrl : './usuarios.component.html',
  styleUrls   : ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  displayedColumns = ['id_usuario', 'username', 'nombre', 'email', 'roles', '_estado', 'acciones']
  dataSource       = new MatTableDataSource()
  count            = 0
  DEFAULT_LIMIT    = 5

  @ViewChild(MatPaginator) paginator : MatPaginator
  @ViewChild(MatSort)      sort      : MatSort

  constructor(
    private usuariosService : UsuariosService,
    public  authService    : AuthService,
    public  snackBar       : MatSnackBar,
    public  dialog         : MatDialog
  ) {}

  ngOnInit() {
    // this.authService.restaurarSesion()
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0)
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          const SORT = this.sort
          const fields = []
          for (let i in this.displayedColumns) {
            const fieldName = this.displayedColumns[i]
            if (fieldName === 'roles')    { fields.push('roles(rol(nombre))') }
            if (fieldName !== 'acciones') { fields.push(fieldName) }
          }
          const orderField = (this.sort.active === 'roles') ? `roles.rol.nombre` : (this.sort.active || 'id_usuario')
          const order      = `${this.sort.direction === 'desc' ? '-' : ''}${orderField}`
          const limit      = this.paginator.pageSize || this.DEFAULT_LIMIT
          const page       = this.paginator.pageIndex + 1
          return this.usuariosService.get(fields.toString(), order, limit, page)
        }),
        map((result : any) => {
          this.count = result.metadata.count
          this.setOptionsToResult(result)
          return result
        }),
        catchError((error) => {
          this.snackBar.open(error.errors[0].msg, 'Error', { duration: 2000 })
          return Observable.of([])
        })
      ).subscribe(result => {
        this.dataSource.data = result.data
      })
  }

  private setOptionsToResult (result) {
    const ID_USUARIO_SESION = this.authService.idUsuario
    const IS_SUPERADMIN     = this.authService.isSuperadmin
    const IS_ADMIN          = this.authService.isAdmin
    result.data.forEach(usuario => {
      usuario._update  = usuario._estado === 'ACTIVO'   && usuario.id_usuario !== ID_USUARIO_SESION
      usuario._delete  = usuario._estado === 'ACTIVO'   && usuario.id_usuario !== ID_USUARIO_SESION
      usuario._restore = usuario._estado === 'INACTIVO' && usuario.id_usuario !== ID_USUARIO_SESION
      if (usuario._update && usuario.rolesNombre.includes('superadmin')) { usuario._update = IS_SUPERADMIN }
      if (usuario._delete && usuario.rolesNombre.includes('superadmin')) { usuario._delete = IS_SUPERADMIN }
      if (usuario._restore) { usuario._restore = IS_SUPERADMIN }
    })
  }

  getUsuarios () {
    const fields = 'ALL'
    const order  = 'id_usuario'
    const limit  = this.paginator.pageSize || this.DEFAULT_LIMIT
    const page   = this.paginator.pageIndex + 1
    this.usuariosService.get(fields, order, limit, page).subscribe((result : any) => {
      this.setOptionsToResult(result)
      this.dataSource.data = result.data
      this.count           = result.metadata.count
    },
    error => {
      this.snackBar.open(error.errors[0].msg, 'Error', { duration: 2000 })
    })
  }

  crear () {
    let dialogRef = this.dialog.open(UsuarioFormComponent, { data: {}, panelClass: 'myapp-no-padding-dialog' })
    dialogRef.afterClosed().subscribe(result => {
      if (result) { this.getUsuarios() }
    })
  }

  editar (idUsuario) {
    const fields = 'ALL'
    this.usuariosService.getId(fields, idUsuario).subscribe((result : any) => {
      let dialogRef = this.dialog.open(UsuarioFormComponent, {
        data: {
          idUsuario     : idUsuario,
          persona       : result.data.persona,
          administrador : result.data.persona.administrador,
          roles         : result.data.rolesId
        },
        panelClass: 'myapp-no-padding-dialog'
      })
      dialogRef.afterClosed().subscribe(result => {
        if (result) { this.getUsuarios() }
      })
    },
    error => {
      this.snackBar.open(error.errors[0].msg, 'Error', { duration: 2000 })
    })
  }

  eliminar (idUsuario) {
    this.usuariosService.disable(idUsuario).subscribe((result : any) => {
      this.snackBar.open(result.message, 'Ok', { duration: 2000 })
      this.getUsuarios()
    },
    error => {
      this.snackBar.open(error.errors[0].msg, 'Error', { duration: 2000 })
    })
  }

  restaurar (idUsuario) {
    this.usuariosService.enable(idUsuario).subscribe((result : any) => {
      this.snackBar.open(result.message, 'Ok', { duration: 2000 })
      this.getUsuarios()
    },
    error => {
      this.snackBar.open(error.errors[0].msg, 'Error', { duration: 2000 })
    })
  }
}
