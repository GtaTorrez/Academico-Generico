// Libraries
import { HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders }  from '@angular/common/http'
import { Observable, BehaviorSubject }                             from 'rxjs/Rx'
import { Injectable }  from '@angular/core'
import 'rxjs/add/observable/throw'
// Services
import { AuthService }   from './auth.service'
import { ConfigService } from './config.service'

@Injectable()
export class RequestInterceptorService implements HttpInterceptor {
  isRefreshingToken : boolean                 = false
  tokenSubject      : BehaviorSubject<string> = new BehaviorSubject<string>(null)

  constructor (
    public authService: AuthService
  ) {}

  intercept (request: HttpRequest<any>, next: HttpHandler) : Observable<any> {
    request = request.clone(AuthService.getAuthBearerHttpOptions())

    return next.handle(request).catch(error => {
      if (error.status === 0 || !error.error) {
        console.log("\n\n ////// ERROR INTERNO DEL SERVIDOR //////\n", error)
        const ERROR = {
          status  : 'error',
          message : 'Error interno',
          errors  : [{ msg: 'Servicio no disponible, inténtelo mas tarde.' }]
        }
        return Observable.throw(ERROR)
      }
      if (error.status === 401) {
        this.authService.logout()
        return Observable.throw(error.error)
      }
      if (error.status === 498) {
        const SESION = AuthService.getSession()
        if (!SESION || !SESION.token_refresco) {
          this.authService.logout()
          return Observable.throw(error.error)
        }
        if (!this.isRefreshingToken) {
          this.isRefreshingToken = true
          this.tokenSubject.next(null)
          return this.authService.refrescarToken()
            .switchMap((result : any) => {
              const NEW_ACCESS_TOKEN = result.data.token_acceso
              let newReq
              this.tokenSubject.next(NEW_ACCESS_TOKEN)
              if (request.url.startsWith(ConfigService.AUTHORIZATION.verificarTokenURL)) {
                newReq = request.clone({ body: { token_acceso: NEW_ACCESS_TOKEN } })
              } else {
                newReq = request.clone({
                  headers: new HttpHeaders({
                    'Content-Type'  : 'application/json',
                    'Authorization' : `Bearer ${NEW_ACCESS_TOKEN}`
                  })
                })
              }
              return next.handle(newReq).catch(err => {
                return Observable.throw(err.error)
              })
            })
            .finally(() => {
              this.isRefreshingToken = false
            })
        } else {
          return this.tokenSubject
            .filter(token => token !== null)
            .take(1)
            .switchMap(newAccessToken => {
              let newReq
              this.tokenSubject.next(newAccessToken)
              if (request.url.startsWith(ConfigService.AUTHORIZATION.verificarTokenURL)) {
                newReq = request.clone({ body: { token_acceso: newAccessToken } })
              } else {
                newReq = request.clone({
                  headers: new HttpHeaders({
                    'Content-Type'  : 'application/json',
                    'Authorization' : `Bearer ${newAccessToken}`
                  })
                })
              }
              return next.handle(newReq).catch(err => {
                return Observable.throw(err.error)
              })
            })
        }
      }
      return Observable.throw(error.error)
    })
  }
}
