import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonDatetime, ModalController } from '@ionic/angular';
import { format } from 'date-fns';
import { CalendarComponent } from 'ionic2-calendar';
import { CalendarMode, Step } from 'ionic2-calendar/calendar';
import { HorarioCanchas } from 'src/app/models/horarioCanchas';
import { PerfilCancha } from 'src/app/models/perfilCancha';
import { AlertasService } from 'src/app/services/alertas.service';
import { CanchasService } from 'src/app/services/canchas.service';
import { ReservacionesService } from 'src/app/services/reservaciones.service';
import { HorarioCanchasService } from '../../services/horario-canchas.service';

@Component({
  selector: 'app-calendario-cancha',
  templateUrl: './calendario-cancha.page.html',
  styleUrls: ['./calendario-cancha.page.scss'],
})
export class CalendarioCanchaPage implements OnInit {
  @ViewChild(IonDatetime, { static: true }) datetime: IonDatetime;
  @ViewChild(CalendarComponent) myCal: CalendarComponent
  @Input() cancha:PerfilCancha;
  add:boolean = false;
  isToday:boolean;
  calendar = {
      mode: 'month' as CalendarMode,
      step: 30 as Step,
      currentDate:new Date(),
      Date: new Date()
  };
  dayEventSource = [];
  eventSource = [];
  viewTitle: string
  fecha:any = null;
  diaActual: HorarioCanchas
  horario:any = null;
  habilitarHoras = false;
  constructor(
public modalCtrl:ModalController,
private cd: ChangeDetectorRef,
public gestionReservacionesService: ReservacionesService,
public alertasService: AlertasService,
public horarioCanchasService: HorarioCanchasService,
public canchasService: CanchasService

  ) { }

  ngOnInit() {
  }
  cerrarModal(){
    this.modalCtrl.dismiss();
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
    this.cd.detectChanges();
    this.eventSource = [];
  
    }

    onCurrentDateChanged(event:Date) {

 
      var today = new Date();
      today.setHours(0, 0, 0, 0);
      event.setHours(0, 0, 0, 0);

  this.isToday = today.getTime() === event.getTime();
 this.calendar.Date = event
 // this.calendar.currentDate = event.toISOString().split('T')[0]
  this.fecha = event.toISOString().split('T')[0]
  this.cd.markForCheck();
  this.cd.detectChanges(); 
  this.checkAdd();
  this.reservacionesDia();

  }

  checkAdd(){
    if (this.isBeforeToday(this.calendar.Date)) {
      // selected date is in the past
  
      this.add = false;

     
    }else if(this.isTodayF(this.calendar.Date) ){
      this.add = true;
  
    }else{
      this.add = true;
      
    }
  }
  isTodayF(someDate)  {
    const today = new Date()
    return someDate.getDate() == today.getDate() &&
      someDate.getMonth() == today.getMonth() &&
      someDate.getFullYear() == today.getFullYear()
  }
  isBeforeToday(date) {
    const today = new Date();
  
    today.setHours(0, 0, 0, 0);
  
    return date < today;
  }

  reservacionesDia(){
 
    this.consultarHoras(this.cancha);
   
  
  }

  consultarHoras(cancha:PerfilCancha){

   //this.limpiarDatos();
   
  this.horarioCanchasService.syncGetHorarioCanchaToPromise(cancha.cancha.Cod_Cancha).then(resp =>{
  
    let  horario:HorarioCanchas[] = resp;
    this.gestionReservacionesService.horario = horario;
    let {continuar, diaActual} =  this.gestionReservacionesService.consultarHoras(horario,this.calendar.Date)
    this.diaActual = diaActual;
    this.horario = this.hora(this.diaActual.Hora_Inicio, this.diaActual.Hora_Fin)
    if(continuar){
      this.gestionReservacionesService.calHoraInicio(this.cancha.cancha.Cod_Cancha,new Date(format(this.calendar.Date, 'yyy/MM/dd')));
    }
   
  this.habilitarHoras = continuar
  this.cd.detectChanges()
  
       
  })
  
  
  
    
  }

  hora(inicio,fin){

    return this.canchasService.retornaHoraAmPm(inicio)  + ' - ' +this.canchasService.retornaHoraAmPm(fin);
   }
   swipeBack(){
    //this.lockSwipes = false;
    this.myCal.slidePrev();
    //  this.lockSwipes = true;
  }
  swipeNext(){
  //   this.lockSwipes = false;
    this.myCal.slideNext();
   // this.lockSwipes = true;
  }
   
}
