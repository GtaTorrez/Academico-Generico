import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AdministradorRoutingModule } from './administrador-routing.module';
import { MenuComponent } from './menu/menu.component';
import { MateriasComponent,Modal } from './materias/materias.component';
import { ProfesoresComponent } from './profesores/profesores.component';
import { EstudiantesComponent } from './estudiantes/estudiantes.component';
import { HorariosComponent } from './horarios/horarios.component';

import {MaterialModule} from '../material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AdministradorService} from './administrador.service';
import { CursosComponent } from './cursos/cursos.component';
import { NotasComponent } from './notas/notas.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PerfilComponent } from './perfil/perfil.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdministradorRoutingModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [MenuComponent, 
    MateriasComponent, 
    ProfesoresComponent, 
    EstudiantesComponent, 
    HorariosComponent, 
    CursosComponent, 
    NotasComponent, 
    UsuariosComponent,
    Modal,
    PerfilComponent
  ],
  entryComponents:[MateriasComponent,Modal],
  providers:[AdministradorService]
})
export class AdministradorModule { }
