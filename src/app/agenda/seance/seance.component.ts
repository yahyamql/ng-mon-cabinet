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
  myForm: FormGroup;
  filteredOptions: Observable<Patient[]>;
  options: Patient[] = [];
  keyword: String;
  constructor(@Inject(MAT_DIALOG_DATA) public dataPassed: any,
              private agendaService: AgendaService) {}

              
  ngOnInit() {
    this.myForm = new FormGroup( {
      'confirmInput': new FormControl(null),
      'comentInput': new FormControl(null),
      'searchInput': new FormControl(null),
    })
    
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

  onCreate() {
    this.dataPassed.patient = this.myForm.get('searchInput').value;
  }

  displayFn(patient: Patient): string {
    return patient && patient.firstName ? patient.firstName + ' ' + patient.lastName : '';
  }

  onChangeConfirm() {
    this.isConfirm = this.myForm.get('confirmInput').value;
  }
}