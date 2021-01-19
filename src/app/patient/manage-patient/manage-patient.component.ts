import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Patient } from 'src/app/model/Patient.model';
import { PatientService } from 'src/app/service/patient.service';
import { DialogContentComponent } from 'src/app/shared/dialog-content/dialog-content.component';
import Swal  from 'sweetalert2/dist/sweetalert2.js';
import { AddNewPatientComponent } from '../add-new-patient/add-new-patient.component';
import { UpdatePatientComponent } from '../update-patient/update-patient.component';


@Component({
  selector: 'app-manage-patient',
  templateUrl: './manage-patient.component.html',
  styleUrls: ['./manage-patient.component.css']
})
export class ManagePatientComponent implements OnInit {
  ELEMENT_DATA = [];
  displayedColumns: string[] = ['firstName', 'lastName','tel', 'dateCreation', 'action'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  
  openDialog() {
    const dialogRef = this.dialog.open(DialogContentComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  addNewPatient() {
    const dialogRef = this.dialog.open(AddNewPatientComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(result) {this.getAllPatient();}
    });
  }

  updatePatient(id: number) {
    this.patientService.get(id).subscribe((result: Patient) => {
      console.log("get patient for update:",result);
        const dialogRef = this.dialog.open(UpdatePatientComponent,  {data:result});
        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
          if(result) {this.getAllPatient();}
        });
    });
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(private patientService: PatientService,
              private dialog: MatDialog
    ) { }

  ngOnInit() {
    this.patientService.getAll().subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

getAllPatient() {
    this.patientService.getAll().subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

deletePatient(id: number) {
  Swal.fire({
    title: 'Supprimer ce patient ?',
    text: "Attention : toutes ses données seront perdues !",
    icon: 'warning',
    showCancelButton: true,
    //confirmButtonColor: '#3085d6',
    //cancelButtonColor: '#d33',
    confirmButtonText: 'Supprimer'
  }).then((result) => {
    if (result.isConfirmed) {
      this.patientService.delete(id).subscribe(data=> {
        Swal.fire(
          'Supprimé !',
          'Patient supprimé avec succés.',
          'success');
        this.getAllPatient();
      });
    }
  })
}

}
