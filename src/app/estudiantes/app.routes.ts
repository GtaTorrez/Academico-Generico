// Modules
import { RouterModule, Routes } from '@angular/router'
import { NgModule }             from '@angular/core'
// Components

const APP_ROUTES: Routes = []

@NgModule({
  imports: [
    RouterModule.forChild(APP_ROUTES)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutes {}
