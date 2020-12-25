import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageAgendaComponent } from './agenda/manage-agenda/manage-agenda.component';
import { AddNewPatientComponent } from './patient/add-new-patient/add-new-patient.component';
import { ManagePatientComponent } from './patient/manage-patient/manage-patient.component';

const routes: Routes = [
  {path: 'patient/add', component:AddNewPatientComponent},
  {path: 'patient', component:ManagePatientComponent},
  {path: 'agenda', component:ManageAgendaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
