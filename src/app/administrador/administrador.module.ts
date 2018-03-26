import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdministradorRoutingModule } from './administrador-routing.module';
import { MenuComponent } from './menu/menu.component';
import { MateriasComponent,Modal } from './materias/materias.component';
import { ProfesoresComponent } from './profesores/profesores.component';
import { EstudiantesComponent,ModalP } from './estudiantes/estudiantes.component';
import { HorariosComponent } from './horarios/horarios.component';

import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AdministradorService } from './administrador.service';
import { CursosComponent } from './cursos/cursos.component';
import { NotasComponent } from './notas/notas.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PerfilComponent } from './perfil/perfil.component';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { CursosLayoutComponent } from './cursos-layout/cursos-layout.component';
import { MateriaComponent } from './profesores/materia/materia.component';
import { GradoComponent } from './cursos/grado/grado.component';
import { GrupoComponent } from './cursos/grupo/grupo.component';
import { TurnoComponent } from './cursos/turno/turno.component';
import { ParaleloComponent } from './cursos/paralelo/paralelo.component';
import { PeriodoComponent } from './cursos/periodo/periodo.component';
import { ListaCursosComponent } from './cursos-layout/lista-cursos/lista-cursos.component';
import { ModalAddCurso } from './cursos-layout/modalAddCurso/modalAddCurso.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdministradorRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    NgxQRCodeModule
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
    CursosLayoutComponent,
    MateriaComponent,
    GradoComponent,
    GrupoComponent,
    TurnoComponent,
    ParaleloComponent,
    PeriodoComponent,
    ListaCursosComponent,
    ModalAddCurso
  ],
  entryComponents : [MateriasComponent,Modal,ModalP,ModalAddCurso],
  providers       : [AdministradorService]
})
export class AdministradorModule { }
