import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {  PerfilAsistenciaComponent} from '../controlasistencia/perfil-asistencia/perfil-asistencia.component';

const routes: Routes = [
  {path:"",component:PerfilAsistenciaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ControlasistenciaRoutingModule { }
