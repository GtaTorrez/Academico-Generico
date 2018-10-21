// Modules
import { RouterModule, Routes } from '@angular/router';
import { NgModule }             from '@angular/core';
// Components
import { DashboardComponent } from './dashboard.component';
import { AccountComponent }   from './account/account.component';
// Services

import { DashboardGuard } from '../../login/dashboard.guard';
import { TutorGuard }     from '../../login/tutor.guard';
// import { EstudianteGuard } from '../../login/estudiante.guard';

const ROUTES: Routes = [
  {
    path        : 'dashboard',
    component   : DashboardComponent,
    canActivate : [DashboardGuard],
    children    : [
      { path: 'account', component: AccountComponent },
      { path: 'historial', loadChildren: '../modules/historial/historial.module#HistorialModule' },
      { path: 'historial-tutor', canActivate: [TutorGuard], loadChildren: '../modules/historial-tutor/historial-tutor.module#HistorialTutorModule' }
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
export class DashboardRoutes {}
