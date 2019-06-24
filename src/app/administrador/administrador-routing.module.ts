import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { MateriasComponent } from './materias/materias.component';
import { ProfesoresComponent } from './profesores/profesores.component';
import { EstudiantesComponent } from './estudiantes/estudiantes.component';
import { HorariosComponent } from './horarios/horarios.component';
import { CursosComponent } from './cursos/cursos.component';
import { NotasComponent } from './notas/notas.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { CursosLayoutComponent } from './cursos-layout/cursos-layout.component';
import { PensionesComponent } from './pensiones/pensiones.component';

const routes: Routes = [
  {path:'',redirectTo:'menu',pathMatch:'full'},
  {path:'menu',component:MenuComponent,children:[
    {path:'materias',component:MateriasComponent},
    {path:'profesores',component:ProfesoresComponent},
    {path:'estudiantes',component:EstudiantesComponent},
    {path:'horarios',component:HorariosComponent},
    {path:'notas',component:NotasComponent},
    {path:'ajuste',component:CursosComponent},
    {path:'cursos',component:CursosLayoutComponent},
    {path:'usuarios',component:UsuariosComponent},
    {path:'pensiones',component:PensionesComponent},
    {path:'asistencias', loadChildren: './dashboard/dashboard.module#DashboardModule' }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorRoutingModule { }
