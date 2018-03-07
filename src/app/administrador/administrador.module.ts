import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AdministradorRoutingModule } from './administrador-routing.module';
import { MenuComponent } from './menu/menu.component';
import { MateriasComponent,Modal } from './materias/materias.component';
import { ProfesoresComponent } from './profesores/profesores.component';
import { EstudiantesComponent,ModalP } from './estudiantes/estudiantes.component';
import { HorariosComponent } from './horarios/horarios.component';

import {MaterialModule} from '../material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AdministradorService} from './administrador.service';
import { CursosComponent } from './cursos/cursos.component';
import { NotasComponent } from './notas/notas.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PerfilComponent } from './perfil/perfil.component';
import { QRCodeModule } from 'angular2-qrcode';
import { CursosLayoutComponent } from './cursos/cursos-layout/cursos-layout.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdministradorRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    QRCodeModule
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
    PerfilComponent,
    ModalP,
    CursosLayoutComponent
  ],
  entryComponents:[MateriasComponent,Modal,ModalP],
  providers:[AdministradorService]
})
export class AdministradorModule { }
