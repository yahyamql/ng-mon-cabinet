import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/model/Patient.model';
import { PatientService } from 'src/app/service/patient.service';
@Component({
  selector: 'app-add-new-patient',
  templateUrl: './add-new-patient.component.html',
  styleUrls: ['./add-new-patient.component.css']
})
export class AddNewPatientComponent implements OnInit {

  patient: Patient = new Patient();

  constructor(private patientService: PatientService) { }

  ngOnInit() {
  }

  insertPatient() {
    console.log('insertPatient : ', this.patient);
    this.patientService.insert(this.patient).subscribe((data)=> {
      console.log(data);
      
    });
  }
}
