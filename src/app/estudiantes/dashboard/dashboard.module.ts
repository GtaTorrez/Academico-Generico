// Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule }        from '@angular/core';
import { CommonModule }    from '@angular/common';
import { MaterialModule }  from '../material.module';
import { DashboardRoutes } from './dashboard.routes';
// Components
import { DashboardComponent }      from './dashboard.component';
import { AccountComponent }        from './account/account.component';
import { DatosGeneralesComponent } from './account/datos-generales/datos-generales.component';
import { DatosAccesoComponent }    from './account/datos-acceso/datos-acceso.component';
// Services
import { DataService }      from '../../login/data.service';
import { ConfigService }    from '../services/config.service';
import { DashboardService } from './dashboard.service';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutes,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    DashboardComponent,
    AccountComponent,
    DatosGeneralesComponent,
    DatosAccesoComponent
  ],
  providers: [
    DataService,
    ConfigService,
    DashboardService
  ]
})
export class DashboardModule {}
