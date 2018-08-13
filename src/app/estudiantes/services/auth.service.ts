// Libreries
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http'
import { catchError, map, tap }                 from 'rxjs/operators'
import { Injectable } from '@angular/core'
import { Router }     from '@angular/router'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/throw'
// Services
import { DataService }   from '../../login/data.service'
import { ConfigService } from './config.service'

declare var Buffer : any

@Injectable()
export class AuthService {
  isLogged     : boolean = false
  isSuperadmin : boolean = false
  isAdmin      : boolean = false
  idUsuario    : number  = 0
  redirectUrl  : string  = '/login'
  routes       : Array<string>

  constructor (
    private http   : HttpClient,
    private router : Router
  ) {}

  restaurarSesion () {
    const SESSION = DataService.getSession()
    if (SESSION) {
      this.updateSession({ data: SESSION })
      this.verificarToken().subscribe((result : any) => {
        if (JSON.stringify(SESSION.usuario) !== JSON.stringify(result.data.usuario)) {
          this.logout()
        }
      }, err => { this.logout() })
    }
  }

  public static getSession () : any {
    return DataService.getSession()
  }

  public static getAuthBearerHttpOptions () : any {
    const SESION = DataService.getSession()
    return {
      headers: new HttpHeaders({
        'Content-Type'  : 'application/json',
        'Authorization' : `Bearer ${SESION ? SESION.token_acceso : ''}`
      })
    }
  }

  public static getAuthBasicHttpOptions () : any {
    const CLIENT_ID     = ConfigService.CLIENT.clientId
    const CLIENT_SECRET = ConfigService.CLIENT.clientSecret
    const BASIC_AUTH    = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')
    return {
      headers: new HttpHeaders({
        'Content-Type'  : 'application/json',
        'Authorization' : `Basic ${BASIC_AUTH}`
      })
    }
  }

  private updateSession (session) : any {
    if (session) {
      DataService.setSession(session.data)
      this.isLogged    = true
      this.idUsuario   = session.data.usuario.id_usuario
      this.routes      = this.getRoutes(session.data.usuario.roles)
      this.redirectUrl = '/dashboard/home'
      session.data.usuario.roles.forEach(rol => {
        if (rol === 'superadmin') { this.isSuperadmin = true }
        if (rol === 'admin')      { this.isAdmin      = true }
      })
    } else {
      DataService.removeSession()
      this.isLogged     = false
      this.isSuperadmin = false
      this.isAdmin      = false
      this.idUsuario    = 0
      this.routes       = []
      this.redirectUrl  = '/login'
    }
  }

  verificarToken () : Observable<Object> {
    const HTTP_OPTIONS = AuthService.getAuthBasicHttpOptions()
    const body         = { token_acceso: DataService.getSession().token_acceso }
    return this.http.post(ConfigService.AUTHORIZATION.verificarTokenURL, body, HTTP_OPTIONS)
  }

  refrescarToken () : Observable<Object> {
    const HTTP_OPTIONS = AuthService.getAuthBasicHttpOptions()
    const body         = { token_refresco: DataService.getSession().token_refresco }
    return this.http.post(ConfigService.AUTHORIZATION.refrescarTokenURL, body, HTTP_OPTIONS).pipe(
      tap((result : any) => { this.updateSession(result) })
    )
  }

  private getRoutes (roles) : string[] {
    const routes = []
    function addRoute (route) { if (!routes.includes(route)) { routes.push(route) } }
    roles.forEach(rol => {
      addRoute('/dashboard/home')
      addRoute('/dashboard/account')
      if (rol === 'superadmin') {
        addRoute('/dashboard/usuarios')
        addRoute('/dashboard/modA')
      }
      if (rol === 'admin') {
        addRoute('/dashboard/modA')
      }
    })
    return routes
  }

  login (body: Object) : Observable<Object> {
    const HTTP_OPTIONS = AuthService.getAuthBasicHttpOptions()
    return this.http.post(ConfigService.AUTHORIZATION.obtenerTokenURL, body, HTTP_OPTIONS).pipe(
      tap((result: any) => {
        this.updateSession(result)
        this.router.navigate(['/dashboard/home'])
      })
    )
  }

  recordarPassword (body: any) : Observable<Object> {
    body.url_reset = ConfigService.AUTHORIZATION.resetURL
    return this.http.post(ConfigService.AUTHORIZATION.recordarPasswordURL, body).pipe(
      tap((result: any) => { this.router.navigate(['/login']) })
    )
  }

  recuperarPassword (body: any) : Observable<Object> {
    return this.http.post(ConfigService.AUTHORIZATION.recuperarPasswordURL, body).pipe(
      tap((result: any) => { this.router.navigate(['/login']) })
    )
  }

  infoCodigoPassword (codigo: string) : Observable<Object> {
    return this.http.get(`${ConfigService.AUTHORIZATION.codigoInfoPasswordURL}?codigo=${codigo}`)
  }

  logout() : void {
    this.updateSession(null)
    this.http.get(`${ConfigService.AUTHORIZATION.logOutURL}`)
    this.router.navigate(['/login'])
  }
}
