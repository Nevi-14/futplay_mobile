import { Injectable } from '@angular/core';
interface horas{
  id:number,
  dia:string,
  fecha:string,
  formato12:string,
  hora_inicio: string
  hora_fin: string
}
@Injectable({
  providedIn: 'root'
})
export class DisponibilidadReservacionService {

  arregloHorasDisponibles :horas[]=[];

  constructor() { }


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
      //   VAMOS A GENERAR LAS HORAS DEL DIA 

      generarArregloHorasDisponibles(date){

        this.arregloHorasDisponibles = []

        let dateInput = new Date(date);
        
        dateInput.setHours(0,0,0,0)

 
        const x = this.formatoFecha(dateInput, '/'),
         y = this.formatoFecha(new Date(), '/');
        let 
        // OBTIENE DIA
        d =   x === y   ?  new Date () : new Date(dateInput) ,
        // OBTIENE HORA
        h = d.getHours(),
        // OBTIENE MINUTOS
    
        m = d.getMinutes(),
    // AM - PM
        meridiem = ['AM','PM'];
 
    
      // I = HORA ACTUAL LA CUAL VA A  INCREMENTAR EN CASO DE QUE SEA MENOR A 24 HORAS
    
    for (var i = h; i < 24; ++i) {
      let hour = i%12 == 0 ? 12 : i%12 ;
      let time12 = null;

      time12 = hour+ ':' + '00' + ' ' +  (i < 12 ? meridiem[0] : meridiem[1]);
          
     

      let time24 = i+ ':00:00';
      let formato24HoraFin = i+1+ ':00:00';

      const hora ={
        id:date.getDate(),
        dia:new Date(this.formatoFecha(new Date(dateInput), '/')).toLocaleString('es', {weekday:'long'}),
        fecha:this.formatoFecha(new Date(dateInput), '/'),
        formato12:time12,
        hora_inicio: time24,
        hora_fin: formato24HoraFin
        
      }

      this.arregloHorasDisponibles.push(hora);

  
    }
   
      }
  
      

// RETORNA AM - PM 
// ESTA FUNCION RETORNA  LA HORA EN FORMATO AM - PM DE CUALQUIER FECHA, EJEMPLO //09:00:00 AM - PM

retornaHoraAmPm(date){


  let hours = date.getHours();
  
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  hours = hours < 10 ? '0' + hours : hours;
  // appending zero in the start if hours less than 10
  minutes = minutes < 10 ? '0' + minutes : minutes;
  
  let hourValue = hours +':'+'00'+':'+'00'+' ' + ampm;
  
  
  return hourValue;
  
  }
  
  
}
