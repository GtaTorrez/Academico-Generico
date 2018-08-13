import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Pages
import { ModAComponent }         from './modA.component';
// Servicios
// import { GuardService } from '../../services/auth/guard.service';

// Routes
const ROUTES: Routes = [
  { path: '', component: ModAComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ],
  exports: [
    RouterModule
  ]
})

export class ModARoutes { }