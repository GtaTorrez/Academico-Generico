// Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule }        from '@angular/core';
import { CommonModule }    from '@angular/common';
import { MaterialModule }  from '../../material.module';
import { HistorialRoutes }      from './historial.routes';
// Components
import { HistorialComponent }   from './historial.component';
// Services
import { DataService }    from '../../../login/data.service';
import { ConfigService }  from '../../services/config.service';
import { HistorialService }  from './historial.service';

@NgModule({
  imports: [
    HistorialRoutes,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    HistorialComponent
  ],
  providers: [
    DataService,
    ConfigService,
    HistorialService
  ]
})
export class HistorialModule {}
