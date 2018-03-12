import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ControlasistenciaRoutingModule } from './controlasistencia-routing.module';
import { PerfilAsistenciaComponent } from './perfil-asistencia/perfil-asistencia.component';
import { AsistenciaService } from './asistencia.service';
import { HttpClientModule } from '@angular/common/http';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    NgxQRCodeModule,
    ControlasistenciaRoutingModule
  ],
  declarations: [PerfilAsistenciaComponent],
  providers:[AsistenciaService]
})
export class ControlasistenciaModule { }
