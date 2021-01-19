import { DatePipe } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Patient } from 'src/app/model/Patient.model';
import { PatientService } from 'src/app/service/patient.service';
import { FAMILY_SITUATION } from 'src/app/shared/Constants';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-patient',
  templateUrl: './update-patient.component.html',
  styleUrls: ['./update-patient.component.css']
})
export class UpdatePatientComponent implements OnInit {
  pipe = new DatePipe('en-US');
  familySituation = FAMILY_SITUATION;
  patient: Patient;
  dateBirthForm = new FormControl(new Date());;
  constructor(@Inject(MAT_DIALOG_DATA) public dataPassed: Patient,
             private patientService: PatientService) {}
  ngOnInit() {
    this.patient=this.dataPassed;
    this.dateBirthForm.setValue(new Date(this.patient.dateBirth));
  }

  onSubmit() {
    this.patient.dateBirth = this.dateBirthForm.value;
    this.patientService.update(this.patient).subscribe((data)=> {
      console.log(data);
      Swal.fire({
        icon: 'success',
        title: 'Patient modifié avec succés',
        showConfirmButton: false,
        timer: 1500
      })
    },err=> {
      Swal.fire({
        icon: 'error',
        title: 'saisi incorrect',
        text: 'Something went wrong!',
      })
    });
  }
}