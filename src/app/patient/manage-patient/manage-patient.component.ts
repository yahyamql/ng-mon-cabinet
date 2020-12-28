import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PatientService } from 'src/app/service/patient.service';
import Swal  from 'sweetalert2/dist/sweetalert2.js';


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
  title: 'Supprimer ce patient ?' + id,
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
        'Patient suuprimé avec succés.',
        'success');
      this.getAllPatient();

    });
  }
})
}

}
