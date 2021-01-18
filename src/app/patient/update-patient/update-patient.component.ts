import { Component, Inject, OnInit } from '@angular/core';
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
  familySituation = FAMILY_SITUATION;
  patient: Patient = new Patient();
  constructor(@Inject(MAT_DIALOG_DATA) public dataPassed: any,
    private patientService: PatientService) { }

  ngOnInit() {
  console.log("dataPassed is complete",this.dataPassed)
      this.patient=this.dataPassed;
  }
 
  onSubmit() {
    console.log('updatePatient : ', this.patient);
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
