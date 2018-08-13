// Modules
import { RouterModule, Routes } from '@angular/router'
import { NgModule }             from '@angular/core'
// Components
// import { LoginComponent }         from './pages/login/login.component'
// import { IndexComponent }         from './pages/index/index.component'
// import { NotFoundComponent }      from './pages/not-found/not-found.component'
// import { ResetPasswordComponent } from './pages/reset-password/reset-password.component'

const APP_ROUTES: Routes = [
  // { path: 'index', component: IndexComponent },
  // { path: 'login', component: LoginComponent },
  // { path: 'resetPassword', component: ResetPasswordComponent },
  // { path: '', redirectTo: '/index', pathMatch: 'full' },
  // { path: '**', component: NotFoundComponent }
]

@NgModule({
  imports: [
    RouterModule.forChild(APP_ROUTES)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutes {}
