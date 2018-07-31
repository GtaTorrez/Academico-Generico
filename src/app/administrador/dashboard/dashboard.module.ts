import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule
}                                 from '@angular/forms';
import { MaterialModule }         from '../../material.module';
import { FlexLayoutModule }       from '@angular/flex-layout';

import { PdfmakeModule }          from 'ng-pdf-make';

import { DashboardRoutes }        from './dashboard.routes';
import { DashboardComponent }     from './dashboard.component';

import { InformeAsistenciaComponent } from './informe-asistencia/informe-asistencia.component';
import {
  TablaAsistenciaComponent,
  AgregarObservacionDialog
}                                     from './informe-asistencia/tabla-asistencia/tabla-asistencia.component';
import { ReportesComponent }          from './informe-asistencia/reportes/reportes.component';

import { AsistenciaService }          from './services/asistencia.service';
// import { AuthService }             from '../../services/auth/auth.service';
// import { GuardService }            from '../../services/auth/guard.service';
// import { DataService }             from '../../services/data/data.service';
// import { ConfigService }           from '../../services/config.service';

@NgModule({
  entryComponents: [
    TablaAsistenciaComponent,
    AgregarObservacionDialog
  ],
  imports: [
    CommonModule,
    DashboardRoutes,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    PdfmakeModule
  ],
  declarations: [
    // componente principal
    DashboardComponent,
    // Componentes secundarios
    InformeAsistenciaComponent,
    ReportesComponent,
    TablaAsistenciaComponent,
    AgregarObservacionDialog
  ],
  providers: [
    AsistenciaService,
    // ConfigService,
    // AuthService,
    // GuardService,
  ]
})
export class DashboardModule { }
