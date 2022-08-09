import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Reservaciones } from '../models/reservaciones';
interface horas{
  formato12:string,
  formato14: string
}
@Injectable({
  providedIn: 'root'
})
export class ControlReservacionesService {
  reservacionesDia: Reservaciones[]=[];
  eventSource = [];
  fecha = null;
  arregloHorasDisponibles:horas[]=[];

  constructor(
    private http: HttpClient


  ) { }





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
  // OBTIENE LAS RESERVACIONES POR FECHA DE LA CANCHA
  syncReservacionesFecha(Cod_Cancha,Fecha){

    this.fecha = this.formatoFecha(new Date(Fecha), '-')
    this.getReservacionesFecha(Cod_Cancha,this.fecha ).subscribe(
      resp =>{
    /**
     * RETORNA
     * 
     *  {
        "Cod_Usuario": number,
        "Nombre_Usuario": string,
        "Usuario_Primer_Apellido": string,
        "Usuario_Segundo_Apellido": string,
        "Foto": string,
        "Cod_Cancha": number,
        "Nombre_Cancha": string,
        "Cod_Reservacion": number,
        "Reservacion_Externa": boolean,
        "diaCompleto": boolean,
        "Titulo": string,
        "Fecha": date,
        "Hora_Inicio": string, Formart -> "00:00:00"
        "Hora_Fin": string,  Formart -> "00:00:00"
        "Estado": boolean,
        "Descripcion": string,
    }


     */
        this.reservacionesDia  = [];
     
        this.reservacionesDia  = resp;
        this.reservacionesDia.forEach(reservacion =>{

          this.generarEventSource(reservacion);
        })

        console.log(this.eventSource,'eventSource')
      }
    
    );
  }

  setTime(date){

    if(date){
      return    date.getHours()+ ':00:00';
    }
  
}



  //   VAMOS A GENERAR LAS HORAS DEL DIA 

  generarArregloHorasDisponibles(){

    let 
    // OBTIENE DIA
    d = new Date(),
    // OBTIENE HORA
    h = d.getHours(),
    // OBTIENE MINUTOS

    m = d.getMinutes(),
// AM - PM
    meridiem = ['AM','PM'];
   // 15 - 30 - 15
   let  step =0;

  // I = HORA ACTUAL LA CUAL VA A  INCREMENTAR EN CASO DE QUE SEA MENOR A 24 HORAS

for (var i = h; i < 24; ++i) {

    for (var j = i==h ? Math.ceil(m/step) : 0; j < 1; ++j) {

      let time12 = i%12 + ':' + (j*step||'00') + ' ' + meridiem[i/12|0]
      let time24 = i+ ':' + (j*step||'00') + ' ' + meridiem[i/12|0]
      if(time12 !='11:00 PM'){
        const hora ={
          formato12:time12,
          formato14: time24
        }

        this.arregloHorasDisponibles.push(hora);

      }
 
       
    }
}

console.log(this.arregloHorasDisponibles)
  }


  agregarDiasFecha(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);

    console.log(result, 'result')
    return result;
  }





generarEventSource(reservacion){

  this.eventSource.push({
    id: reservacion.Cod_Reservacion,
    title: reservacion.Titulo,
    foto: reservacion.Foto,
    Hora_Inicio:  reservacion.Hora_Inicio,
    Hora_Fin: reservacion.Hora_Fin,
    startTime:reservacion.Hora_Inicio ,
    endTime:reservacion.Hora_Fin,
    desc:reservacion.Descripcion,
    allDay: false
});
}









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

}
