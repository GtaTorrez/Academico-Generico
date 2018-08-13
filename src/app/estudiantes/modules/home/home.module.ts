// Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule }        from '@angular/core';
import { CommonModule }    from '@angular/common';
import { MaterialModule }  from '../../material.module';
import { HomeRoutes }      from './home.routes';
// Components
import { HomeComponent }   from './home.component';
// Services
import { AuthService }    from '../../services/auth.service';
import { GuardService }   from '../../services/guard.service';
import { DataService }    from '../../../login/data.service';
import { ConfigService }  from '../../services/config.service';

@NgModule({
  imports: [
    HomeRoutes,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    HomeComponent
  ],
  providers: [
    DataService,
    ConfigService,
    AuthService,
    GuardService
  ]
})
export class HomeModule {}
