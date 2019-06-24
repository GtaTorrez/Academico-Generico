// Modules
import { FormsModule, ReactiveFormsModule }    from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { CommonModule }              from '@angular/common'
import { NgModule }                   from '@angular/core'
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { MaterialModule }             from './material.module'
import { AppRoutes }                  from './app.routes'
import { DashboardModule }            from './dashboard/dashboard.module'
// Components
import { AppComponent }           from './app.component'
// Services
import { ConfigService }             from './services/config.service'

import { DataService }               from '../login/data.service'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    DashboardModule,
    AppRoutes,
    CommonModule,
    LoadingBarHttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    DataService,
    ConfigService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
