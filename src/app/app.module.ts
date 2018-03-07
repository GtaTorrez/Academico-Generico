import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {LoginComponent} from './login/login.component';
import {LoginService} from './login/login.service';
import {MaterialModule} from './material.module';
import {LoginGuard} from './login/login.guard'
import {AdminGuard} from './login/admin.guard'
import {EstudianteGuard} from './login/estudiante.guard'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [LoginService,LoginGuard,AdminGuard,EstudianteGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
