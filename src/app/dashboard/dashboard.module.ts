import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule
}                                 from '@angular/forms';
import { MaterialModule }         from '../material.module';
import { FlexLayoutModule }       from '@angular/flex-layout';

import { DashboardRoutes }        from './dashboard.routes';
import { DashboardComponent }     from './dashboard.component';

import { InformeAsistenciaComponent } from './informe-asistencia/informe-asistencia.component';
import { TablaAsistenciaComponent }   from './informe-asistencia/tabla-asistencia/tabla-asistencia.component';

// import { AuthService }             from '../../services/auth/auth.service';
// import { GuardService }            from '../../services/auth/guard.service';
// import { DataService }             from '../../services/data/data.service';
// import { ConfigService }           from '../../services/config.service';

@NgModule({
  entryComponents: [],
  imports: [
    CommonModule,
    DashboardRoutes,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [
    // componente principal
    DashboardComponent,
    // Componentes secundarios
    InformeAsistenciaComponent,
    TablaAsistenciaComponent
  ],
  providers: [
    // DataService,
    // ConfigService,
    // AuthService,
    // GuardService,
  ]
})
export class DashboardModule { }
