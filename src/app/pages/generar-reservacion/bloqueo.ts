import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonDatetime, ModalController } from '@ionic/angular';
import { ExcepcionesHorarioCanchas } from 'src/app/models/excepcionesHorario';
import { CanchasService } from 'src/app/services/canchas.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';
import { CanchasReservacionesService } from 'src/app/services/canchas-reservaciones.service';
import { ReservacionesService } from 'src/app/services/reservaciones.service';
import { ReservacionesFechaHoraService } from 'src/app/services/reservaciones-fecha-hora.service';
import { ReservacionesDiaCompletoService } from 'src/app/services/reservaciones-dia-completo.service';
import { CanchaReservacionesService } from 'src/app/services/cancha-reservaciones.service';
import { format } from 'date-fns';


@Component({
  selector: 'app-bloqueo-canchas',
  templateUrl: './bloqueo-canchas.page.html',
  styleUrls: ['./bloqueo-canchas.page.scss'],
})
export class BloqueoCanchasPage implements OnInit {
@Input() dia: Date;
@ViewChild(IonDatetime, { static: true }) datetime: IonDatetime;
dateValue = format(new Date(), 'yyyy-MM-dd'); 


hours = [{hour :'07', meridiem : 'AM' } ,{hour :'08', meridiem : 'AM'},{hour :'09', meridiem : 'AM'},{hour :'10', meridiem : 'AM'},{hour :'11', meridiem : 'AM'},{hour :'12', meridiem : 'PM'},{hour :'01', meridiem : 'PM'},{hour :'02', meridiem : 'PM'},{hour :'03', meridiem : 'PM'},{hour :'04', meridiem : 'PM'},{hour :'05', meridiem : 'PM'},{hour :'06', meridiem : 'PM'},{hour :'07', meridiem : 'PM'},{hour :'08', meridiem : 'PM'},{hour :'09', meridiem : 'PM'},{hour :'10', meridiem : 'PM'}];


dateValue2 = '';

 nuevaExcepcion: ExcepcionesHorarioCanchas;

  constructor(
public canchasService: CanchasService,
public usuariosService: UsuariosService,
public modalCtrl: ModalController,
public router: Router,
public canchasReservacionesService: CanchasReservacionesService,
public reservacionesService: ReservacionesService,
public reservacionesFechaHoraService: ReservacionesFechaHoraService,
public reservacionesDiaCompletoService: ReservacionesDiaCompletoService,
public canchaReservacionesService: CanchaReservacionesService

  ) { }

  ngOnInit() {


this.canchaReservacionesService.syncReservacionesFecha(this.canchasReservacionesService.canchaActual.Cod_Cancha , this.dia);



  }


  

horaInicioChange(event){
  
  const hora =  event.detail.value;
 console.log(this.canchaReservacionesService.reservacionesDia,'reservas del dia' , 'hora', hora, 'horas')

}
horaFinChange(event){

 const hora =  event.detail.value;
 console.log(this.canchaReservacionesService.reservacionesDia,'reservas del dia' , 'hora', hora)
}
  formulario(){

    console.log(this.reservacionesService.bloqueo.diaCompleto, ' dia completo')
//    console.log(this.bloqueo,'bloqueo')
  //  console.log(this.horaInicio,'inicio', this.horaFin)
  //  console.log(hour,hour+1)
  
  //  this.bloqueo.Hora_Inicio = this.time(new Date(this.bloqueo.Fecha),this.horaInicio.hour,this.horaInicio.meridiem);
  //  const houHF = Math.floor(hour) + 1;
  
  //  this.bloqueo.Hora_Fin = this.time(new Date(this.bloqueo.Fecha),this.horaFin.hour,this.horaFin.meridiem);
    //console.log(this.bloqueo, ' antes')

    const dateObj = new Date(this.dia);
    const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
    const dateValue = ('0' + dateObj.getDate()).slice(-2);
    const year = dateObj.getFullYear();
    const shortDate = year + '-' + month + '-' + dateValue;

console.log(this.dia)


    if(this.reservacionesService.bloqueo.diaCompleto){

     this.reservacionesService.bloqueo = {
      Cod_Cancha:  this.canchasReservacionesService.canchaActual.Cod_Cancha,
        Reservacion_Externa: true,
        Cod_Usuario:   this.usuariosService.usuarioActual.Cod_Usuario,
        Fecha:   this.dia,
        Hora_Inicio:  '0',
        Hora_Fin: '0',
        Estado:  this.reservacionesService.bloqueo.Estado,
        diaCompleto:  true,
        Titulo: this.reservacionesService.bloqueo.Titulo,
        Descripcion:  this.reservacionesService.bloqueo.Descripcion
       }



   
  this.reservacionesDiaCompletoService.syncReservacionesDiaCompletoPOST(this.canchasReservacionesService.canchaActual.Cod_Cancha , this.dia);

console.log('sync post dia completo')
    }else{
      this.reservacionesService.bloqueo = {
        Cod_Cancha:  this.canchasReservacionesService.canchaActual.Cod_Cancha,
        Reservacion_Externa: true,
        Cod_Usuario:   this.usuariosService.usuarioActual.Cod_Usuario,
        Fecha:   this.dia,
        Hora_Inicio:   this.reservacionesService.bloqueo.Hora_Inicio,
        Hora_Fin:  this.reservacionesService.bloqueo.Hora_Fin,
        Estado:  this.reservacionesService.bloqueo.Estado,
        diaCompleto:false,
        Titulo:  this.reservacionesService.bloqueo.Titulo,
        Descripcion:   this.reservacionesService.bloqueo.Descripcion
       }

       this.reservacionesFechaHoraService.syncReservacionesFechaHora(this.reservacionesService.bloqueo.Cod_Cancha,this.dia,this.reservacionesService.bloqueo.Hora_Inicio, this.reservacionesService.bloqueo.Hora_Fin);


       }





      
console.log('sync post fecha hora completo')

    }


    cerrarModal(){
      this.modalCtrl.dismiss();
    }
  
    time(date,hour,meridiem){
  
      const dateValue = date.getMonth()+1+'/'+date.getDate()+'/'+date.getFullYear() + ' ' + hour+':'+'00:00'+' '+meridiem; // '05/18/2015 03:45:28 PM'
   console.log(dateValue)
   return new Date(dateValue);
  
  
    }
  
   
  }


