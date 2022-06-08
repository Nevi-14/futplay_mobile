import { Injectable } from '@angular/core';
import { HorarioCanchas } from '../models/horarioCanchas';
import { ReservacionesCanchasUsuarios } from '../models/Reservaciones_Canchas_Usuarios';
import { AlertasService } from './alertas.service';
interface horas{
  formatoFin12:string,
  formato12:string,
  hora_inicio: string
  hora_fin: string
}
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
export class LogicaReservacionService {
stopLoading = 0;
diaConsulta = {
  fecha:null,
  id:null,
  dia:null

}
reservacionesFiltroFecha:ReservacionesCanchasUsuarios[]=[];
horaInicioArray:objetoFecha[] = [];
horaFinArray:objetoFecha[] = [];
horaSeleccionada = null;
diaCompleto = 0;
  constructor(
   public alertasService: AlertasService

  ) { }


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


async generarArregloHorasDisponibles(start:number, end:number, date?:Date,){

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


}
