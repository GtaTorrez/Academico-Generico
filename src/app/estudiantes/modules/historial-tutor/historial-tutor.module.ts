// Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule }        from '@angular/core';
import { CommonModule }    from '@angular/common';
import { MaterialModule }  from '../../material.module';
import { HistorialTutorRoutes }      from './historial-tutor.routes';
// Components
import { HistorialTutorComponent }   from './historial-tutor.component';
// Services
import { DataService }      from '../../../login/data.service';
import { ConfigService }    from '../../services/config.service';
import { HistorialTutorService } from './historial-tutor.service';

@NgModule({
  imports: [
    HistorialTutorRoutes,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    HistorialTutorComponent
  ],
  providers: [
    DataService,
    ConfigService,
    HistorialTutorService
  ]
})
export class HistorialTutorModule {}
