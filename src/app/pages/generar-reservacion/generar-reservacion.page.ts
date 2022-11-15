import { Component, ViewChild, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { IonDatetime, ModalController, PopoverController } from '@ionic/angular';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { HorarioCanchas } from 'src/app/models/horarioCanchas';
import { HorarioCanchasService } from 'src/app/services/horario-canchas.service';
 
import { AlertasService } from 'src/app/services/alertas.service';
import { ReservacionesService } from '../../services/reservaciones.service';
import { ListaCanchasPage } from '../lista-canchas/lista-canchas.page';
import { ListaEquiposPage } from '../lista-equipos/lista-equipos.page';
import { PerfilCancha } from '../../models/perfilCancha';
import { PerfilEquipos } from 'src/app/models/perfilEquipos';
import {  CalendarMode, Step } from 'ionic2-calendar/calendar';
import { CalendarComponent } from 'ionic2-calendar';
import { DetalleReservaciones } from 'src/app/models/detalleReservaciones';
import { format } from 'date-fns';
import { CanchasService } from '../../services/canchas.service';
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
  selector: 'app-generar-reservacion',
  templateUrl: './generar-reservacion.page.html',
  styleUrls: ['./generar-reservacion.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
  
})
export class GenerarReservacionPage  {
  @ViewChild(IonDatetime, { static: true }) datetime: IonDatetime;
  @Input() fecha: Date;
  @Input() cancha:PerfilCancha;
  @Input() diaCompleto 
  @Input()rival : PerfilEquipos;
  @Input()retador : PerfilEquipos;
  diaActual: HorarioCanchas
  horario:any = null;
  dateValue = '';
  dateValue2 = null;
  show = false;
  nuevaReservacion = {
    Cod_Cancha:  null,
    Cod_Usuario:  this.usuariosService.usuarioActual.usuario.Cod_Usuario,
    Reservacion_Externa: true,
    Titulo: '',
    Cod_Estado: 2,
    Fecha:  null,
    Hora_Inicio: null,
    Hora_Fin: null,
    Estado:  true,
    Dia_Completo:  false
   }
   detalleReservacion:DetalleReservaciones = {
    Cod_Detalle:null,
    Cod_Reservacion:  null,
    Cod_Estado:  3,
    Cod_Retador: null,
    Cod_Rival: null,
    Confirmacion_Rival:null,
    Luz:  null,
    Monto_Luz: 0,
    Total_Horas: 0,
    Precio_Hora:  0,
    Cod_Descuento:  null,
    Porcentaje_Descuento:  0,
    Monto_Descuento:  0,
    Porcentaje_Impuesto:  0,
    Monto_Impuesto:  0,
    Porcentaje_FP:  10,
    Monto_FP:  0,
    Monto_Equipo:  0,
    Monto_Sub_Total:  0,
    Monto_Total:  0,
    Pendiente:  0,
    Notas_Estado:  'Confirmacion Pendiente'
   }
   Hora_Inicio: any;
   Hora_Fin: any;
   valor = this.nuevaReservacion.Dia_Completo ? 'SI' : 'NO';
   viewTitle: string
   calendarMode: any = 'month'
   lockSwipes = false;
   @ViewChild(CalendarComponent) myCal: CalendarComponent
   column = 6;
   habilitarHoras = false;
   dayEventSource = [];
   eventSource = [];

   add:boolean = false;
   large:boolean;
   medium:boolean;
   BlockAddReservation:boolean = false;;
   small:boolean;
   alertChange:boolean = false;
   isToday:boolean;
   calendar = {
       mode: 'month' as CalendarMode,
       step: 30 as Step,
       currentDate: new Date(),
       Date: new Date(),
       dateFormatter: {
           formatMonthViewDay: function(date:Date) {
               return date.getDate().toString();
           },
           formatMonthViewDayHeader: function(date:Date) {
               return 'MonMH';
           },
           formatMonthViewTitle: function(date:Date) {
               return 'testMT';
           },
           formatWeekViewDayHeader: function(date:Date) {
               return 'MonWH';
           },
           formatWeekViewTitle: function(date:Date) {
               return 'testWT';
           },
           formatWeekViewHourColumn: function(date:Date) {
               return 'testWH';
           },
           formatDayViewHourColumn: function(date:Date) {
               return 'testDH';
           },
           formatDayViewTitle: function(date:Date) {
               return 'testDT';
           }
       }
   };
 
 
  constructor(
    public modalCtrl: ModalController,
    public usuariosService: UsuariosService,
    public popOverCtrl:PopoverController,
    public horarioCanchasService: HorarioCanchasService,
    private cd: ChangeDetectorRef,
    public gestionReservacionesService: ReservacionesService,
    public alertasService: AlertasService,
    public canchasService: CanchasService
  ) { }
  



  convertDate(dateValue) {
    var date = new Date(dateValue);
    let day =  date.getDate();
    let month = date.getMonth()+1;
    let year = date.getFullYear();
  
    return   year+'-'+month+'-'+day;
  
   
  }

  ionViewWillEnter(){

    this.fecha ? this.fecha = this.fecha :  this.fecha = new Date ();
    
console.log(this.fecha, 'fecha')
    this.nuevaReservacion.Cod_Cancha = this.cancha.cancha.Cod_Cancha;
    this.nuevaReservacion.Fecha = this.fecha.toISOString().split('T')[0];

    console.log('fecha',this.nuevaReservacion.Fecha)
    this.horarioCanchasService.horarioCancha = [];

    
 

   }

consultarHoras(cancha:PerfilCancha){

this.Hora_Inicio = null;
this.Hora_Fin = null;
this.nuevaReservacion.Hora_Inicio = null;
 this.nuevaReservacion.Hora_Fin = null;
this.gestionReservacionesService.horaInicioArray = [];
this.gestionReservacionesService.horaFinArray = [];
this.horarioCanchasService.syncGetHorarioCanchaToPromise(cancha.cancha.Cod_Cancha).then(resp =>{

  let  horario:HorarioCanchas[] = resp;
  this.gestionReservacionesService.horario = horario;
  let {continuar, diaActual} =  this.gestionReservacionesService.consultarHoras(horario,this.fecha)
  this.diaActual = diaActual;
  this.horario = this.hora(this.diaActual.Hora_Inicio, this.diaActual.Hora_Fin)
  if(continuar){
    this.gestionReservacionesService.calHoraInicio(this.cancha,this.fecha);
  }
 
this.habilitarHoras = continuar
this.cd.detectChanges()

     
})



  
}
   isBeforeToday(date) {
    const today = new Date();
  
    today.setHours(0, 0, 0, 0);
  
    return date < today;
  }
  
  isTodayF(someDate)  {
    const today = new Date()
    return someDate.getDate() == today.getDate() &&
      someDate.getMonth() == today.getMonth() &&
      someDate.getFullYear() == today.getFullYear()
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

  onViewTitleChanged(title) {
    this.viewTitle = title;
    this.eventSource = [];
  
    }
    slidePrev() {
      this.lockSwipes = false;
      this.cd.markForCheck();
      this.cd.detectChanges();
      this.myCal.slidePrev();
      setTimeout(() => {
     
        this.lockSwipes = true;
        this.cd.markForCheck();
        this.cd.detectChanges();
      
          }, 1000)
      
     
    }
    slideNext() {
      this.lockSwipes = false;
      this.cd.markForCheck();
      this.cd.detectChanges();
      this.myCal.slideNext();
      setTimeout(() => {
       
       this.lockSwipes = true;
       this.cd.markForCheck();
       this.cd.detectChanges();
          },1000)
    
    
    }
    
    changeMode(mode) {
    this.calendar.mode = mode;
    }
    
    onCurrentDateChanged(event:Date) {

      var today = new Date();
      today.setHours(0, 0, 0, 0);
      event.setHours(0, 0, 0, 0);
      this.isToday = today.getTime() === event.getTime();
  this.calendar.Date = event
  this.calendar.currentDate = event
  this.checkAdd();
      this.reservacionesDia();
   
  }
  
  disponibilidadCancha(cancha:PerfilCancha) {
    return  this.canchasService.disponibilidadCancha(cancha);
    
  }

  horarioCancha(cancha:PerfilCancha){
  return  this.canchasService.horarioCancha(cancha);
  }

   hora(inicio,fin){

    return this.canchasService.retornaHoraAmPm(inicio)  + ' - ' +this.canchasService.retornaHoraAmPm(fin);
   }
  
    reservacionesDia(){
      var date = new Date(this.calendar.currentDate);
      this.fecha = date;
      var firstDay = new Date(date.getFullYear(), date.getMonth(), 1).toISOString().slice(0,10);
      var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString().slice(0,10);
      this.consultarHoras(this.cancha);
     
    
    }


   async agregarRival() {
    const modal = await this.modalCtrl.create({
      component: ListaEquiposPage,
      cssClass: 'my-custom-modal',
      mode:'ios',
      componentProps:{
        rival:true
      }
    });

     await modal.present();
        const { data } = await modal.onDidDismiss();
     
         if(data !== undefined){
       
          this.rival = data.equipo;
          console.log('this.rival', this.rival)
             this.modalCtrl.dismiss();

             if(this.cancha != null && this.cancha != undefined){
              this.nuevaReservacion.Cod_Cancha = this.cancha.cancha.Cod_Cancha;
              this.cd.detectChanges();
              //this.horarioCancha();
            }

            
         }

  }



  async agregarRetador() {
    const modal = await this.modalCtrl.create({
      component: ListaEquiposPage,
      cssClass: 'my-custom-modal',
      mode:'ios',
      componentProps:{
        rival:false
      }
    });


     await modal.present();
     const { data } = await modal.onDidDismiss();
       console.log(data)
       if(data !== undefined){
         
          this.retador = data.equipo;
console.log('this.retador', this.retador)
             this.modalCtrl.dismiss();

             if(this.cancha != null && this.cancha != undefined){
              this.nuevaReservacion.Cod_Cancha = this.cancha.cancha.Cod_Cancha;
              this.cd.detectChanges();
             // this.horarioCancha();
            }
             
         }
  }




async agregarCancha() {
const modal = await this.modalCtrl.create({
  component: ListaCanchasPage,
  cssClass: 'my-custom-modal',
  mode:'ios'
});


 await modal.present();
 const { data } = await modal.onDidDismiss();
 
     if(data.cancha !== undefined){
     
      this.cancha = data.cancha;
      this.nuevaReservacion.Cod_Cancha = this.cancha.cancha.Cod_Cancha;
//      this.horarioCancha();

         this.modalCtrl.dismiss();
     }
}


 horaInicio($event){
  const value:objetoFecha = $event.detail.value;
if(value){
  this.nuevaReservacion.Hora_Inicio = value.date;
  this.Hora_Inicio = value;
  this.Hora_Fin = null;
  this.nuevaReservacion.Hora_Fin = null;
console.log( value)
  this.gestionReservacionesService.calHoraFin(this.cancha.cancha.Cod_Cancha,value);
}

}

horaFin($event){
  const value:objetoFecha = $event.detail.value;
  this.Hora_Fin = value;
  this.nuevaReservacion.Hora_Fin = value.date;



  console.log('this.detalle', this.detalleReservacion)
  if(this.nuevaReservacion.Hora_Inicio && this.nuevaReservacion.Hora_Fin){

 
  
   this.gestionReservacionesService.syncGetDisponibilidadReservaciones(
      this.nuevaReservacion.Cod_Cancha,
      this.nuevaReservacion.Hora_Inicio.toISOString().split('T')[0]+' '+ this.nuevaReservacion.Hora_Inicio.toTimeString().split(' ')[0],
      this.nuevaReservacion.Hora_Fin.toISOString().split('T')[0]+' '+ this.nuevaReservacion.Hora_Fin.toTimeString().split(' ')[0],
    ).then(reservaciones =>{
  
      console.log('reservacionessss' , reservaciones)

  if(reservaciones.length > 0){
    this.Hora_Inicio = null;
    this.Hora_Fin = null;
    this.nuevaReservacion.Hora_Inicio = null;
    this.nuevaReservacion.Hora_Fin = null;
    this.cd.markForCheck();
      this.cd.detectChanges();
    this.alertasService.message('FUTPLAY','Lo sentimimos, no se pueden reservar a la hora solicitada, intenta  con un hora distinta.');

    return
  }

  this.detalleReservacion.Total_Horas = this.nuevaReservacion.Hora_Fin.getHours() - this.nuevaReservacion.Hora_Inicio.getHours();


    })


  }

}

crearReservacion(){


this.nuevaReservacion.Titulo = this.retador.equipo.Nombre +' VS '+this.rival.equipo.Nombre;

  if(!this.nuevaReservacion.Dia_Completo){
    
    this.nuevaReservacion.Hora_Inicio = new Date(this.nuevaReservacion.Hora_Inicio).toISOString().split('T')[0]+' '+ this.nuevaReservacion.Hora_Inicio.toTimeString().split(' ')[0];
    this.nuevaReservacion.Hora_Fin = new Date( this.nuevaReservacion.Hora_Fin).toISOString().split('T')[0]+' '+ this.nuevaReservacion.Hora_Fin.toTimeString().split(' ')[0];
  
  }
  console.log(' this.nuevaReservacion',  this.nuevaReservacion)

    this.gestionReservacionesService.insertarReservacionToPromise(this.nuevaReservacion).then((resp:any) =>{
    console.log(' this.nuevaReservacion resp', resp)

     
      this.detalleReservacion.Monto_Sub_Total = this.detalleReservacion.Total_Horas * this.cancha.cancha.Precio_Hora;
      this.detalleReservacion.Monto_Total = this.detalleReservacion.Monto_Sub_Total
      // Discount = bill * discount / 100
      this.detalleReservacion.Monto_Descuento = this.detalleReservacion.Monto_Sub_Total * this.detalleReservacion.Porcentaje_Descuento / 100 
      this.detalleReservacion.Monto_Impuesto = this.detalleReservacion.Monto_Sub_Total * this.detalleReservacion.Porcentaje_Impuesto  / 100 
      this.detalleReservacion.Monto_FP = this.detalleReservacion.Monto_Sub_Total * this.detalleReservacion.Porcentaje_FP  / 100 
      this.detalleReservacion.Precio_Hora = this.cancha.cancha.Precio_Hora;
      this.detalleReservacion.Cod_Retador =  this.retador.equipo.Cod_Equipo;
      this.detalleReservacion.Cod_Rival = this.rival.equipo.Cod_Equipo;
      this.detalleReservacion.Monto_Equipo =  this.detalleReservacion.Monto_Total / 2
      this.detalleReservacion.Cod_Reservacion = resp.reservacion.Cod_Reservacion;

      this.gestionReservacionesService.insertarDetalleReservacionToPromise(this.detalleReservacion).then(resp =>{
this.cerrarModal();
        this.alertasService.message('FUTPLAY', 'La reservación se efectuo con excito ')
      }, error =>{
        this.alertasService.message('FUTPLAY', 'Lo sentimos algo salio mal ')
      })
      
      return
      this.cerrarModal();
    }, error =>{
      this.alertasService.message('FUTPLAY', 'Lo sentimos algo salio mal ')
    })
   
  }
cerrarModal(){
  this.modalCtrl.dismiss();
}

}
