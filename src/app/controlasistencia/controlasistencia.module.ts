import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ControlasistenciaRoutingModule } from './controlasistencia-routing.module';
import { PerfilAsistenciaComponent } from './perfil-asistencia/perfil-asistencia.component';
import { AsistenciaService } from './asistencia.service';
import { HttpClientModule } from '@angular/common/http';
import { NgxQRCodeModule } from 'ngx-qrcode2';

import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { ConfigAsistenciaComponent } from './config-asistencia/config-asistencia.component';

const config:SocketIoConfig={url:'http://192.168.0.100:1338' ,options:{}};


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    NgxQRCodeModule,
    ControlasistenciaRoutingModule,
    SocketIoModule.forRoot(config)
  ],
  declarations: [PerfilAsistenciaComponent, ConfigAsistenciaComponent],
  providers:[AsistenciaService]
})
export class ControlasistenciaModule { }
