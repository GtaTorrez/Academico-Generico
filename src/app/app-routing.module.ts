import { NgModule }        from '@angular/core';
import {
  Routes,
  RouterModule
}                          from '@angular/router';
import { LoginComponent }  from './login/login.component';
import { AdminGuard }      from './login/admin.guard';
import { EstudianteGuard } from './login/estudiante.guard';

const routes: Routes = [
  { path: '', redirectTo: "/login", pathMatch: 'full' },
  { path: 'login', component:LoginComponent},
  { path: 'administrador',    canActivate: [AdminGuard],      loadChildren: './administrador/administrador.module#AdministradorModule' },
  { path: 'estudiantes',      canActivate: [EstudianteGuard], loadChildren: './estudiantes/estudiantes.module#EstudiantesModule' },
  { path: 'asistencia', loadChildren: './controlasistencia/controlasistencia.module#ControlasistenciaModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
