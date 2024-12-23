import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { Patient } from 'src/app/model/Patient.model';
import { Seance } from 'src/app/model/Seance.model';
import { AgendaService } from '../agenda.service';
@Component({
  selector: 'app-add-seance',
  templateUrl: './add-seance.component.html',
  styleUrls: ['./add-seance.component.css']
})
export class AddSeanceComponent implements OnInit {
  isConfirm: boolean;
  seance: Seance;
  myForm: FormGroup;
  filteredOptions: Observable<Patient[]>;
  options: Patient[] = [];
  keyword: String;
  isExist = false;
  constructor(@Inject(MAT_DIALOG_DATA) public dataPassed: any,
              private agendaService: AgendaService) {}
              
  ngOnInit() {
    console.log('dataPassed:', this.dataPassed);
    
    this.myForm = new FormGroup({
      'confirmInput': new FormControl(null),
      'commentInput': new FormControl(null),
      'searchInput': new FormControl(null, [Validators.required, this.isPatientExists.bind(this)]),
    })}

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

  onCreate() {
    this.dataPassed.event = {
      start: this.dataPassed.date,
      title: this.myForm.get('searchInput').value.firstName + ' ' +
      this.myForm.get('searchInput').value.lastName,
      extendedProps : {
        patient: this.myForm.get('searchInput').value,
        idPatient : this.myForm.get('searchInput').value.id,
        comment : this.myForm.get('commentInput').value,
        confirm : this.myForm.get('confirmInput').value,
      }
    }

   /*  this.dataPassed.event.extendedProps.patient = this.myForm.get('searchInput').value;
    this.dataPassed.event.extendedProps.idPatient = this.myForm.get('searchInput').value.id;
    this.dataPassed.event.extendedProps.comment = this.myForm.get('commentInput').value;
    this.dataPassed.event.extendedProps.confirm = this.myForm.get('confirmInput').value;
    this.dataPassed.event.title = this.myForm.get('searchInput').value.firstName + ' ' +
                            this.myForm.get('searchInput').value.lastName; */
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