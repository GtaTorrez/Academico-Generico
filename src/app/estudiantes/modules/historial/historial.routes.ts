import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Pages
import { HistorialComponent } from './historial.component';

// Routes
const ROUTES: Routes = [
  { path: '', component: HistorialComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ],
  exports: [
    RouterModule
  ]
})

export class HistorialRoutes { }
