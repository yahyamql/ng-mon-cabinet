import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PatientService } from 'src/app/service/patient.service';



@Component({
  selector: 'app-manage-patient',
  templateUrl: './manage-patient.component.html',
  styleUrls: ['./manage-patient.component.css']
})
export class ManagePatientComponent implements OnInit {
  ELEMENT_DATA = [];
  displayedColumns: string[] = ['id', 'firstName', 'lastName','tel', 'dateCreation', 'action'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(private patientService: PatientService) { }

  ngOnInit() {
    this.patientService.getAll().subscribe((data: any)=> {
      this.dataSource = new MatTableDataSource(data);
    })
  }

}
