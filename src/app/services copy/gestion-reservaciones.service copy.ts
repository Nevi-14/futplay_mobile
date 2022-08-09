import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ReservacionesCanchasUsuarios } from '../models/Reservaciones_Canchas_Usuarios';
import { AlertasService } from './alertas.service';
import { Canchas } from '../models/canchas';
import { HorarioCanchasService } from '../services copy/horario-canchas.service';
import { HorarioCanchas } from '../models/horarioCanchas';
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
@Injectable({
  providedIn: 'root'
})
export class GestionReservacionesService {
cancha :Canchas;
reservaciones : ReservacionesCanchasUsuarios[]=[];
reservacionesDia : ReservacionesCanchasUsuarios[]=[];
horaInicioArray:objetoFecha[] = [];
horaFinArray:objetoFecha[] = [];
horario:HorarioCanchas[];
diaActual:HorarioCanchas;
diaCompleto:boolean = false;
constructor(

public http: HttpClient,
public alertasService: AlertasService,
public horarioCanchasService: HorarioCanchasService


  ) { }


  // GET 

  getURL( api: string ){

    let test: string = ''

    if ( !environment.prdMode ) {

      
      test = environment.TestURL;
      
    }

    const URL = environment.preURL  + test +  environment.postURL + api;
console.log(URL);
    return URL;
  }

  private getReservaciones(Cod_Cancha ){

    let URL = this.getURL( environment.reservacionesUrl);
         URL = URL + environment.codCanchaParam + Cod_Cancha;
console.log('URLURLURLURL',URL)
    return this.http.get<ReservacionesCanchasUsuarios[]>( URL );

  }
  private filtrarReservacionesFecha(Cod_Cancha, Fecha_Inicio,Fecha_Fin){

    let URL = this.getURL( environment.reservacionesFiltroURL);
         URL = URL + environment.codCanchaParam + Cod_Cancha+ environment.Fecha_Inicio + Fecha_Inicio + environment.Fecha_Fin + Fecha_Fin;
console.log('filtrarREservacionesFecha',URL)
    return this.http.get<ReservacionesCanchasUsuarios[]>( URL );

  }

  private getReservacionesFuturas(Cod_Cancha, Fecha){

    let URL = this.getURL( environment.reservacionesFuturasURL);
         URL = URL + environment.codCanchaParam + Cod_Cancha+ environment.fechaSecondParam + Fecha;
console.log('URLURLURLURL',URL)
    return this.http.get<ReservacionesCanchasUsuarios[]>( URL );

  }

  private getReservacionesDesactivadas(Fecha){

    let URL = this.getURL( environment.reservacionesDesactivadasURL);
         URL = URL + environment.fechaParam + Fecha;
console.log('URLURLURLURL',URL)
    return this.http.get<ReservacionesCanchasUsuarios[]>( URL );

  }

  
  syncFiltrarReservacionesFecha(Cod_Cancha, Fecha_Inicio,Fecha_Fin){

    return this.filtrarReservacionesFecha(Cod_Cancha, Fecha_Inicio,Fecha_Fin).toPromise();
  }

  sycReservacionesFuturas(Cod_Cancha,Fecha){

   return this.getReservacionesFuturas(Cod_Cancha, Fecha).toPromise();
  }
  sycGetReservacionesDesactivadas(Fecha){

    return this.getReservacionesDesactivadas( Fecha).toPromise();
   }
   syncReservacionesToPromise(Cod_Cancha){

   return this.getReservaciones(Cod_Cancha).toPromise();

   }

   

  getURLPUT( api: string , Cod_Usuario : number, Cod_Reservacion : number){
    let test: string = ''
    if ( !environment.prdMode ) {
      test = environment.TestURL;
    }
 // PUT: api/reservaciones/?Cod_Usuario= 2&Cod_Reservacion=1   ACTUALIZAR RESERVACION

    const URL = environment.preURL  + test +  environment.postURL + api + environment.codUsuarioParam + Cod_Usuario + environment.codReservacionParam + Cod_Reservacion;
console.log(URL, 'put');
    return URL;
    
  }





    //
    private   putReservaciones( reservacion, Cod_Usuario, Cod_Reservacion ){
      const URL = this.getURLPUT( environment.reservacionesUrl, Cod_Usuario, Cod_Reservacion);
      const options = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
      };
     
   
      return this.http.put( URL, JSON.stringify(reservacion), options );
    }



   actualizarReservacionToPromise(reservacion, Cod_Usuario, Cod_Reservacion  ){
    return  this.putReservaciones( reservacion, Cod_Usuario, Cod_Reservacion ).toPromise();

   }



 async   syncReservaciones(canchas:Canchas[]){

  this.reservaciones = [];



  for(let c = 0; c < canchas.length; c++){
    this.alertasService.presentaLoading('Cargando datos..')
  await   this.syncReservacionesToPromise(canchas[c].Cod_Cancha).then(resp =>{

this.alertasService.loadingDissmiss();
    for(let i = 0; i < resp.length; i++){
      this.reservaciones.push(resp[i]) 
    }

  }, error =>{

    console.log('error')
  });
     
    }
    
    return this.reservaciones;
        
      }
    
   
  private  putReservacionEstado( Cod_Reservacion ,Cod_Estado){
    let URL = this.getURL( environment.putReservacionesEstadoURL);
    URL = URL + environment.codReservacion + Cod_Reservacion + environment.codEstadoParam2 + Cod_Estado;
    const options = {
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*'
      }
    };
   
 
    return this.http.put( URL, options );
  }

  private   deleteReservacion(Cod_Reservacion ){
  

    let URL = this.getURL( environment.reservacionesUrl);
        URL = URL + environment.codReservacion + Cod_Reservacion;


    const options = {
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*'
      }

      
    };
 
    return this.http.delete( URL, options );
  }
  
  deleteURL( api: string,id: string ){
    let test: string = ''
    if ( !environment.prdMode ) {
      test = environment.TestURL;
    }
    const URL = environment.preURL  + test +  environment.postURL + api + environment.codReservacion + id;
console.log(URL);
    return URL;
  }

  private   deleteReservaciones(Cod_Reservacion ){
  

    const URL = this.deleteURL( environment.reservacionesUrl, Cod_Reservacion);
    const options = {
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*'
      }

      
    };
   
 
    return this.http.delete( URL, options );
  }
  
  syncDeleteReservacion(Cod_Reservacion){
    return this.deleteReservacion(Cod_Reservacion).toPromise();
  }
   deleteReservacionToPromise(reservacion  ){
      return this.deleteReservaciones( reservacion.Cod_Reservacion ).toPromise();
    }












    // PROCESO RESERVACIONES



    /**
 * 
 * Creating Date Objects
 * There are 4 ways to create a new date object:
 *  https://www.w3schools.com/js/js_dates.asp
new Date()
new Date(year, month, day, hours, minutes, seconds, milliseconds)
new Date(milliseconds)
new Date(date string)
 * 
 * 
 */

private reservacionesFiltrarFecha( Cod_Cancha,Fecha){
 
  let URL = this.getURL( environment.FiltrarFecha);
  URL = URL +  environment.codCanchaParam + Cod_Cancha +  environment.fechaSecondParam + Fecha;
  console.log(URL,'url')
  return this.http.get<ReservacionesCanchasUsuarios[]>( URL );

}

 syncreservacionesFiltrarFecha(Cod_Cancha,Fecha){

 return  this.reservacionesFiltrarFecha(Cod_Cancha,Fecha).toPromise();


 }

 
      //=========================================================================================
      // FORMTO FECHA
      //==========================================================================================
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


      async generarArregloHorasDisponibles2(Cod_Cancha:number,start:number, end:number, date?:Date,){

        console.log(start,end,date,'nnnn')
       let horasArray:any[] =[];
       let dateToUse: Date = null;
      
  
      
      
      
      let year,month,day,hour,minutes,seconds,milliseconds = null;
      // DATA THAT DOES NOT CHANGE
      
      if(date ){
      
        if(date.getDate() === new Date().getDate()){
      
          dateToUse = new Date();
        
        }else{
        
          dateToUse = date;
        
        }
      
        year = dateToUse.getFullYear();;
        month = dateToUse.getMonth();
        day = dateToUse.getDate();
        hour = dateToUse.getHours();
        minutes = 0;
        seconds = 0;
        milliseconds = 0;
      }
      hour =  hour%12 == 0 ? 0 : hour
      let newStart =  start ? start :  hour;
      
       for (var i = start; i < end; ++i) {
         
        let element :any = null;
      let id = i;
      let hours = i;
      let time12 =   hours%12 == 0 ? 12 : hours%12;
      let meridiem =  i < 12 ? 'AM': 'PM';
      
      if(date != undefined){
         element = {
      id:id,
          year: year,
          month: month,
          day: day,
          hours: hours,
          minutes: minutes,
          seconds: seconds,
          milliseconds: milliseconds,
          time12: time12,
          meridiem: meridiem,
          date:  date ? new Date(year, month, day, hours, minutes, seconds, milliseconds) : null
        }
      }else{
         element = {
          id:id,
          hours: hours,
          time12: time12,
          meridiem: meridiem,
       
        }
      }
      
      horasArray.push(element)
      
       if(i == end -1){
      
      return horasArray;
      
      
       }
       }
      
      }


      // CALCULAR HORAS


       calHoraInicio(Cod_Cancha, Fecha){
         this.horarioCanchasService.syncHorarioCanchasPromise(Cod_Cancha).then(resp =>{

          this.horario = resp;
      
           let index = new Date(Fecha).getDay();
           this.diaActual =  this.horario[index];
           let apertura = this.horario[index].Hora_Inicio;
           let cierre = this.horario[index].Hora_Fin;
      
      
           this.compararFechas(Fecha, new Date()).then(resp =>{
      console.log('resp', resp)
            if(resp == 0 ){
              this.generarArregloHorasDisponibles22(Cod_Cancha,new Date().getMinutes() > 0 ? new Date().getHours()+1 : new Date().getHours(), cierre,new Date(),'Hora_Inicio').then(resp =>{
               
                return  this.horaInicioArray = resp;

                
              });
      
            }else if (resp == 1){
             
              this.generarArregloHorasDisponibles22(Cod_Cancha,apertura, cierre,new Date(Fecha),'Hora_Inicio').then(resp =>{
               
              return  this.horaInicioArray = resp;
      
                 
              });
            }
              
            
                });
      
      
      
      
      
        }); 
      


      }
      

      
      calHoraFin(Cod_Cancha, value){
 
        let Fecha = value.date;
 
        this.horarioCanchasService.syncHorarioCanchasPromise(Cod_Cancha).then(resp =>{

         this.horario = resp;
     
          let index = new Date(Fecha).getDay();
          this.diaActual =  this.horario[index];
          let apertura = value.hours+1;
          let cierre = this.horario[index].Hora_Fin+1;
     
     
          this.generarArregloHorasDisponibles22(Cod_Cancha,apertura, cierre,new Date(Fecha),'Hora_Fin').then(resp =>{
              
            return  this.horaFinArray = resp;
    
               
            });
     
     
     
     
     
       }); 
     


     }
     
     async generarArregloHorasDisponibles22(Cod_Cancha:number,start:number, end:number, date:Date,column){


     let horasArray:any[] =[];
     let dateToUse: Date = null;
    
     return this.syncreservacionesFiltrarFecha(Cod_Cancha ,this.formatoFecha(date,'-')).then(resp =>{
    let reservacionesDia = resp;
 
    
    
    
    
    let year,month,day,hour,minutes,seconds,milliseconds = null;
    // DATA THAT DOES NOT CHANGE
    
    if(date ){
    
      if(date.getDate() === new Date().getDate()){
    
        dateToUse = new Date();
      
      }else{
      
        dateToUse = date;
      
      }
    
      year = dateToUse.getFullYear();;
      month = dateToUse.getMonth();
      day = dateToUse.getDate();
      hour = dateToUse.getHours();
      minutes = 0;
      seconds = 0;
      milliseconds = 0;
    }
    hour =  hour%12 == 0 ? 0 : hour
    let newStart =  start ? start :  hour;
    
     for (var i = start; i < end; ++i) {
       
      let element :any = null;
    let id = i;
    let hours = i;
    let time12 =   hours%12 == 0 ? 12 : hours%12;
    let meridiem =  i < 12 ? 'AM': 'PM';
    
    if(date != undefined){
       element = {
    id:id,
        year: year,
        month: month,
        day: day,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        milliseconds: milliseconds,
        time12: time12,
        meridiem: meridiem,
        date:  date ? new Date(year, month, day, hours, minutes, seconds, milliseconds) : null
      }
    }else{
       element = {
        id:id,
        hours: hours,
        time12: time12,
        meridiem: meridiem,
     
      }
    }
    
    horasArray.push(element)
    
     if(i == end -1){
    
    
      if(reservacionesDia.length == 0){
        return horasArray;
      }
      for( let j = 0; j < reservacionesDia.length; j++){
    
       let index  = horasArray.findIndex (h => h.hours ==  new Date(reservacionesDia[j][column]).getHours());
    
       if(index >=0){
       horasArray.splice(index,1);
        console.log('reservacionesDia',new Date(reservacionesDia[j][column]).getHours())
       }
    
        if(j == reservacionesDia.length -1){
          return horasArray;
        }
        }
    
    
    
    
     }
     }
     
    
    
     })
    
    
    
    
    }
    
     
async generarArregloHorasDisponibles(Cod_Cancha:number,start:number, end:number, date?:Date,){

  console.log(start,end,date,'nnnn')
 let horasArray:any[] =[];
 let dateToUse: Date = null;






 let year,month,day,hour,minutes,seconds,milliseconds = null;
 // DATA THAT DOES NOT CHANGE
 
 if(date ){
 
   if(date.getDate() === new Date().getDate()){
 
     dateToUse = new Date();
   
   }else{
   
     dateToUse = date;
   
   }
 
   year = dateToUse.getFullYear();;
   month = dateToUse.getMonth();
   day = dateToUse.getDate();
   hour = dateToUse.getHours();
   minutes = 0;
   seconds = 0;
   milliseconds = 0;
 }
 hour =  hour%12 == 0 ? 0 : hour
 let newStart =  start ? start :  hour;
 
  for (var i = start; i < end; ++i) {
    
   let element :any = null;
 let id = i;
 let hours = i;
 let time12 =   hours%12 == 0 ? 12 : hours%12;
 let meridiem =  i < 12 ? 'AM': 'PM';
 
 if(date != undefined){
    element = {
 id:id,
     year: year,
     month: month,
     day: day,
     hours: hours,
     minutes: minutes,
     seconds: seconds,
     milliseconds: milliseconds,
     time12: time12,
     meridiem: meridiem,
     date:  date ? new Date(year, month, day, hours, minutes, seconds, milliseconds) : null
   }
 }else{
    element = {
     id:id,
     hours: hours,
     time12: time12,
     meridiem: meridiem,
  
   }
 }
 
 horasArray.push(element)
 
  if(i == end -1){
 
    return horasArray;
 
 
  }
  }
  
 




}


async compararFechas(date1,date2){
  
  const d1 = this.formatoFecha(new Date(date1), '/');
  const d2 = this.formatoFecha(new Date(date2), '/');
  
  if(d1 === d2){
  
  console.log('same day')
  return 0;
  
  }else if(d1 >= d2){

    console.log('day 1 higher')

    return 1;

  }else{
  
    console.log('day 1 less')
    
    return -1;
  
  }
    }

}
