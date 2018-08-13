// Modules
import { FormsModule, ReactiveFormsModule }    from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { CommonModule }              from '@angular/common'
import { NgModule }                   from '@angular/core'
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { MaterialModule }             from './material.module'
import { AppRoutes }                  from './app.routes'
import { DashboardModule }            from './dashboard/dashboard.module'
// Components
import { AppComponent }           from './app.component'
import { IndexComponent }         from './pages/index/index.component'
import { LoginComponent }         from './pages/login/login.component'
import { NotFoundComponent }      from './pages/not-found/not-found.component'
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component'
// Services
import { AuthService }               from './services/auth.service'
import { GuardService }              from './services/guard.service'
import { ConfigService }             from './services/config.service'

import { DataService }               from '../login/data.service'
// import { RequestInterceptorService } from './services/request.interceptor'

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    LoginComponent,
    NotFoundComponent,
    ResetPasswordComponent
  ],
  imports: [
    DashboardModule,
    AppRoutes,
    CommonModule,
    LoadingBarHttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    GuardService,
    DataService,
    ConfigService,
    // { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
