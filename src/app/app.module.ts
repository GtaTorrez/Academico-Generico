import { BrowserModule }           from '@angular/platform-browser';
import { NgModule }                from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  FormsModule,
  ReactiveFormsModule
}                                  from '@angular/forms';
import { HttpClientModule }        from '@angular/common/http';
import { AppRoutingModule }        from './app-routing.module';
import { AppComponent }            from './app.component';
// import { MaterialModule }          from './material.module';
import { LoginComponent }          from './login/login.component';
import { LoginService }            from './login/login.service';
import { LoginGuard }              from './login/login.guard'
import { AdminGuard }              from './login/admin.guard'
import { EstudianteGuard }         from './login/estudiante.guard'
import { DashboardGuard }          from './login/dashboard.guard'
import { TutorGuard }              from './login/tutor.guard'
import { LoadersService }          from './loader/loaders.service';
import { LoadComponent }           from './loader/load/load.component';

// import {MatProgressSpinnerModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoadComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
    // MaterialModule,
  ],
  providers: [
    LoginService,
    LoginGuard,
    AdminGuard,
    EstudianteGuard,
    TutorGuard,
    LoadersService,
    DashboardGuard
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
