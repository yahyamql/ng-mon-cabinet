import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventInput } from '@fullcalendar/core';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Patient } from 'src/app/model/Patient.model';
import { Seance } from 'src/app/model/Seance.model';
import { PatientService } from 'src/app/service/patient.service';
import { AgendaService } from '../agenda.service';

@Component({
  selector: 'app-update-seance',
  templateUrl: './update-seance.component.html',
  styleUrls: ['./update-seance.component.css']
})
export class UpdateSeanceComponent implements OnInit {
  eventJson: EventInput;
  isConfirm: boolean;
  seance: Seance;
  myForm: FormGroup;
  filteredOptions: Observable<Patient[]>;
  options: Patient[] = [];
  keyword: String;
  isExist = false;
  constructor(@Inject(MAT_DIALOG_DATA) public dataPassed: EventInput,
              private agendaService: AgendaService,
              private patientSerivce: PatientService) {}
              
  ngOnInit() {
    this.eventJson = this.dataPassed.toPlainObject();
    console.log('dataPassed:', this.dataPassed);
    this.myForm = new FormGroup({
      'confirmInput': new FormControl(this.eventJson.extendedProps.confirm),
      'commentInput': new FormControl(this.eventJson.extendedProps.comment),
      'searchInput': new FormControl("", [Validators.required, this.isPatientExists.bind(this)]),
    });
    this.patientSerivce.get(this.eventJson.extendedProps.idPatient).subscribe((patient: Patient)=> {
      console.log('patient', patient);
      this.myForm.get('searchInput').setValue(patient);
      //this.displayFn(patient);
    });
  }

  onSearch(event: any) {
    if(event.target.value != this.keyword) {
      this.keyword = event.target.value;
      this.filteredOptions = 
      this.agendaService.getPatientByKeyword(this.keyword).pipe(
        map((e: Patient[])=> {
          return e;
        }));
      }
    }

  onDelete() {
    this.dataPassed.remove();
  }

  //TODO UPDATE
  onUpdate() {
    this.dataPassed.setExtendedProp('idPatient', this.myForm.get('searchInput').value.id);
    this.dataPassed.setExtendedProp('comment', this.myForm.get('commentInput').value);
    this.dataPassed.setExtendedProp('confirm', this.myForm.get('confirmInput').value);
    console.log('this.dataPassed', this.dataPassed.toPlainObject());
  }

  displayFn(patient: Patient): string {
    return patient && patient.firstName ? patient.firstName + ' ' + patient.lastName : '';
  }

   isPatientExists(control: FormControl): {[s: string]: boolean} {
    if(control.value instanceof Object) {
      return null;
    } else {
      return {'exist': true};
    }
  } 
}
