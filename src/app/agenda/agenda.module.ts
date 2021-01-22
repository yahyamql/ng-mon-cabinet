import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageAgendaComponent } from './manage-agenda/manage-agenda.component';
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import listPlugin from '@fullcalendar/list'; // a plugin
//import interactionPlugin from '@fullcalendar/'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin
import timeGridPlugin  from '@fullcalendar/timegrid'; // a plugin
import { MaterialModule } from '../material/material.module';
import { AddSeanceComponent } from './add-seance/add-seance.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgendaService } from './agenda.service';
import { UpdateSeanceComponent } from './update-seance/update-seance.component';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  timeGridPlugin,
  listPlugin,
]);
@NgModule({
  declarations: [ManageAgendaComponent, AddSeanceComponent, UpdateSeanceComponent],
  imports: [
    CommonModule,
    FullCalendarModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [ManageAgendaComponent],
  providers:  [AgendaService]
})
export class AgendaModule { }
