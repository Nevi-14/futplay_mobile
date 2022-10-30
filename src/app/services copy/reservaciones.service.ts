import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReservacionesCanchasUsuarios } from '../models/Reservaciones_Canchas_Usuarios';
import { Router } from '@angular/router';
import { Canchas } from '../models/canchas';
import { LoadingController, AlertController, ModalController } from '@ionic/angular';
import { AlertasService } from './alertas.service';
import { Reservaciones } from '../models/reservaciones';
import { environment } from 'src/environments/environment';


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

  
  constructor(
    
    private http: HttpClient, 
    public router: Router, 
    public loadingCtrl: LoadingController, 
    public alertController: AlertController, 
    public modalCtrl: ModalController, 
    public alertasService: AlertasService
    
    
    ) { }








  getURL( api: string ){
    let test: string = ''
    if ( !environment.prdMode ) {
      test = environment.TestURL;
    }
    const URL = environment.preURL  + test +  environment.postURL + api  
console.log(URL);
    return URL;
  }



  time(date,hour){

    const dateValue = date.getMonth()+1+'-'+date.getDate()+'-'+date.getFullYear() + ' ' + hour // '05/18/2015 03:45:28 PM'
 console.log(dateValue)
 return new Date(dateValue);


  }



  private getReservaciones(Cod_Cancha ){

    let URL = this.getURL( environment.reservacionesUrl);
    URL = URL + environment.codCanchaParam + Cod_Cancha;

    return this.http.get<ReservacionesCanchasUsuarios[]>( URL );

  }



  private getReservacionesporCancha(Cod_Cancha ){

    let URL = this.getURL( environment.reservacionesUrl);

    URL = URL + environment.codCanchaParam + Cod_Cancha;

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
formatoFecha(date:Date, format:string){

  const dateObj = new Date(date);
  
  const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
  const dateValue = ('0' + dateObj.getDate()).slice(-2);
  const year = dateObj.getFullYear();
  let formatoFecha = null;


  switch(format){

         case '-':
         formatoFecha =  year + '-' + month + '-' + dateValue;
         break;

         case '/':
        formatoFecha =  year + '/' + month + '/' + dateValue;
        break;

        default :
         formatoFecha = dateObj; 

  }
         return formatoFecha;

}
  syncReservacionesCanchaActual(Cod_Cancha){

 //   this.presentaLoading('Cargando reservaciones por cancha')

    this.getReservacionesporCancha(Cod_Cancha).subscribe(
      
      resp =>{


        this.reservacionesCanchaActual = [];
this.eventSource = [];

this.reservacionesCanchasUsusario = resp;

for (var i = 0; i < this.reservacionesCanchasUsusario.length; i ++) {
  var dia =  new Date( this.formatoFecha(this.reservacionesCanchasUsusario[i].Fecha,'-'));
  console.log(dia, dia.getDate())
  var startDay = dia.getDate();
  var endDay = dia.getDate() ;


  var startTime;
  var endTime;

console.log(this.reservacionesCanchasUsusario[i].diaCompleto, 'dia completo')

  if (this.reservacionesCanchasUsusario[i].diaCompleto) {
    const date =  new Date( this.formatoFecha(this.reservacionesCanchasUsusario[i].Fecha,'-'));
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








// POST RESERVACIONES

      // POST CANCHA

      private postReservaciones (reservacion){
        const URL = this.getURL( environment.bloqueoCanchasURL);
        const options = {
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Access-Control-Allow-Origin': '*'
          }
        };
       
        console.log('POST URL', URL)
        return this.http.post( URL, JSON.stringify(reservacion), options );
      }
    
      insertarReservacion(reservacion){
console.log(reservacion, 'post')
    return    this.postReservaciones(reservacion).toPromise();

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
