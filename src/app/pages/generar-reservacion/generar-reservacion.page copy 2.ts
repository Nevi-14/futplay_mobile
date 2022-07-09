import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController, PopoverController } from '@ionic/angular';
import { HorarioCanchas } from 'src/app/models/horarioCanchas';
import { ListaCanchas } from 'src/app/models/listaCanchas';
import { vistaEquipos } from 'src/app/models/vistaEquipos';
import { AlertasService } from 'src/app/services/alertas.service';
import { ConfirmacionReservacionesService } from 'src/app/services/confirmacion-reservaciones.service';
import { ControlReservacionesService } from 'src/app/services/control-reservaciones.service';
import { GenerarReservacionService } from 'src/app/services/generar-reservacion.service';
import { HorarioCanchasService } from 'src/app/services/horario-canchas.service';
import { LogicaReservacionService } from 'src/app/services/logica-reservacion.service';
import { ProcesoReservacionService } from 'src/app/services/proceso-reservacion.service';
import { ReservacionesService } from 'src/app/services/reservaciones.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { CalendarioPopoverPage } from '../calendario-popover/calendario-popover.page';
import { IonicCalendar2Page } from '../ionic-calendar2/ionic-calendar2.page';
import { ListaCanchasPage } from '../lista-canchas/lista-canchas.page';
import { ListaEquiposPage } from '../lista-equipos/lista-equipos.page';
import { SeleccionarFechaPage } from '../seleccionar-fecha/seleccionar-fecha.page';
import { CalendarComponent } from 'ionic2-calendar';
import { format } from 'date-fns';
import { ConfiguracionHorarioService } from 'src/app/services/configuracion-horario.service';
import { ConfiguracionHorarioPage } from '../configuracion-horario/configuracion-horario.page';
import { GestionReservacionesService } from '../../services/gestion-reservaciones.service';
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
})
export class GenerarReservacionPage implements OnInit {

  //
  show  = false;;
  viewTitle: string
  calendarMode: any = 'month'

  calendar = {
    mode: this.calendarMode,
    currentDate: new Date()
  }
  week = [
    {Code:0, Day:'Domingo'},
    {Code:1,Day:'Lunes'},
    {Code:2,Day:'Martes'},
    {Code:3,Day:'Miercoles'},
    {Code:4,Day:'Jueves'},
    {Code:5,Day:'Viernes'},
    {Code:6,Day:'Sabado'}] 
  dateValue = format(new Date(), 'yyyy-MM-dd'); 
  reservationDate : Date = new Date();
 autoSelect: Boolean = false;
  selectedDay =  new Date();

  lockSwipes = false;

  currentDate = new Date();
  pastDate :Date;
  futureDate: Date;
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

markDisabled = (date: Date) => {
  var current = new Date();
  return date < current;
};

  //
  @Input()rival : vistaEquipos;
  @Input()retador : vistaEquipos;
  @Input()cancha : ListaCanchas;
  selectedDate: Date = new Date();
  soccer= 'assets/icon/soccer.svg';
  fechaDateTime =  new Date()
  dateValue2 = null;
  horarios: HorarioCanchas[]=[];
  horario: HorarioCanchas;
  Hora_Inicio: any;
  Hora_Fin: any;
  add = true;
  private modalOpen:boolean = false;
    constructor(
      public modalCtrl: ModalController,
      public usuariosService: UsuariosService,
      public reservacionesService: ReservacionesService,
      public http: HttpClient,
      public  controlReservacionesService: ControlReservacionesService,
      public alertasService: AlertasService,
      public generrReservacionService: GenerarReservacionService,
      public confirmarReservacionesService:ConfirmacionReservacionesService,
      public logicaReservacionesService: LogicaReservacionService,
      private cd: ChangeDetectorRef,
      public horarioCanchasService: HorarioCanchasService,
      public popOverCtrl:PopoverController,
      public procesoReservacionService: ProcesoReservacionService,
      public configuracionHorarioService: ConfiguracionHorarioService,
      public gestionReservacionesService: GestionReservacionesService
    ) { }
  retoRival : vistaEquipos;
    retoRetador : vistaEquipos;
  retoCancha : ListaCanchas;
  
    nuevaReservacion = {
      Cod_Cancha:  null,
      Cod_Usuario: this.usuariosService.usuarioActual.Cod_Usuario,
      Reservacion_Externa: false,
      Titulo: '',
      Fecha:  null,
      Hora_Inicio: null,
      Hora_Fin:null,
      Cod_Estado: 2,
      DiaCompleto: false ,
      Descripcion: '',
      Luz:  false,
      Precio_Hora: 0 ,
      Precio_Luz: 0
     }
  nuevaReservacionTime = {
    time12_Hora_Inicio  : null,
    time12_Hora_Fin  : null
  }



  
tConvert (time) {
  // Check correct time format and split into components
  time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
 
  if (time.length > 1) { // If time format correct
    time = time.slice (1);  // Remove full string match value
    time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join (''); // return adjusted time or original string
 }

 
  async presentPopover() {
    const popover = await this.popOverCtrl.create({
      component: CalendarioPopoverPage,
      cssClass: 'my-custom-class',
      translucent: true,
      componentProps : {
        fecha:this.fechaDateTime.toISOString()
      }
    });
    await popover.present();
  
    const { data } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', data);
    if(data != undefined){
      let fecha= new Date(data.fecha).toLocaleDateString('Es', {
        year: 'numeric',
        month: '2-digit',
        weekday: 'short',
        day: 'numeric',
      });
      this.dateValue2  = fecha;
      this.fechaDateTime = new Date(data.fecha);
      this.nuevaReservacion.Fecha = new Date(data.fecha);
      this.cd.markForCheck();
      this.cd.detectChanges();
  

      let index = new Date(data.fecha).getDay();
      this.horario =  this.horarios[index];
      this.logicaReservacionesService.generarArregloHorasDisponibles(this.horario.Hora_Inicio, this.horario.Hora_Fin,this.selectedDate).then(resp =>{
      this.logicaReservacionesService.horaInicioArray = resp;
        
            });
    }
  }
  
  async horarioCancha(){
    const modal = await this.modalCtrl.create({
      component: ConfiguracionHorarioPage,
      mode: 'ios',
      cssClass: 'horario-modal',
      componentProps:{
        cancha:this.cancha
      }
    });
    return await modal.present();
  }
  
  retornaHoraAmPm(hours){


    let minutes = null;
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    hours = hours < 10 ? '0' + hours : hours;
    // appending zero in the start if hours less than 10
    minutes = minutes < 10 ? '0' + minutes : minutes;
    
    let hourValue = hours +':'+'00'+':'+'00'+' ' + ampm;
    
    
    return hourValue;
    
    }

    onViewTitleChanged(title){
      this.viewTitle = title;
    }
    onCurrentDateChanged(selectedDate) {
      this.nuevaReservacion.Hora_Inicio = null;
      this.nuevaReservacion.Hora_Fin = null;
      this.nuevaReservacion.Fecha = selectedDate
      this.retornarHoras.Fecha = selectedDate;
      this.gestionReservacionesService.compararFechas(this.retornarHoras.Fecha, new Date()).then(resp =>{
if (resp === -1){
this.add = false;

}else{
  this.add = true;
}

      })
      this.generrReservacionService.syncHorarioCanchas( this.cancha.Cod_Cancha).then(resp =>{
        this.logicaReservacionesService.horaInicioArray = [];
        this.Hora_Inicio = null;
        this.Hora_Fin = null;
        this.gestionReservacionesService.calHoraInicio(this.cancha.Cod_Cancha,  this.retornarHoras.Fecha);
      })
  
  }


    ngOnInit() {
      this.horarioCanchasService.syncHorarioCanchas(this.cancha.Cod_Cancha)
 
      console.log(this.cancha,   this.horarioCanchasService.horarioCancha)
      this.horarioCanchasService.syncHorarioCanchasPromise(this.cancha.Cod_Cancha).then((resp:any) =>{
        console.log(resp,'resp')
    this.configuracionHorarioService.horarioCancha = resp;
  
    console.log('this.configuracionHorarioService.horarioCancha', this.configuracionHorarioService.horarioCancha)
    this.gestionReservacionesService.calHoraInicio(this.cancha.Cod_Cancha,this.selectedDate)


      })
     // this.generrReservacionService.generarReservacion(  this.cancha.Cod_Cancha,this.selectedDate);
  
  // ACTIVAR FILTRO PROVINCIA, CANTON DISTRITO CANCHAS -  JUGADORES
  // CARGAR MIS EQUIPOS
  // UNIRSE A UN EQUIPO, BUSCAR JUGADORES CON FILTRO Y EXPLUIR JUGADOR ACTUAL
  // ACEPTAR SOLICITUD  add - delete
  // INICIAR EVENTO CUANDO SE SELECCION LA FECHA DEL CALENDARIO
  // CARGAR HORARIO POR DIA DE CANCHA
  // CARGAR RESERVACIONES POR DIA 
  //ELIMINAR HORA INICIO Y HORA FIN Y UTILIZAR VISTA DIA CLICK EVENT
  // BLOQUEAR HORAS SEGUN HORA INICIO Y FIN EN EL CALENDARIO
  // EXCLUIR EQUIPOS DEL USUARIO CUANDO LLAMAMOS LOS EQUIPOS, SQL QUERY WHERE ID IS DIFFERENT Y HACER UN JOIN DE EQUIPOS DE LOS CUALES SOY PARTE COMO ADMIN
  
      console.log('rival',this.rival)
      console.log('retador',this.retador)
      console.log('cancha',this.cancha)
     this.nuevaReservacion.Cod_Cancha =  this.cancha.Cod_Cancha
    }
    
    time(timeString){
      const timeString12hr = new Date('1970-01-01T' + timeString + 'Z')
      .toLocaleTimeString('en-US',
        {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'}
      );
  
      return timeString12hr;
     }
  
  
    retornarFecha(event){
  this.fechaDateTime = event.detail.value
  this.controlReservacionesService.syncReservacionesFecha(this.cancha.Cod_Cancha, event.detail.value)
    this.modalCtrl.dismiss();
  
    }
  
    cerrarModal(){
      this.modalCtrl.dismiss();
      //this.modalCtrl.dismiss(undefined, undefined,'my-modal-id');
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
         console.log(data)
           if(data.equipo !== undefined){
           
            this.rival = data.equipo;
  
               this.modalCtrl.dismiss();
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
           if(data.equipo !== undefined){
           
            this.retador = data.equipo;
  
               this.modalCtrl.dismiss();
           }
    }
  
  
  
  
 horaInicio($event){
  const value:objetoFecha = $event.detail.value;
  this.nuevaReservacion.Hora_Inicio = value.date;
  this.Hora_Inicio = value;
  this.Hora_Fin = null;
  this.nuevaReservacion.Hora_Fin = null;
  this.logicaReservacionesService.horaFinArray = [];
  this.cd.markForCheck();
  this.cd.detectChanges();

  this.gestionReservacionesService.calHoraFin(this.cancha.Cod_Cancha,value);
}

horaFin($event){
  const value:objetoFecha = $event.detail.value;
  console.log('hora fin', value)
  this.Hora_Fin = value;
  this.nuevaReservacion.Hora_Fin = value.date;
  this.cd.markForCheck();
  this.cd.detectChanges();

  console.log('rser', this.nuevaReservacion)

}
  
  
  async mostrarCalendario(){
  
    const modal = await this.modalCtrl.create({
      component:IonicCalendar2Page,
      cssClass:'my-custom-class',
      componentProps:{
        cancha: this.cancha
      }
    });
  
  await modal.present();
  
  const {  data } = await modal.onDidDismiss();
  
  if(data != undefined){

    console.log(data, 'dataaa')
    // new Date(yearValue, IndexOfMonth, dayValue, hours, minutes, seconds)
  this.nuevaReservacion.Hora_Inicio = data.fechaHora.Hora_Inicio ;
  this.nuevaReservacion.Hora_Fin = data.fechaHora.Hora_Fin;
  this.nuevaReservacion.Fecha = data.fechaHora.Fecha;
  this.selectedDate = data.fechaHora.Fecha;

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
         console.log(data)
           if(data.cancha !== undefined){
           
            this.cancha = data.cancha;
            this.nuevaReservacion.Cod_Cancha = this.cancha.Cod_Cancha;
  
  this.controlReservacionesService.syncReservacionesFecha(this.cancha.Cod_Cancha, this.fechaDateTime)
  
               this.modalCtrl.dismiss();

               this.horarioCanchasService.syncHorarioCanchas(this.cancha.Cod_Cancha)
 
               this.gestionReservacionesService.calHoraInicio(this.cancha.Cod_Cancha,this.selectedDate)
           }
    }
  
  slideNext() {
  this.myCal.slideNext();
}

slidePrev() {
this.myCal.slidePrev();
}
    generarReto(){
  /**
   *     if(fRegistro.invalid) {return;}
   *///console.log(this.nuevaReservacion)

      this.nuevaReservacion.Fecha = this.nuevaReservacion.Fecha.toISOString();
      this.nuevaReservacion.Titulo = this.rival.Nombre + ' VS ' + this.retador.Nombre;
  
/**
 *       this.nuevaReservacion.Hora_Inicio = this.nuevaReservacion.Hora_Inicio.toISOString().split('T')[0]+' '+ this.nuevaReservacion.Hora_Inicio.toTimeString().split(' ')[0];
      this.nuevaReservacion.Hora_Fin = this.nuevaReservacion.Hora_Fin.toISOString().split('T')[0]+' '+ this.nuevaReservacion.Hora_Fin.toTimeString().split(' ')[0];
 */
    
console.log(this.nuevaReservacion)
  // return
    this.reservacionesService.insertarReservacion(this.nuevaReservacion).then((resp:any) =>{
  console.log(resp, 'resppppp')
      if(resp){
        let cofirmacion = {
   Cod_Reservacion: resp.Cod_Reservacion,
   Cod_Retador : this.retador.Cod_Equipo,
   Cod_Rival : this.rival.Cod_Equipo,
   Confirmacion_Retador: true,
   Confirmacion_Rival : false,
   Cod_Estado : 3,
        }
  
        this.confirmarReservacionesService.insertarReservacion(cofirmacion);
      }
    })
    
    
    this.cerrarModal();
    
    
    }
    async SelectDate(){
      if (!this.modalOpen){
        this.modalOpen = true;
        const modal = await this.modalCtrl.create({
          component:SeleccionarFechaPage,
          cssClass:'date-modal',
          componentProps:{
            title:'Fecha de nacimiento',
            id: 'seleccionar-fecha'
          },
          id: 'seleccionar-fecha'
        })
      
        await modal.present();
        const { data } = await modal.onWillDismiss();
     
        if(data !== undefined ){
          console.log(data,'data')
          
  this.controlReservacionesService.syncReservacionesFecha(this.cancha.Cod_Cancha, new Date(data.date).toISOString())
          this.selectedDate = data.date
         this.nuevaReservacion.Fecha = data.date
              this.modalOpen = false;
        }else{
     
               this.modalOpen = false;
        }
        
      }
    
      
    }
    
    generarReto2(fRegistro: NgForm){
      if(fRegistro.invalid) {return;}
  
      if(this.nuevaReservacion.Hora_Inicio == null || this.nuevaReservacion.Hora_Inicio == undefined || this.nuevaReservacion.Hora_Inicio == ''){
  
        return this.alertasService.message('FUTPLAY','Selecciona la hora de la reservación')
      } else if(this.cancha == null || this.cancha == undefined){
        return this.alertasService.message('FUTPLAY','Selecciona una cancha')
      }
      else if(this.rival == null || this.rival == undefined ){
        return this.alertasService.message('FUTPLAY','Selecciona un rival')
      }
      else if(this.retador == null || this.retador == undefined ){
        return this.alertasService.message('FUTPLAY','Selecciona un retador')
      }
      console.log(fRegistro.valid);
  
      this.nuevaReservacion.Hora_Fin = this.nuevaReservacion.Hora_Inicio
      this.nuevaReservacion.Titulo = this.rival.Nombre + ' VS ' + this.retador.Nombre;
      this.nuevaReservacion.Fecha = this.fechaDateTime;
      this.nuevaReservacion.Descripcion  = '';
      this.nuevaReservacion.Hora_Inicio = this.nuevaReservacion.Hora_Inicio.hora_inicio;
      this.nuevaReservacion.Hora_Fin = this.nuevaReservacion.Hora_Fin.hora_fin;
      console.log(this.nuevaReservacion, this.rival, this.retador, this.fechaDateTime)
      this.controlReservacionesService.postReservacion(this.nuevaReservacion, this.cancha, this.rival, this.retador)
  
  this.cerrarModal();
  
    }
  

}
