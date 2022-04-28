import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { BloqueoCanchas } from '../models/bloqueoCanchas';
import { ReservacionesCanchasUsuarios } from '../models/Reservaciones_Canchas_Usuarios';
import { Router } from '@angular/router';
import { Canchas } from '../models/canchas';
import { LoadingController, AlertController, ModalController } from '@ionic/angular';

import { UsuariosService } from './usuarios.service';
import { AlertasService } from './alertas.service';
import { Reservaciones } from '../models/reservaciones';


@Injectable({
  providedIn: 'root'
})
export class ReservacionesService {
  reservaciones :Reservaciones[]=[];
  reservaconesUsuario = [];
  reservacionesCanchasUsusario: ReservacionesCanchasUsuarios[]=[];
  reservacionesCanchaActual = [];
  selectedDate: Date;
  loading: HTMLIonLoadingElement;
  eventSource = [];
cancha:Canchas;
bloqueo = {
  Cod_Cancha:  null,
  Cod_Usuario:  null,
  Reservacion_Externa: true,
  Titulo: null,
  Fecha:   null,
  Hora_Inicio:  null,
  Hora_Fin: null,
  Estado:  true,
  diaCompleto:  false,
  Descripcion: ''
 }

 array = [{id: 1, hour :'06',  meridiem : 'AM'},{id: 2, hour :'07', meridiem : 'AM' } ,{ id: 3,hour :'08', meridiem : 'AM'},{id: 4, hour :'09', meridiem : 'AM'},{ id:5, hour :'10', meridiem : 'AM'},{id: 6, hour :'11', meridiem : 'AM'},{id: 7 , hour :'12', meridiem : 'PM'},{id: 8, hour :'01', meridiem : 'PM'},{id:9, hour :'02', meridiem : 'PM'},{id: 10, hour :'03', meridiem : 'PM'},{id: 11, hour :'04', meridiem : 'PM'},{id: 12,hour :'05', meridiem : 'PM'},{id: 13,hour :'06', meridiem : 'PM'},{id: 14,hour :'07', meridiem : 'PM'},{id: 15,hour :'08', meridiem : 'PM'},{id: 16,hour :'09', meridiem : 'PM'},{id: 17,hour :'10', meridiem : 'PM'}];



  
  constructor(
    
    private http: HttpClient, 
    public router: Router, 
    public loadingCtrl: LoadingController, 
    public alertController: AlertController, 
    public modalCtrl: ModalController, 
    public alertasService: AlertasService
    
    
    ) { }








  getURL( api: string,id: string ){
    let test: string = ''
    if ( !environment.prdMode ) {
      test = environment.TestURL;
    }
    const URL = environment.preURL  + test +  environment.postURL + api + environment.codCanchaParam + id;
console.log(URL);
    return URL;
  }



  time(date,hour){

    const dateValue = date.getMonth()+1+'/'+date.getDate()+'/'+date.getFullYear() + ' ' + hour // '05/18/2015 03:45:28 PM'
 console.log(dateValue)
 return new Date(dateValue);


  }



  private getReservaciones(Cod_Cancha ){

    const URL = this.getURL( environment.reservacionesUrl,Cod_Cancha);

    return this.http.get<ReservacionesCanchasUsuarios[]>( URL );

  }



  private getReservacionesporCancha(Cod_Cancha ){

    const URL = this.getURL( environment.reservacionesUrl,Cod_Cancha);



    return this.http.get<ReservacionesCanchasUsuarios[]>( URL );


  }



  syncReservaciones(Cod_Cancha){


    this.getReservaciones(Cod_Cancha).subscribe(

      resp =>{

        


     
          if(resp.slice(0).length !== 0 ){


        

            resp.slice(0).forEach(reservacion =>{

const  reservacionCanchas = {
  Cod_Reservacion: reservacion.Cod_Reservacion,
  Cod_Usuario:  reservacion.Cod_Usuario,
  Nombre_Usuario:  reservacion.Nombre_Usuario,
  Usuario_Primer_Apellido:  reservacion.Usuario_Primer_Apellido,
  Usuario_Segundo_Apellido:  reservacion.Usuario_Segundo_Apellido,
  Foto:  reservacion.Foto,
  Cod_Cancha:  reservacion.Cod_Cancha,
  Nombre_Cancha: reservacion.Nombre_Cancha,
  Reservacion_Externa: reservacion.Reservacion_Externa,
  Numero_Cancha:  reservacion.Numero_Cancha,
  Titulo:  reservacion.Titulo,
  Precio_Hora:  reservacion.Precio_Hora,
  Hora_Inicio: reservacion.Hora_Inicio,
  Fecha:   reservacion.Fecha,
  Hora_Fin: reservacion.Hora_Fin,
  Estado:  reservacion.Estado,
  diaCompleto:  reservacion.diaCompleto,
  Descripcion: reservacion.Descripcion
}

              this.reservacionesCanchasUsusario.push(reservacionCanchas)
      

            })
        
           
        }


        console.log('reservaciones', this.reservacionesCanchasUsusario)


      } , error =>{


      }
      

    );

    
  }

  markDisabled = (date: Date) => {
    var current = this.selectedDate;
    console.log(this.selectedDate)
    return date == new Date( this.selectedDate);
};

  syncReservacionesCanchaActual(Cod_Cancha){

 //   this.presentaLoading('Cargando reservaciones por cancha')

    this.getReservacionesporCancha(Cod_Cancha).subscribe(
      
      resp =>{


        this.reservacionesCanchaActual = [];
this.eventSource = [];

this.reservacionesCanchasUsusario = resp;

for (var i = 0; i < this.reservacionesCanchasUsusario.length; i ++) {
  var dia = new Date( this.reservacionesCanchasUsusario[i].Fecha);
  console.log(dia, dia.getDate())
  var startDay = dia.getDate();
  var endDay = dia.getDate() ;


  var startTime;
  var endTime;

console.log(this.reservacionesCanchasUsusario[i].diaCompleto, 'dia completo')

  if (this.reservacionesCanchasUsusario[i].diaCompleto) {
    const date =  new Date(this.reservacionesCanchasUsusario[i].Fecha);
    startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
    if (endDay === startDay) {
        endDay += 1;
    }
    endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + 1));
 
      if(Cod_Cancha === this.reservacionesCanchasUsusario[i].Cod_Cancha ){
        this.eventSource.push({
          id: this.reservacionesCanchasUsusario[i].Cod_Reservacion,
          title: this.reservacionesCanchasUsusario[i].Titulo,
          foto: this.reservacionesCanchasUsusario[i].Foto,
          Hora_Inicio: this.reservacionesCanchasUsusario[i].Hora_Inicio,
          Hora_Fin: this.reservacionesCanchasUsusario[i].Hora_Fin,
          startTime: startTime,
          endTime: endTime,
          Cod_Cancha:this.reservacionesCanchasUsusario[i].Cod_Cancha,
          desc:  this.reservacionesCanchasUsusario[i].Descripcion,
          allDay: true,
          fecha: this.reservacionesCanchasUsusario[i].Fecha
      });
   //   this.markDisabled(this.reservacionesCanchasUsusario[i].Fecha)
      }



    
  } else {

    console.log('hora init', this.retornaHora(this.reservacionesCanchasUsusario[i].Hora_Inicio))

      if(Cod_Cancha=== this.reservacionesCanchasUsusario[i].Cod_Cancha ){
        this.eventSource.push({
          id: this.reservacionesCanchasUsusario[i].Cod_Reservacion,
          title: this.reservacionesCanchasUsusario[i].Titulo,
          foto: this.reservacionesCanchasUsusario[i].Foto,
          Hora_Inicio:  this.reservacionesCanchasUsusario[i].Hora_Inicio,
          Hora_Fin: this.reservacionesCanchasUsusario[i].Hora_Fin,
          startTime: this.time(new Date(this.reservacionesCanchasUsusario[i].Fecha), this.reservacionesCanchasUsusario[i].Hora_Inicio) ,
          endTime:this.time(new Date(this.reservacionesCanchasUsusario[i].Fecha), this.reservacionesCanchasUsusario[i].Hora_Fin),
          desc:this.reservacionesCanchasUsusario[i].Descripcion,
          Cod_Cancha:this.reservacionesCanchasUsusario[i].Cod_Cancha,
          allDay: false,
          fecha: this.reservacionesCanchasUsusario[i].Fecha
      });
      }


      
 




}

}


console.log(this.eventSource,'srouce')

     


//this.loadingDissmiss();

      }
      

    );


 
    
  }




  retornaHora(id){
    let hora = '';   

    this.array.forEach(horas => {

   if(horas.id == id){

   

     hora = horas.hour+':'+'00'+':'+'00'+' '+horas.meridiem
  
    
   }
    })

    return hora
  }







// POST RESERVACIONES

      // POST CANCHA

      private postReservaciones (reservacion){
        const URL = this.getURL( environment.bloqueoCanchasURL, '' );
        const options = {
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Access-Control-Allow-Origin': '*'
          }
        };
       
        return this.http.post( URL, JSON.stringify(reservacion), options );
      }
    
      insertarReservacion(reservacion){

        this.postReservaciones(reservacion).subscribe(
  
          resp => {
          this.alertasService.message('FUTPLAY', 'La reservación se efectuo con excito ')
            console.log(resp, 'post');
      //     this.loadingDissmiss();
          // this.canchasService.syncCanchasParam( reservacion.Cod_Usuario)
      
          
          
      this.syncReservacionesCanchaActual(reservacion.Cod_Cancha)
       
      this.bloqueo = {
        Cod_Cancha:  null,
        Cod_Usuario:  null,
        Reservacion_Externa: true,
        Titulo: null,
        Fecha:   null,
        Hora_Inicio:  null,
        Hora_Fin: null,
        Estado:  true,
        diaCompleto:  false,
        Descripcion: ''
       }
          }, error => {
            console.log(this.bloqueo);
           console.log('error')
          }
        )

  /**
   *       if(!this.bloqueo.Cod_Usuario){
        //  this.presentAlertW('Reservaciones','Se requiere de un usuario autenticado para poder ejercer la acción, verifica que hayas iniciado sesión')
        }else if(!this.bloqueo.Descripcion){
         // this.presentAlertW('Reservaciones','La descripción no puede ser vacia')
        }else if (!this.bloqueo.Hora_Inicio || !this.bloqueo.Hora_Fin){
         // this.presentAlertW('Reservaciones','La hora inicio y hora fin son requeridos')
        }
else if(this.bloqueo.Cod_Usuario && this.bloqueo.Descripcion && this.bloqueo.Hora_Inicio && this.bloqueo.Hora_Fin ){
 // this.presentaLoading('Guardando nueva reservacion')


 }
   */
      }











      //=========================================================================================
      //
      //==========================================================================================
       


}
