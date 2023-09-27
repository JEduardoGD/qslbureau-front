import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QslCapturaComponent } from './qsl-captura/qsl-captura.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { DataTablesModule } from "angular-datatables";
import { ConsolidateSlotsComponent } from './consolidate-slots/consolidate-slots.component';
import { ConsolidateSlotsService } from './consolidate-slots.service';
import { SelectLocalComponent } from './select-local/select-local.component';

@NgModule({
  declarations: [
    AppComponent,
    QslCapturaComponent,
    LoginComponent,
    LogoutComponent,
    ConsolidateSlotsComponent,
    SelectLocalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot(),
    DataTablesModule
  ],
  providers: [ConsolidateSlotsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
