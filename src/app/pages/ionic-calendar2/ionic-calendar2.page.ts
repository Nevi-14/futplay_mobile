import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HorarioCanchas } from 'src/app/models/horarioCanchas';
import { ControlReservacionesService } from 'src/app/services/control-reservaciones.service';
import { format } from 'date-fns';
import { CalendarComponent } from 'ionic2-calendar';
import { GenerarReservacionService } from 'src/app/services/generar-reservacion.service';
import { LogicaReservacionService } from 'src/app/services/logica-reservacion.service';
interface objetoFecha{
  id:number,
  year: number,
  month: number,
  day: number,
  hours: number,
  minutes: number,
  seconds: number,
  milliseconds: number,
  time12: number,
  meridiem: string,
  date: Date
}
@Component({
  selector: 'app-ionic-calendar2',
  templateUrl: './ionic-calendar2.page.html',
  styleUrls: ['./ionic-calendar2.page.scss'],
})
export class IonicCalendar2Page implements OnInit {
  @Input() cancha: any
  show  = false;;
  viewTitle: string
  calendarMode: any = 'month'

  calendar = {
    mode: this.calendarMode,
    currentDate: new Date()
  }

  dateValue = format(new Date(), 'yyyy-MM-dd'); 
  reservationDate : Date = new Date();
 autoSelect: Boolean = false;
  selectedDay =  new Date();

  lockSwipes = false;

  currentDate = new Date();
  pastDate :Date;
  futureDate: Date;
  selectedDate: Date = new Date();
  modalDate: string;
  block = false; //If user clicks on a date that has already passed this value turns true
textoBuscar ='';
showSearchBar = true;
  @ViewChild(CalendarComponent) myCal: CalendarComponent;

retornarHoras = {
  time12_Hora_Inicio : '',
  time12_Hora_Fin: '',
  Fecha : new Date(),
  Hora_Inicio:null,
  Hora_Fin:null
}
horario:HorarioCanchas[] = [];
Hora_Inicio: any;
Hora_Fin: any;
markDisabled = (date: Date) => {
  var current = new Date();
  return date < current;
};



  constructor(
    public modalCtrl: ModalController,
    public controlReservacionesService: ControlReservacionesService,
    public generarReservacionesService: GenerarReservacionService,
    public logicaReservacionesService: LogicaReservacionService,
    public generarReservacionService: GenerarReservacionService,
  ) { }

  ngOnInit() {
    console.log(this.retornarHoras.Fecha,  this.cancha, ' report')
   

  }
  onViewTitleChanged(title){
    this.viewTitle = title;
  }
  onCurrentDateChanged(selectedDate) {

    this.retornarHoras.Fecha = selectedDate;
    this.generarReservacionService.syncHorarioCanchas( this.cancha.Cod_Cancha).then(resp =>{
      this.logicaReservacionesService.horaInicioArray = [];
      this.Hora_Inicio = null;
      this.Hora_Fin = null;
      this.horario = resp;
      let i = this.horario.findIndex(horario => horario.Cod_Dia ==  selectedDate.getDay()); 
      this.logicaReservacionesService.generarArregloHorasDisponibles(this.horario[i].Hora_Inicio, this.horario[i].Hora_Fin,selectedDate).then(resp =>{
        console.log(resp,'resp')
              this.logicaReservacionesService.horaInicioArray = resp;
        
            });
    })

}

slideNext() {
  this.myCal.slideNext();
}

slidePrev() {
this.myCal.slidePrev();
}
  cerrarModal(){

    this.modalCtrl.dismiss();
  }


  retornarHora($event){
let i = this.generarReservacionesService.horasdiaConsulta.findIndex(hora => hora.hora_inicio == $event.detail.value)
this.retornarHoras.Hora_Fin = this.generarReservacionesService.horasdiaConsulta[i].hora_fin
    console.log($event.detail.value,'horaa',i,'i')

    this.retornarHoras.time12_Hora_Inicio = this.generarReservacionesService.horasdiaConsulta[i].formato12
    this.retornarHoras.time12_Hora_Fin = this.generarReservacionesService.horasdiaConsulta[i].formatoFin12
  }
  horaInicio($event){
    const value:objetoFecha = $event.detail.value;
    console.log(value,'valuee')
    let i = this.horario.findIndex(horario => horario.Cod_Dia == this.retornarHoras.Fecha.getDay()); 
    this.retornarHoras.Hora_Inicio = value.date;
    this.Hora_Inicio = value;
    this.Hora_Fin = null;
    this.retornarHoras.Hora_Fin = null;
    this.logicaReservacionesService.horaFinArray = [];
    this.logicaReservacionesService.generarArregloHorasDisponibles(value.hours+1, Number(this.horario[i].Hora_Fin)+1,value.date).then(resp =>{
  
      this.logicaReservacionesService.horaFinArray = resp;
    });
  console.log(value)
  }
  
  horaFin($event){
    const value:objetoFecha = $event.detail.value;
    console.log('hora fin', value)
    this.Hora_Fin = value;
    this.retornarHoras.Hora_Fin = value.date;
  
  }
  continuar(){
    this.retornarHoras.Hora_Inicio = this.retornarHoras.Hora_Inicio.toISOString().split('T')[0]+' '+ this.retornarHoras.Hora_Inicio.toTimeString().split(' ')[0];
    this.retornarHoras.Hora_Fin = this.retornarHoras.Hora_Fin.toISOString().split('T')[0]+' '+ this.retornarHoras.Hora_Fin.toTimeString().split(' ')[0];
    this.modalCtrl.dismiss({
      'fechaHora':this.retornarHoras});

  }
}
