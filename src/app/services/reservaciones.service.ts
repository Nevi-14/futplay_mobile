import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AlertasService } from './alertas.service';
import { Reservaciones } from '../models/reservaciones';
import { format } from 'date-fns';
import { HorarioCanchasService } from './horario-canchas.service';
import { HorarioCanchas } from '../models/horarioCanchas';
import { DetalleReservaciones } from '../models/detalleReservaciones';
import { PerfilReservaciones } from '../models/perfilReservaciones';
import { UsuariosService } from './usuarios.service';
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
interface horaA {

  Hora_Inicio: number,
  Hora_Fin: number
}
@Injectable({
  providedIn: 'root'
})
export class ReservacionesService {
horaInicioArray:objetoFecha[] = [];
horaFinArray:objetoFecha[] = [];
horario:HorarioCanchas[];
diaActual:HorarioCanchas;
reservaciones:PerfilReservaciones[]=[]
reservacionesDia:PerfilReservaciones[]=[]
reservacionesAbiertas:PerfilReservaciones[]=[]
segment = 0;
constructor(

public http: HttpClient,
public alertasService: AlertasService,
public horarioCanchasService: HorarioCanchasService,
public usuariosService: UsuariosService


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


  
  private getReservacionesCanchaFecha(Cod_Cancha, Fecha_Inicio, Fecha_Fin){

    let URL = this.getURL( environment.getReservacionesCanchaFechaURL);
         URL = URL + Cod_Cancha+'/'+Fecha_Inicio+'/'+Fecha_Fin;
console.log('filtrarREservacionesFecha',URL)
    return this.http.get<Reservaciones[]>( URL );

  }
  private getDisponibilidadReservaciones(Cod_Cancha, Hora_Inicio, Hora_Fin){

    let URL = this.getURL( environment.getConsultarDisponiblidadReservacionURL);
         URL = URL + Cod_Cancha+'/'+Hora_Inicio+'/'+Hora_Fin;
console.log('filtrarREservacionesFecha',URL)
    return this.http.get<Reservaciones[]>( URL );

  }

  syncGetDisponibilidadReservaciones(Cod_Cancha, Hora_Inicio, Hora_Fin){

    return this.getDisponibilidadReservaciones(Cod_Cancha, Hora_Inicio, Hora_Fin).toPromise();
  }
  syncGetReservacionesCanchaFechaToPromise(Cod_Cancha, Fecha_Inicio, Fecha_Fin){

    return this.getReservacionesCanchaFecha(Cod_Cancha, Fecha_Inicio, Fecha_Fin).toPromise();
  }
  
  private getReservacionesMovil(Cod_Usuario){

    let URL = this.getURL( environment.getReservacionesMovilURL);
         URL = URL + Cod_Usuario;
console.log('PerfilReservaciones',URL)
    return this.http.get<PerfilReservaciones[]>( URL );

  }
  private getReservacionesEnviadas(Cod_Usuario){

    let URL = this.getURL( environment.getReservacionesEnviadasURL);
         URL = URL + Cod_Usuario;
console.log('PerfilReservaciones',URL)
    return this.http.get<PerfilReservaciones[]>( URL );

  }
  private getReservacionesResvision(Cod_Usuario){

    let URL = this.getURL( environment.getReservacionesRevisionURL);
         URL = URL + Cod_Usuario;
console.log('PerfilReservaciones',URL)
    return this.http.get<PerfilReservaciones[]>( URL );

  }
  private getReservacionesCanceladas(Cod_Usuario){

    let URL = this.getURL(environment.getReservacionesCanceladasURL);
         URL = URL + Cod_Usuario;
console.log('PerfilReservaciones',URL)
    return this.http.get<PerfilReservaciones[]>( URL );

  }

  private getReservacionesAbiertas(){

    let URL = this.getURL(environment.getReservacionesAbiertasURL);
         URL = URL  
console.log('PerfilReservaciones',URL)
    return this.http.get<PerfilReservaciones[]>( URL );

  }

  


  private getReservacionesHistorial(Cod_Usuario){

    let URL = this.getURL( environment.getReservacionesHistorialURL);
         URL = URL + Cod_Usuario;
console.log('PerfilReservaciones',URL)
    return this.http.get<PerfilReservaciones[]>( URL );

  }
  private getReservcionesFuturas(Cod_Equipo, Fecha){

    let URL = this.getURL( environment.getReservacionesFuturas);
         URL = URL + Cod_Equipo + '/' + Fecha;
console.log('PerfilReservaciones',URL)
    return this.http.get<PerfilReservaciones[]>( URL );

  }
  
  private getReservacionesRecibidas(Cod_Usuario){

    let URL = this.getURL( environment.getReservacionesRecibidassURL);
         URL = URL + Cod_Usuario;
console.log('PerfilReservaciones',URL)
    return this.http.get<PerfilReservaciones[]>( URL );

  }

  private getReservacionesConfirmadas(Cod_Usuario){

    let URL = this.getURL( environment.getReservacionesConfirmadassURL);
         URL = URL + Cod_Usuario;
console.log('PerfilReservaciones',URL)
    return this.http.get<PerfilReservaciones[]>( URL );

  }
   private postReservaciones (reservacion){
    let URL = this.getURL( environment.postReservacionCanchaURL );

    URL = URL + reservacion.Cod_Cancha
    const options = {
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*'
      }
    };
   

    console.log('post', reservacion, 'URL', URL)
    return this.http.post( URL, JSON.stringify(reservacion), options );
  }
  private postDetalleReservacion (detalle:DetalleReservaciones){
   let URL = this.getURL( environment.postDetalleReservacionURL );

   URL = URL + detalle.Cod_Reservacion
   const options = {
     headers: {
         'Content-Type': 'application/json',
         'Accept': 'application/json',
         'Access-Control-Allow-Origin': '*'
     }
   };
  

   console.log('post detalle', detalle, 'URL', URL)
   return this.http.post( URL, JSON.stringify(detalle), options );
 }
 private putDetalleReservacion (detalle:DetalleReservaciones){
  let URL = this.getURL( environment.putDetalleReservacionURL );

  URL = URL + detalle.Cod_Detalle
  const options = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
  };
 

  console.log('post detalle', detalle, 'URL', URL)
  return this.http.put( URL, JSON.stringify(detalle), options );
}

private puttReservaciones (reservacion:Reservaciones){
  let URL = this.getURL( environment.putReservacionURL );
  URL = URL + reservacion.Cod_Reservacion
  URL = URL + reservacion.Cod_Cancha
  const options = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
  };
 

  console.log('post', reservacion, 'URL', URL)
  return this.http.put( URL, JSON.stringify(reservacion), options );
}
 


syncGetReservcionesFuturas(Cod_Equipo, Fecha){

  return     this.getReservcionesFuturas(Cod_Equipo, Fecha).toPromise();



}
syncGetReservacionesAbiertasToPromise(){

  return  this.getReservacionesAbiertas().toPromise();



}


syncPutReservacione(reservacion:Reservaciones){

  return     this.puttReservaciones(reservacion).toPromise();



}
syncPutDetalleReservaion(detalle:DetalleReservaciones){

  return     this.putDetalleReservacion(detalle).toPromise();



}
syncGetReservacionesResvision(Cod_Usuario){

  return     this.getReservacionesResvision(Cod_Usuario).toPromise();



}

syncGetReservacionesCanceladas(Cod_Usuario){

  return     this.getReservacionesCanceladas(Cod_Usuario).toPromise();



}



  insertarReservacionToPromise(reservacion){

    return     this.postReservaciones(reservacion).toPromise();



  }

  syncgGtReservacionesMovil(Cod_Usuario){

    return     this.getReservacionesMovil(Cod_Usuario).toPromise();



  }
  syncgGtReservacionesEnviadas(Cod_Usuario){

    return     this.getReservacionesEnviadas(Cod_Usuario).toPromise();



  }

  syncgGtReservacionesHistorial(Cod_Usuario){

    return     this.getReservacionesHistorial(Cod_Usuario).toPromise();



  }

  
  syncgGtReservacionesRecibidas(Cod_Usuario){

    return     this.getReservacionesRecibidas(Cod_Usuario).toPromise();



  }

  syncgGtReservacionesConfirmadas(Cod_Usuario){

    return     this.getReservacionesConfirmadas(Cod_Usuario).toPromise();



  }

  insertarDetalleReservacionToPromise(detalle:DetalleReservaciones){

    return     this.postDetalleReservacion(detalle).toPromise();



  }

  private   deleteReservacion(Cod_Reservacion ){
  

    let URL = this.getURL( environment.deleteReservacionesURL);
        URL = URL + Cod_Reservacion;


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
private reservacionesFiltrarFecha( Cod_Cancha,Fecha){
 
  let URL = this.getURL( environment.getReservacionesCanchaFechaURL);
  URL = URL+ Cod_Cancha +'/' + Fecha;
  console.log(URL,'url')
  return this.http.get<Reservaciones[]>( URL );

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


      consultarHoras(horario:HorarioCanchas[],fecha:Date){
       
        let  continuar = false;  
      
        
        let indexDiaActual =  fecha.getDay();
        let diaActual =  horario[indexDiaActual];

        if(!diaActual.Estado){
            continuar = false;
            return {continuar , diaActual}
          }
        if(fecha.getTime() > new Date().getTime()){
            continuar = true;
            return {continuar , diaActual}
          }
        let apertura = diaActual.Hora_Inicio;
        let cierre =  diaActual.Hora_Fin;
      
        let formatedDareFromCalendar = format(fecha,'yyyy/MM/dd');
        let todayDateFormated  = format(fecha,'yyyy/MM/dd');
        console.log('fecha', fecha)
console.log('horario', horario)
console.log('diaActual', diaActual)
fecha.setHours(apertura);
        if(formatedDareFromCalendar == todayDateFormated){
          fecha = new Date();
        }else{

          fecha.setMinutes(0);
          fecha.setSeconds(0)
          fecha.setMilliseconds(0);
        }
      
        let horaActual = fecha.getHours();
      
      
        if( horaActual >= apertura &&  horaActual <  cierre){
    continuar = true
      
        }else{
       continuar = false;
        }

console.log('horaActual',horaActual,'apertura',apertura,'cierre',cierre)

        return {continuar , diaActual}
        
      }

      // CALCULAR HORAS


    // CALCULAR HORAS


    calHoraInicio(Cod_Cancha, date: Date) {

      let indexDiaActual = date.getDay();
      this.diaActual = this.horario[indexDiaActual];
  
      let apertura = this.horario[indexDiaActual].Hora_Inicio;
      let cierre = this.horario[indexDiaActual].Hora_Fin;
      let today = new Date()
      let formatedDareFromCalendar = format(date, 'yyyy/MM/dd');
      let todayDateFormated = format(today, 'yyyy/MM/dd');
  
      let horaInicial, horaFin, fecha = null;
      horaFin = cierre
  
      if (formatedDareFromCalendar == todayDateFormated) {
  
        // comparar hora actual con hora de apertura
  
        if (today.getHours() > apertura) {
          let hours = today.getHours();
          let minutes = today.getMinutes();
          let seconds = today.getSeconds();
          let milliseconds = today.getMilliseconds();
  
          horaInicial = hours;
          date.setHours(hours);
          date.setMinutes(minutes);
          date.setSeconds(seconds)
          date.setMilliseconds(milliseconds);
          fecha = date;
  
        } else {
  
          horaInicial = apertura;
          date.setHours(apertura);
          date.setMinutes(0);
          date.setSeconds(0)
          date.setMilliseconds(0);;
          fecha = date;
  
  
        }
  
  
      } else {
  
  
        let hours = date.getHours();
        let minutes = 0;
        let seconds = 0;
        let milliseconds = 0;
  
        if (hours > apertura) {
          horaInicial = hours;
        } else {
  
          horaInicial = apertura;
        }
        date.setHours(hours);
        date.setMinutes(minutes);
        date.setSeconds(seconds)
        date.setMilliseconds(milliseconds);
        fecha = date;
  
  
  
        console.log('horaInicial', horaInicial)
        console.log('horaFin', horaFin)
  
        console.log('fecha', fecha)
  
      }
  
      this.rellenarArreglo(Cod_Cancha, horaInicial, cierre, fecha, 'Hora_Inicio').then(resp => {
        console.log('this.horaInicioArray', resp)
        this.horaInicioArray = resp;
        return 
      })
  
  
    }
  
      

      
      calHoraFin(Cod_Cancha, value){
        this.horaFinArray = [];
        let Fecha = value.date;
console.log(Fecha, 'fecha', 'value',value)
let index = Fecha.getDay();
this.diaActual =  this.horario[index];

console.log( this.diaActual ,' this.diaActual ')
let apertura = value.hours+1;
let cierre = this.horario[index].Hora_Fin+1;


this.rellenarArreglo(Cod_Cancha,apertura, cierre,Fecha,'Hora_Fin').then(resp =>{
    
  return  this.horaFinArray = resp;

     
  })

     }
     
     async rellenarArreglo2(Cod_Cancha:number,start:number, end:number, date:Date,column){


     let horasArray:any[] =[];
        
  
    let year,month,day,hour,minutes,seconds,milliseconds = null;
    // DATA THAT DOES NOT CHANGE
      console.log('hora inicio', date)
    year = date.getFullYear();
      month = date.getMonth();
      day = date.getDate();
      hour = date.getHours();
      minutes = 0;
      seconds = 0;
      milliseconds = 0;
    hour =  hour%12 == 0 ? 0 : hour
    

     for (var i = start; i < end; ++i) {
       
    let id = i;
    let hours = i;
    let time12 =   hours%12 == 0 ? 12 : hours%12;
    let meridiem =  i < 12 ? 'AM': 'PM';

    let fecha = new Date(format(date,'yyyy/MM/dd'));
    fecha.setHours(hours)
    console.log('fecha', fecha)
    
    let element = {
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
          date:  fecha 
        }
    
    horasArray.push(element)

    if(i == end -1){
 console.log('horasArray', horasArray)

 return [];
    }
    
/**
 *      if(i == end -1){
    
    
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
 */
     }
     
  
     return this.syncreservacionesFiltrarFecha(Cod_Cancha ,format(date, 'yyyy-MM-dd')).then(resp =>{
    let reservacionesDia = resp;
 
    
 
    
    
     })
    
    
    
    
    }
    
     
    async rellenarArreglo(Cod_Cancha:number,start:number, end:number, date:Date,column){


      let horasArray:any[] =[];
   
      return this.syncreservacionesFiltrarFecha(Cod_Cancha ,format(date, 'yyyy-MM-dd')).then(resp =>{
     let reservacionesDia = resp;
  
  let horas:horaA[] = [];
  if(reservacionesDia.length == 0){
  
    return this.TimeArrayFunction(reservacionesDia,horas,date,start,end,column);
  }
  
     for(let i =0; i < reservacionesDia.length; i++){
  
      console.log('reservacionesDia', reservacionesDia[i])
      let inicio = new Date( reservacionesDia[i].Hora_Inicio).getHours();
      let fin = new Date( reservacionesDia[i].Hora_Fin).getHours();
      for(let j = inicio; j < fin; j++){
  
        let hora = {
          Hora_Inicio: j,
          Hora_Fin: j+1
        }
  
        horas.push(hora)
        
      }
  
      if(i == reservacionesDia.length -1){
  console.log('horas, init', horas)
        return this.TimeArrayFunction(reservacionesDia,horas,date,start,end,column);
      }
     }
  
     
     
      })
     
     
     
     
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
    async TimeArrayFunction(reservacionesDia, horas: horaA[], date, start, end, column) {

      let horasArray: any[] = [];
      let year, month, day, hour, minutes, seconds, milliseconds = null;
  
      year = date.getFullYear();
      month = date.getMonth();
  
      hour = new Date().getHours() == date.getHours() ? date.getHours() + 1 : date.getHours();
  
      minutes = 0;
      seconds = 0;
      milliseconds = 0;
      hour = hour % 12 == 0 ? 0 : hour
  
      for (var a = start == new Date().getHours() ? start + 1 : start; a < end; ++a) {
  
        let id = a;
        let hours = a;
        let time12 = hours % 12 == 0 ? 12 : hours % 12;
        let meridiem = a < 12 ? 'AM' : 'PM';
        let fecha = new Date(format(new Date(date), 'yyyy/MM/dd'));
        fecha.setHours(hours)
  
        let element = {
          id: id,
          year: year,
          month: month,
          day: day,
          hours: hours,
          minutes: minutes,
          seconds: seconds,
          milliseconds: milliseconds,
          time12: time12,
          meridiem: meridiem,
          date: fecha
        }
  
        horasArray.push(element)
  
        if (a == end - 1) {
  
  
          if (reservacionesDia.length == 0) {
  
            return horasArray;
  
          }
  
  
          for (let j = 0; j < horas.length; j++) {
  
            let index = horasArray.findIndex(h => h.hours == horas[j][column]);
  
            if (index >= 0) {
  
              horasArray.splice(index, 1);
  
            }
  
            if (j == horas.length - 1) {
  
              return horasArray;
  
            }
  
          }
  
  
  
  
        }
      }
  
  
  
    }




    // reservaciones

    async   selectCategory(){
  
  
        switch(this.segment){
       
          case 0:
           // confirmados
   
           this.syncgGtReservacionesConfirmadas(this.usuariosService.usuarioActual.usuario.Cod_Usuario).then(reservaciones =>{
             this.reservaciones = reservaciones;
             console.log('reservaciones', this.reservaciones)
   
           })
            break;
    
          case 1:
    
     // recibidos
     this.syncgGtReservacionesRecibidas(this.usuariosService.usuarioActual.usuario.Cod_Usuario).then(reservaciones =>{
       this.reservaciones = reservaciones;
       console.log('reservaciones', this.reservaciones)
   
     })
         break;
          case 2:
       // enviados
       this.syncgGtReservacionesEnviadas(this.usuariosService.usuarioActual.usuario.Cod_Usuario).then(reservaciones =>{
         this.reservaciones = reservaciones;
       
         console.log('reservaciones', this.reservaciones)
       })
          break;
          
          case 3:
        //hisyotial
        this.syncgGtReservacionesHistorial(this.usuariosService.usuarioActual.usuario.Cod_Usuario).then(reservaciones =>{
         this.reservaciones = reservaciones;
       
         console.log('reservaciones', this.reservaciones)
       })
          break;
          
          case 4:
           this.syncGetReservacionesResvision(this.usuariosService.usuarioActual.usuario.Cod_Usuario).then(reservaciones =>{
             this.reservaciones = reservaciones;
           
             console.log('reservaciones', this.reservaciones)
           })
   
          break;
          case 5:
           this.syncGetReservacionesCanceladas(this.usuariosService.usuarioActual.usuario.Cod_Usuario).then(reservaciones =>{
             this.reservaciones = reservaciones;
           
             console.log('reservaciones', this.reservaciones)
           })
   
          break;
          default:
           this.reservaciones = []
            break;
        }
      
        

      
    
           }
}
