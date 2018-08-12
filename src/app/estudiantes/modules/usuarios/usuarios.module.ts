// Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule }        from '@angular/core';
import { CommonModule }    from '@angular/common';
import { MaterialModule }  from '../../material.module';
import { UsuariosRoutes }      from './usuarios.routes';
// Components
import { UsuariosComponent }    from './usuarios.component';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
// Services
import { AuthService }     from '../../services/auth.service';
import { GuardService }    from '../../services/guard.service';
import { DataService }     from '../../services/data.service';
import { ConfigService }   from '../../services/config.service';
import { UsuariosService } from './usuarios.service';

@NgModule({
  entryComponents: [
    UsuariosComponent,
    UsuarioFormComponent
  ],
  imports: [
    UsuariosRoutes,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    UsuariosComponent,
    UsuarioFormComponent
  ],
  providers: [
    DataService,
    ConfigService,
    AuthService,
    GuardService,
    UsuariosService
  ]
})
export class UsuariosModule {}
