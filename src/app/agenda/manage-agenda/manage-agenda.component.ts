import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FullCalendarComponent, CalendarOptions } from '@fullcalendar/angular';

@Component({
  selector: 'app-manage-agenda',
  templateUrl: './manage-agenda.component.html',
  styleUrls: ['./manage-agenda.component.css']
})
export class ManageAgendaComponent implements OnInit {

   // references the #calendar in the template
   @ViewChild('calendar') calendarComponent: FullCalendarComponent;

   calendarOptions: CalendarOptions = {
    editable: true,
     initialView: 'timeGridWeek',
     headerToolbar: {
       left: 'prev,next today',
       center: 'title',
       right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
      },
     locale: 'fr',
     slotDuration: '00:30 ', // 2 hours
     dateClick: this.handleDateClick.bind(this), // bind is important!
     events: [
      { title: 'event 1', date: '2020-12-25' },
      { title: 'event 1', date: '2020-12-25' },
      { title: 'event 1', date: '2020-12-25' },
      { title: 'event 1', date: '2020-12-25' },
      { title: 'event 1', date: '2020-12-25' },
      { title: 'event 1', date: '2020-12-25' },
      { title: 'event 2', date: '2020-12-25' }
      
    ]
   };
 
  someMethod() {
     let calendarApi = this.calendarComponent.getApi();
     calendarApi.next();
   }

  handleDateClick(arg) {
    console.log('arg : ', arg);
    alert('date click! ' + arg.dateStr)

    
     // this.dialog.open(DialogElementsExampleDialog);
    
  }

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  

}