import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './login/login.component';
import { AddNewPatientComponent } from './patient/add-new-patient/add-new-patient.component';
import { PatientModule } from './patient/patient.module';
import { RouterModule } from '@angular/router';
import { AgendaModule } from './agenda/agenda.module';
import { MaterialModule } from './material/material.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './service/interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    PatientModule,
    RouterModule,
    AgendaModule,
    MaterialModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}
  ],
  bootstrap: [AppComponent],
  exports: [AddNewPatientComponent]
})
export class AppModule { }
