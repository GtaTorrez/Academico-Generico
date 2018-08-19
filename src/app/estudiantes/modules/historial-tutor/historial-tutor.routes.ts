import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Pages
import { HistorialTutorComponent }         from './historial-tutor.component';
// Servicios
// import { GuardService } from '../../services/auth/guard.service';

// Routes
const ROUTES: Routes = [
  { path: '', component: HistorialTutorComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ],
  exports: [
    RouterModule
  ]
})

export class HistorialTutorRoutes { }
