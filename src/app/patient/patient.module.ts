import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNewPatientComponent } from './add-new-patient/add-new-patient.component';
import { ManagePatientComponent } from './manage-patient/manage-patient.component';
import { PatientService } from '../service/patient.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { UpdatePatientComponent } from './update-patient/update-patient.component';


@NgModule({
  declarations: [AddNewPatientComponent, ManagePatientComponent, UpdatePatientComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [PatientService,
  ],
  exports: [AddNewPatientComponent]
})
export class PatientModule { }
