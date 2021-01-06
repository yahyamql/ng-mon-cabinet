import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FullCalendarComponent, CalendarOptions, EventApi } from '@fullcalendar/angular';
import { SeanceComponent } from '../seance/seance.component';
import { FormControl } from '@angular/forms';
import frLocale from '@fullcalendar/core/locales/fr';
import { Subject } from 'rxjs';
import { Patient } from 'src/app/model/Patient.model';
import { Seance } from 'src/app/model/Seance.model';
import { AgendaService } from '../agenda.service';

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
     dateClick: this.handleDateClick.bind(this), // bind is important!
     events: this.seances
   };
 
  someMethod() {
     let calendarApi = this.calendarComponent.getApi();
     calendarApi.next();
   }

  handleDateClick(arg) {
    console.log('arg : ', arg);
      this.seance.dateSeance = arg.dateStr;
      const dialogRef = this.dialog.open(SeanceComponent, 
        {data: this.seance});
      dialogRef.afterClosed().subscribe((result: boolean) => {
        if(result) {
          this.calendarComponent.getApi().addEvent(
            { title: this.seance.patient.firstName + ' ' + this.seance.patient.lastName,
             date: this.seance.dateSeance + '' })
          this.calendarComponent.getApi().addEvent({ title: 'event 3', date: '2021-01-07' })
          console.log('this.seance : ', this.seance)
          this.agendaService.insert(this.seance).subscribe((res)=> console.log('seance inserted : ', res));

        }
    console.log('dataPassedToSeance : ', this.seance);
      });
  }

  constructor(public dialog: MatDialog,
    private agendaService: AgendaService) { }

  ngOnInit() {
  }

  
}