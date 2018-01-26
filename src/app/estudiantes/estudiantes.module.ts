import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {PerfilEstudianteComponent} from './perfil-estudiante/perfil-estudiante.component';

import { EstudiantesRoutingModule } from './estudiantes-routing.module';


@NgModule({
  imports: [
    CommonModule,
    EstudiantesRoutingModule
  ],
  declarations: [PerfilEstudianteComponent]
})
export class EstudiantesModule { }
