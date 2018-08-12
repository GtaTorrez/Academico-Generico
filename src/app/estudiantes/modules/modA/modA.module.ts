// Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule }        from '@angular/core';
import { CommonModule }    from '@angular/common';
import { MaterialModule }  from '../../material.module';
import { ModARoutes }      from './modA.routes';
// Components
import { ModAComponent }   from './modA.component';
// Services
import { AuthService }    from '../../services/auth.service';
import { GuardService }   from '../../services/guard.service';
import { DataService }    from '../../services/data.service';
import { ConfigService }  from '../../services/config.service';

@NgModule({
  imports: [
    ModARoutes,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    ModAComponent
  ],
  providers: [
    DataService,
    ConfigService,
    AuthService,
    GuardService
  ]
})
export class ModAModule {}
