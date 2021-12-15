import { Component, Input, OnInit, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import { CalendarComponent } from 'ionic2-calendar';

import { OpcionesService } from 'src/app/services/opciones.service';
import { ReservacionesService } from '../../services/reservaciones.service';
import { EquiposService } from '../../services/equipos.service';
@Component({
  selector: 'app-calendario',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarioComponent implements OnInit {
  eventSource = this.retosService.eventos;
  viewTitle: string;
  calendarMode: any = 'month'
  calendar = {
    mode: this.calendarMode,
    currentDate: new Date(),
  }
  event = {
    title: '',
    desc:'test',
    startTime:null,
    endTime:null,
    allDay: false,
    date: new Date()
  }
  myDate: String = new Date().toISOString();
  minTime = '06:00';
  maxTime = '19:00';
  hourValues = ['08','09','10','11','12','13','14','15','16','17','18','19'];
  selectedDate: Date;
  @ViewChild(CalendarComponent) myCal: CalendarComponent;
  constructor( public retosService: ReservacionesService, public clubs: EquiposService, public opcionesService: OpcionesService) { }

  ngOnInit() {
 
  }

  onTimeSelected(ev){
 
   this.event.date = new Date(ev.selectedTime)
  }
add(){
  this.retosService.guardar = !this.retosService.guardar;
}

  agregarEvento(){

 this.event.title = this.retosService.rival1.nombre +' '+ 'VS' +' '+this.retosService.rival2.nombre;
      this.event.startTime =  new Date(this.event.date.getFullYear(), this.event.date.getMonth(), this.event.date.getDate(), new Date(this.event.startTime).getHours())
      this.event.endTime = new Date(this.event.date.getFullYear(), this.event.date.getMonth(), this.event.date.getDate(), new Date(this.event.endTime).getHours())
  

      this.retosService.eventos.push(this.event)
      this.retosService.rival1 = null 
      this.retosService.rival2 = null
      this.myCal.loadEvents();
      this.event = {
        title: '',
        desc:'',
        startTime:null,
        endTime:null,
        allDay: false,
        date: new Date()
      }
      this.retosService.guardar = false;
      
  }

  next(){
this.myCal.slideNext();
  }
  back(){
    this.myCal.slidePrev()
  }

  onViewTitleChanged(title){
    this.viewTitle = title;
  }





removeEvents(){
  this.eventSource = [];
}

}
