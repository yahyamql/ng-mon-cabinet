import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AgendaService } from 'src/app/agenda/agenda.service';
import { Patient } from 'src/app/model/Patient.model';
import { Seance } from 'src/app/model/Seance.model';
import { FAMILY_SITUATION } from '../Constants';

export interface SeanceData {
  date: string;
  time: string;
  firstName: string;
  lastName: string;
  subject: string;
}

@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.css']
})
export class DialogContentComponent implements OnInit {
  pipe = new DatePipe('en-US');
  familySituation = FAMILY_SITUATION;
  patient: Patient;
  dateBirthForm = new FormControl(new Date());;

  ELEMENT_DATA = [];
  displayedColumns: string[] = ['dateSeance', 'comment','confirm'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(@Inject(MAT_DIALOG_DATA) public dataPassed: any,
   public seanceService: AgendaService, datePipe: DatePipe) {
  }

  ngOnInit() {
    this.patient = this.dataPassed;
    this.dateBirthForm.setValue(new Date(this.patient.dateBirth));
    this.seanceService.getSeanceByPatientID(this.patient.id).subscribe((result: any) => {
      console.log("get list Seance for patient:", result);
      this.dataSource = new MatTableDataSource(result);
    });
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
 

}
