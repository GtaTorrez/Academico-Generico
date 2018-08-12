import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Pages
import { UsuariosComponent } from './usuarios.component';
// Servicios
// import { GuardService } from '../../services/auth/guard.service';

// Routes
const ROUTES: Routes = [
  { path: '', component: UsuariosComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ],
  exports: [
    RouterModule
  ]
})

export class UsuariosRoutes { }
