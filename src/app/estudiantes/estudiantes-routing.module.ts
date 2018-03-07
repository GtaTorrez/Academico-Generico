import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilEstudianteComponent } from './perfil-estudiante/perfil-estudiante.component';
import { AsistenciasComponent } from './asistencias/asistencias.component';
import { NotasComponent } from './notas/notas.component';
import { HorarioComponent } from './horario/horario.component';

const routes: Routes = [
  {path:'',redirectTo:'perfil',pathMatch:'full'},
  {path:'perfil',component:PerfilEstudianteComponent,children:[
    {path:'asistencia',component:AsistenciasComponent},
    {path:'notas',component:NotasComponent},
    {path:'horario',component:HorarioComponent},
  ]},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstudiantesRoutingModule { }
