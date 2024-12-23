import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FullCalendarComponent, CalendarOptions, EventApi, EventInput } from '@fullcalendar/angular';
import { AddSeanceComponent } from '../add-seance/add-seance.component';
import frLocale from '@fullcalendar/core/locales/fr';
import { Seance } from 'src/app/model/Seance.model';
import { AgendaService } from '../agenda.service';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MatMenuTrigger } from '@angular/material/menu';
import { UpdateSeanceComponent } from '../update-seance/update-seance.component';

@Component({
  selector: 'app-manage-agenda',
  templateUrl: './manage-agenda.component.html',
  styleUrls: ['./manage-agenda.component.css']
})

export class ManageAgendaComponent implements OnInit {
  idEventToDelete ="";
   // references the #calendar in the template
   @ViewChild('calendar') calendarComponent: FullCalendarComponent;

   @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;

  contextMenuPosition = { x: '0px', y: '0px' };

    calendarOptions: CalendarOptions = {
      allDaySlot: false,
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
    slotMinTime: "08:00:00",
    slotMaxTime: "20:00:00",
    initialView: 'timeGridWeek',
    navLinks: true, // can click day/week names to navigate views
    headerToolbar: {
       left: 'prev,next today',
       center: 'title',
       right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
      },
    slotDuration: '00:15', // 2 hours
    dateClick: this.onDateClick.bind(this), // bind is important!
    eventClick: this.onEventClick.bind(this),
    eventChange:this.onEventChange.bind(this),
    eventRemove:this.onEventRemove.bind(this),
    eventAdd:this.onEventAdd.bind(this),
    events: environment.BASE_API + 'seance/' ,
    /* events: [
      { title: 'event-test 1', date: '2020-12-15' },
      { title: 'event 2', date: '2020-12-20' }], */
   };
 
  someMethod() {
     let calendarApi = this.calendarComponent.getApi();
     calendarApi.next();
  }

  //Update & Delete seance
  onEventClick(arg) {
    let event = arg.event;
    console.log('onEventClick : ', arg);
      const dialogRef = this.dialog.open(UpdateSeanceComponent, 
        {data: event});
      dialogRef.afterClosed().subscribe((result: boolean) => {
        if(result) {
            this.agendaService.insert(event).subscribe((res)=> console.log('seance inserted : ', res));
            this.calendarComponent.getApi().refetchEvents();
        }
      });
  }

  onEventAdd(arg) {
    console.log('onEventAdd : ', arg);
    //this.calendarComponent.getApi().refetchEvents();
    
  }
  onEventChange(arg) {
    this.agendaService.update(arg.event.toPlainObject()).subscribe(()=>{
      this.calendarComponent.getApi().refetchEvents();
    });
  }

  onEventRemove(arg) {
    this.agendaService.deleteSeance(arg.event.toPlainObject().id).subscribe(()=>{
      console.log('Event to delete : ', arg.event.toPlainObject().id);
      this.calendarComponent.getApi().refetchEvents();
    });
  }

  getAllSeance() {
    this.agendaService.getAll().subscribe((res: Array<any>)=> {
      res.forEach(element => {
        this.calendarComponent.getApi().addEvent(element);
      });
    })
  }

  //insert event
  onDateClick(arg) {
    let dataToPass = {date:arg.date, event: {}};
    console.log('arg.date', arg.date);
    
      const dialogRef = this.dialog.open(AddSeanceComponent, 
        {data: dataToPass});
      dialogRef.afterClosed().subscribe((result: boolean) => {
        if(result) {
          this.agendaService.insert(dataToPass.event).subscribe((res)=>{
            console.log('seance inserted : ', res)
            this.calendarComponent.getApi().refetchEvents();
          });
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