import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FullCalendarComponent, CalendarOptions, EventApi } from '@fullcalendar/angular';
import { SeanceComponent } from '../seance/seance.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-manage-agenda',
  templateUrl: './manage-agenda.component.html',
  styleUrls: ['./manage-agenda.component.css']
})
export class ManageAgendaComponent implements OnInit {
  dataPassedToSeance = {
    fullName: '',
    currentDateTime: ''
  };

   // references the #calendar in the template
   @ViewChild('calendar') calendarComponent: FullCalendarComponent;

   calendarOptions: CalendarOptions = {
     locale: 'fr',
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
   // console.log('arg : ', arg);
   //alert('date click! ' + arg.dateStr)
    this.onCreateSeance(arg.dateStr);
  }

  constructor(public dialog: MatDialog) { }

  ngOnInit() {}

  onCreateSeance(arg) {
    this.dataPassedToSeance.currentDateTime = arg;
    const dialogRef = this.dialog.open(SeanceComponent, 
      {data: this.dataPassedToSeance});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      console.log('dataPassedToSeance.currentDateTime : ', this.dataPassedToSeance.currentDateTime);
      console.log('dataPassedToSeance.fullName : ', this.dataPassedToSeance.fullName);
    });
  }
}