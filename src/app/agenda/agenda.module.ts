import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageAgendaComponent } from './manage-agenda/manage-agenda.component';
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
//import interactionPlugin from '@fullcalendar/'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin
import timeGridPlugin  from '@fullcalendar/timegrid'; // a plugin
import { MaterialModule } from '../material/material.module';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  timeGridPlugin 
]);


@NgModule({
  declarations: [ManageAgendaComponent],
  imports: [
    CommonModule,
    FullCalendarModule,
    MaterialModule
  ],
  exports: [ManageAgendaComponent]
})
export class AgendaModule { }
