import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { vistaEquipos } from 'src/app/models/vistaEquipos';
import { format } from 'date-fns';
import { CalendarComponent } from 'ionic2-calendar';
import { ListaCanchas } from '../../models/listaCanchas';
import { ModalController } from '@ionic/angular';
import { ListaEquiposPage } from '../lista-equipos/lista-equipos.page';
import { ListaCanchasPage } from '../lista-canchas/lista-canchas.page';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ReservacionesService } from '../../services/reservaciones.service';
import { Reservaciones } from 'src/app/models/reservaciones';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ControlReservacionesService } from '../../services/control-reservaciones.service';


@Component({
  selector: 'app-equipo-reservacion',
  templateUrl: './equipo-reservacion.page.html',
  styleUrls: ['./equipo-reservacion.page.scss'],
})
export class EquipoReservacionPage implements OnInit {
@Input()rival : vistaEquipos;
@Input()retador : vistaEquipos;
@Input()cancha : ListaCanchas;
fecha =format(new Date(), 'yyyy-MM-dd');
eventSource = this.reservacionesService.eventSource;
viewTitle: string
calendarMode: any = 'month'
calendar = {
  mode: this.calendarMode,
  currentDate: new Date(),
 // startHour: this.horarioCanchasService.horarioCancha[0].Hora_Inicio.substring(0,2),
  //endHour: this.horarioCanchasService.horarioCancha[0].Hora_Fin.substring(0,2)
}
nuevaReservacion = {
  Cod_Cancha:  0,
  Cod_Usuario:  this.usuariosService.usuarioActual.Cod_Usuario,
  Reservacion_Externa: true,
  Titulo: '',
  Fecha:  null,
  Hora_Inicio: '',
  Hora_Fin:'',
  Estado:  true,
  diaCompleto:  false,
  Descripcion: ''
 }
soccer= 'assets/icon/soccer.svg';
dateValue = format(new Date(), 'yyyy-MM-dd'); 
reservationDate : Date = new Date();
autoSelect: Boolean = false;
selectedDay =  new Date();

lockSwipes = true;

currentDate = new Date();
pastDate :Date;
futureDate: Date;
selectedDate: Date = new Date();
modalDate: string;
block = false; //If user clicks on a date that has already passed this value turns true
textoBuscar ='';
@ViewChild(CalendarComponent) myCal: CalendarComponent
hour = new Date().getHours();
dateValue1 =  this.hour < 10 ?  '0'+ new Date().getHours() + ':00:00' : this.hour + ':00:00'
dateValue2 =  this.hour < 10 ?  this.hour+1 < 10 ?  '0'+( this.hour+1 )+ ':00:00' : ( this.hour+1 )+ ':00:00' : this.hour + ':00:00';


  constructor(
    public modalCtrl: ModalController,
    public usuariosService: UsuariosService,
    public reservacionesService: ReservacionesService,
    public http: HttpClient,
    public  controlReservacionesService: ControlReservacionesService
  ) { }

  ngOnInit() {
    this.nuevaReservacion.Hora_Inicio =  this.dateValue1;
    this.nuevaReservacion.Hora_Fin =  this.dateValue2;

    this.nuevaReservacion.Fecha = this.fecha;
    console.log('rival',this.rival)
    console.log('retador',this.retador)
    console.log('cancha',this.cancha)
  }
  getURL( api: string,Cod_Cancha: number, Fecha: String ){
    let test: string = ''
    if ( !environment.prdMode ) {
      test = environment.TestURL;
    }
    
    const URL = environment.preURL  + test +  environment.postURL + api + environment.codCanchaParam+Cod_Cancha+ environment.fechaParam + Fecha
console.log(URL);
    return URL;
  }

  private getReservacionesFecha(Cod_Cancha,Fecha   ){
    const URL = this.getURL( environment.reservacionesFecha,Cod_Cancha,Fecha);
    return this.http.get<Reservaciones[]>( URL );
  }






  formatDateCalendar(value: string) {
    //  this.usuario.Fecha_Nacimiento = $event.detail.value;

    return format(new Date(value), 'yyyy-MM-dd') ;
    
  }

  formatDateIonicCalendar(value){

    return new Date(value);
  }

  formatDate(value) {

    if(value){
      return    value.substring(0,2)+ ':00:00';
    }
    
      }
      cerrarModal(){
        this.modalCtrl.dismiss();
      }
      
  async agregarRival() {
    const modal = await this.modalCtrl.create({
      component: ListaEquiposPage,
      cssClass: 'my-custom-modal',
      mode:'ios'
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
      mode:'ios'
    });


     await modal.present();
     const { data } = await modal.onDidDismiss();
       console.log(data)
         if(data.equipo !== undefined){
         
          this.retador = data.equipo;

             this.modalCtrl.dismiss();
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
this.controlReservacionesService.syncReservacionesFecha(this.cancha.Cod_Cancha, this.fecha)


             this.modalCtrl.dismiss();
         }
  }







}
