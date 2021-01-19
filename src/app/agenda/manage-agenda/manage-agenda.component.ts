import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FullCalendarComponent, CalendarOptions, EventApi } from '@fullcalendar/angular';
import { SeanceComponent } from '../seance/seance.component';
import frLocale from '@fullcalendar/core/locales/fr';
import { Seance } from 'src/app/model/Seance.model';
import { AgendaService } from '../agenda.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-manage-agenda',
  templateUrl: './manage-agenda.component.html',
  styleUrls: ['./manage-agenda.component.css']
})

export class ManageAgendaComponent implements OnInit {
  seance = new Seance();
   // references the #calendar in the template
   @ViewChild('calendar') calendarComponent: FullCalendarComponent;

    calendarOptions: CalendarOptions = {
    titleFormat: { // will produce something like "Tuesday, September 18, 2018"
    month: 'long',
    year: 'numeric',
    day: 'numeric',
    weekday: 'long'
  },
    locale: frLocale,
    editable: true,
    selectable: true,
    height: "auto",
    nowIndicator: true,
    dayMaxEvents: true,
    weekNumbers: true,
    
    initialView: 'timeGridWeek',
     
    navLinks: true, // can click day/week names to navigate views
    headerToolbar: {
       left: 'prev,next today',
       center: 'title',
       right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
      },
    slotDuration: '00:30 ', // 2 hours
    dateClick: this.onDateClick.bind(this), // bind is important!
    /* events: [
      { title: 'event-test 1', date: '2020-12-15' },
      { title: 'event 2', date: '2020-12-20' }], */
   };
 
  someMethod() {
     let calendarApi = this.calendarComponent.getApi();
     calendarApi.next();
   }
  onEventClick(arg) {
    console.log('handleEventClick : ', arg);
  }
  onDateClick(arg) {
    //console.log('arg : ', arg);
      this.seance.dateSeance = arg.dateStr;
      const dialogRef = this.dialog.open(SeanceComponent, 
        {data: this.seance});
      dialogRef.afterClosed().subscribe((result: boolean) => {
        if(result) {
          this.calendarComponent.getApi().addEvent(
            { title: this.seance.patient.firstName + ' ' + this.seance.patient.lastName,
             date: this.seance.dateSeance + '',
             extendedProps: {
              comment: this.seance.comment
            },
            })
          console.log('this.seance : ', this.seance)
          this.agendaService.insert(this.seance).subscribe((res)=> console.log('seance inserted : ', res));
          console.log('this.calendarComponent.getApi().getEvents() : ', 
            this.calendarComponent.getApi().getEvents());
      
            console.log('this.calendarComponent.getApi().getEventSources() : ', 
            this.calendarComponent.getApi().getEventSources());

        }
      });

      
  }

  constructor(public dialog: MatDialog,
    private agendaService: AgendaService) { }

  ngOnInit() {
  }

  
}