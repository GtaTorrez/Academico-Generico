import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {PerfilEstudianteComponent} from './perfil-estudiante/perfil-estudiante.component';

import {FlexLayoutModule} from '@angular/flex-layout';

import { EstudiantesRoutingModule } from './estudiantes-routing.module';
import { MaterialModule } from '../material.module';
import { HorarioComponent } from './horario/horario.component';
import { NotasComponent } from './notas/notas.component';
import { AsistenciasComponent } from './asistencias/asistencias.component';
import { AlumnoService } from './alumno.service';



@NgModule({
  imports: [
    CommonModule,
    EstudiantesRoutingModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [PerfilEstudianteComponent, HorarioComponent, NotasComponent, AsistenciasComponent],
  providers:[AlumnoService]
})
export class EstudiantesModule { }
