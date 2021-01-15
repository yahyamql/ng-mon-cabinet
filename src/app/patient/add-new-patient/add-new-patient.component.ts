import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/model/Patient.model';
import { PatientService } from 'src/app/service/patient.service';
import { FAMILY_SITUATION } from 'src/app/shared/Constants';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-new-patient',
  templateUrl: './add-new-patient.component.html',
  styleUrls: ['./add-new-patient.component.css']
})
export class AddNewPatientComponent implements OnInit {
  familySituation = FAMILY_SITUATION;
  patient: Patient = new Patient();

  constructor(private patientService: PatientService) { }

  ngOnInit() {}
 
  onSubmit() {
    console.log('insertPatient : ', this.patient);
    this.patientService.insert(this.patient).subscribe((data)=> {
      console.log(data);
      Swal.fire({
        icon: 'success',
        title: 'Patient enregistré avec succés',
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
