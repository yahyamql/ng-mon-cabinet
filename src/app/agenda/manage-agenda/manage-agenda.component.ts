import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FullCalendarComponent, CalendarOptions, EventApi } from '@fullcalendar/angular';
import { SeanceComponent } from '../seance/seance.component';
import { FormControl } from '@angular/forms';
import frLocale from '@fullcalendar/core/locales/fr';
import { Subject } from 'rxjs';
import { Patient } from 'src/app/model/Patient.model';
import { Seance } from 'src/app/model/Seance.model';

@Component({
  selector: 'app-manage-agenda',
  templateUrl: './manage-agenda.component.html',
  styleUrls: ['./manage-agenda.component.css']
})

export class ManageAgendaComponent implements OnInit {
  seance = new Seance();

  seances = [
    { title: 'event 1', date: '2020-12-25' },
    { title: 'event 1', date: '2020-12-25' },
    { title: 'event 1', date: '2020-12-25' },
    { title: 'event 2', date: '2021-01-06' },
    
  ];

   // references the #calendar in the template
   @ViewChild('calendar') calendarComponent: FullCalendarComponent;

   calendarOptions: CalendarOptions = {
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
     dateClick: this.handleDateClick.bind(this), // bind is important!
     events: this.seances
   };
 
  someMethod() {
     let calendarApi = this.calendarComponent.getApi();
     calendarApi.next();
   }

  handleDateClick(arg) {
      this.seance.dateSeance = arg.dateStr;
      const dialogRef = this.dialog.open(SeanceComponent, 
        {data: this.seance});
      dialogRef.afterClosed().subscribe((result: boolean) => {
        if(result) {
          this.calendarComponent.getApi().addEvent({ title: this.seance.patient.firstName + '', date: this.seance.dateSeance + '' })
          this.calendarComponent.getApi().addEvent({ title: 'event 3', date: '2021-01-07' })
        }
    //    console.log(`Dialog result: ${result}`);
    //    console.log('dataPassedToSeance.currentDateTime : ', this.dataPassedToSeance.dateSeance);
   // console.log('dataPassedToSeance.fullName : ', this.dataPassedToSeance.patient.firstName);
    console.log('dataPassedToSeance : ', this.seance);
      });
  }

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  
}