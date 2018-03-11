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
import { LoadersService } from './loader/loaders.service';
import { LoadComponent } from './loader/load/load.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoadComponent
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
  providers: [LoginService,LoginGuard,AdminGuard,EstudianteGuard,LoadersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
