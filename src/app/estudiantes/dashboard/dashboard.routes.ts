// Modules
import { RouterModule, Routes } from '@angular/router';
import { NgModule }             from '@angular/core';
// Components
import { DashboardComponent } from './dashboard.component';
import { AccountComponent }   from './account/account.component';
// Services
import { GuardService } from '../services/guard.service';

const ROUTES: Routes = [
  {
    path        : 'dashboard',
    component   : DashboardComponent,
    canActivate : [GuardService],
    children    : [
      { path: 'account',   component: AccountComponent },
      { path: 'home',      loadChildren: '../modules/home/home.module#HomeModule' },
      { path: 'historial', loadChildren: '../modules/historial/historial.module#HistorialModule' }
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
