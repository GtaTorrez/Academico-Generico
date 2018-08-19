// Modules
import { RouterModule, Routes } from '@angular/router';
import { NgModule }             from '@angular/core';
// Components
import { DashboardComponent } from './dashboard.component';
import { AccountComponent }   from './account/account.component';
// Services
import { GuardService } from '../services/guard.service';

import { EstudianteGuard } from '../../login/estudiante.guard';
import { TutorGuard }      from '../../login/tutor.guard';

const ROUTES: Routes = [
  {
    path        : 'dashboard',
    component   : DashboardComponent,
    children    : [
      { path: 'account',   component: AccountComponent },
      { path: 'home',      loadChildren: '../modules/home/home.module#HomeModule' },
      { path: 'historial', canActivate: [EstudianteGuard], loadChildren: '../modules/historial/historial.module#HistorialModule' },
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
