import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Patient } from 'src/app/model/Patient.model';
import { PatientService } from 'src/app/service/patient.service';
import { FAMILY_SITUATION } from 'src/app/shared/Constants';

@Component({
  selector: 'app-consult-patient',
  templateUrl: './consult-patient.component.html',
  styleUrls: ['./consult-patient.component.css']
})
export class ConsultPatientComponent implements OnInit {
  pipe = new DatePipe('en-US');
  familySituation = FAMILY_SITUATION;
  patient: Patient;
  dateBirthForm = new FormControl(new Date());;
  constructor(@Inject(MAT_DIALOG_DATA) public dataPassed: Patient,
    private patientService: PatientService) { }

  ngOnInit() {
    this.patient = this.dataPassed;
    this.dateBirthForm.setValue(new Date(this.patient.dateBirth));
  }

}
