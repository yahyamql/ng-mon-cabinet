import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Patient } from 'src/app/model/Patient.model';
import { Seance } from 'src/app/model/Seance.model';
import { AgendaService } from '../agenda.service';
@Component({
  selector: 'app-seance',
  templateUrl: './seance.component.html',
  styleUrls: ['./seance.component.css']
})
export class SeanceComponent implements OnInit {
  isConfirm: boolean;
  seance: Seance;
  myControl = new FormGroup({});
  searchPatientForm = new FormControl({});
  confirmForm = new FormControl({});
  filteredOptions: Observable<Patient[]>;
  options: Patient[] = [];
  keyword: String;
  constructor(@Inject(MAT_DIALOG_DATA) public dataPassed: any,
              private agendaService: AgendaService) {}

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
    this.dataPassed.fullName = this.myControl.value;
  }

  ngOnInit() {
     this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(value => {
       this.agendaService.getPatientByKeyword(value).subscribe((data: Patient[])=> {
        return  this.options = data;
        });
      }), map(()=>  {
        return this.options;
      })); 
  }

  displayFn(patient: Patient): string {
    return patient && patient.firstName ? patient.firstName + ' ' + patient.lastName : '';
  }

  onChangeConfirm() {
    this.isConfirm = this.confirmForm.value;
  }
}