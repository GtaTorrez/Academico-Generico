import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Pages
import { DashboardComponent }         from './dashboard.component';
import { InformeAsistenciaComponent } from './informe-asistencia/informe-asistencia.component';
import { ReportesComponent }          from './informe-asistencia/reportes/reportes.component';

// Servicios
// import { GuardService } from '../../services/auth/guard.service';

// Routes
const ROUTES: Routes = [
  { path: '',
    component: DashboardComponent,
    // canActivate: [GuardService],
    children: [
      { path: 'informeasistencia', component: InformeAsistenciaComponent },
      { path: 'reportes',          component: ReportesComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ],
  exports: [
    RouterModule
  ]
})

export class DashboardRoutes { }
