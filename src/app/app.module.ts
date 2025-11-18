import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { SlotComponent } from './slot/slot.component';
import { SlotSendComponentComponent } from './slot-send-component/slot-send-component.component';
import { SlotDetailComponent } from './slot-detail/slot-detail.component';

// Interceptors
import { AuthInterceptorService } from 'src/conf/auth-interceptor-service.config';
import { AgrupadoresComponent } from './agrupadores/agrupadores.component';
import { FindIntlComponent } from './find-intl/find-intl.component';

@NgModule({
  declarations: [
    AppComponent,
    QslCapturaComponent,
    LoginComponent,
    LogoutComponent,
    ConsolidateSlotsComponent,
    SelectLocalComponent,
    SlotComponent,
    SlotSendComponentComponent,
    SlotDetailComponent,
    AgrupadoresComponent,
    FindIntlComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot(),
    DataTablesModule
  ],
  providers: [
    ConsolidateSlotsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
