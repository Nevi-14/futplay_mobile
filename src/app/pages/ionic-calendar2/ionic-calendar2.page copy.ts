import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CalendarMode } from 'ionic2-calendar/calendar';
import { ControlReservacionesService } from 'src/app/services/control-reservaciones.service';
import { GenerarReservacionService } from 'src/app/services/generar-reservacion.service';

@Component({
  selector: 'app-ionic-calendar2',
  templateUrl: './ionic-calendar2.page.html',
  styleUrls: ['./ionic-calendar2.page.scss'],
})
export class IonicCalendar2Page implements OnInit {
  @Input() cancha: any
  calendar = {
    mode: 'month' as CalendarMode
};
viewTitle: string
retornarHoras = {
  time12_Hora_Inicio : '',
  time12_Hora_Fin: '',
  Fecha : new Date(),
  Hora_Inicio:'',
  Hora_Fin:''
}
markDisabled = (date: Date) => {
  var current = new Date();
  return date < current;
};

horaFin = '';

  constructor(
    public modalCtrl: ModalController,
    public controlReservacionesService: ControlReservacionesService,
    public generarReservacionesService: GenerarReservacionService
  ) { }

  ngOnInit() {
    console.log(this.retornarHoras.Fecha,  this.cancha, ' report')
 

  }
  onViewTitleChanged(title){
    this.viewTitle = title;
  }
  onCurrentDateChanged(selectedDate) {

    this.retornarHoras.Fecha = selectedDate;

    this.generarReservacionesService.generarReservacion(  this.cancha.Cod_Cancha,selectedDate);

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

  continuar(){
    this.modalCtrl.dismiss({
      'fechaHora':this.retornarHoras});

  }
}
