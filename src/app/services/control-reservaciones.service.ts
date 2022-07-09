import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ListaCanchasService } from './lista-canchas.service';
import { HorarioCanchasService } from './horario-canchas.service';
import { ReservacionesService } from './reservaciones.service';
import { ConfirmacionReservaciones } from '../models/confirmacionReservacion';
import { HistorialPartidoService } from './historial-partido.service';
import { GestionRetos } from '../models/gestionRetos';

interface horas{
  formato12:string,
  hora_inicio: string
  hora_fin: string
}
@Injectable({
  providedIn: 'root'
})
export class ControlReservacionesService {

  reservacionesDia: GestionRetos[]=[];
  fecha = null;
  arregloHorasDisponibles :horas[]=[];
  mesesDisponibles =[];

  constructor(
    private http: HttpClient,
    // PARA CARGAR LA INFORMACION DE LA CANCHA ACTUAL
    public canchasService: ListaCanchasService,
    // PARA CARGAR LA INFORMACION DEL HORARIO DE LA CANCHA
    public horarioCanchasService: HorarioCanchasService,
    public reservacionesService: ReservacionesService,
    public historialPartidoService: HistorialPartidoService

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
    return this.http.get<GestionRetos[]>( URL );


  }
  // OBTIENE LAS RESERVACIONES POR FECHA DE LA CANCHA
  syncReservacionesFecha(Cod_Cancha,Fecha){

this.borrarDatosControlReservaciones();
    this.fecha = this.formatoFecha(new Date(Fecha), '/')
this.agregarMesesDisponibles();

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

    const x = new Date(this.formatoFecha(new Date(Fecha), '/'))
    const y = new Date(this.formatoFecha(new Date(), '/'));
    
    /**
     * 
     *  less than, greater than is fine:
        console.log('x < y', x < y); // false
        console.log('x > y', x > y); // false
        console.log('x <= y', x <= y); // true
        console.log('x >= y', x >= y); // true
        console.log('x === y', x === y); // false, oops!

        // anything involving '==' or '===' should use the '+' prefix
      // it will then compare the dates' millisecond values

      console.log('+x === +y', +x === +y); // true
     * 
     * 
     */

        this.reservacionesDia  = resp;
   
        if(x >= y){
          
          let fecha = +x === +y ? new Date() : this.formatoFecha(new Date(Fecha), '/')
          this.generarArregloHorasDisponibles(fecha)
          console.log(this.reservacionesDia,'reservacionesDia')
        }

      }
    
    );


  }




  //   VAMOS A GENERAR LAS HORAS DEL DIA 

  generarArregloHorasDisponibles(date){

    const x = this.formatoFecha(new Date(date), '/');
    const y = this.formatoFecha(new Date(), '/');

    let 
    // OBTIENE DIA
    d =   +x === +y   ? new Date() : new Date(date),
    // OBTIENE HORA
    h = d.getHours(),
    // OBTIENE MINUTOS

    m = d.getMinutes(),
// AM - PM
    meridiem = ['AM','PM'];
   // 15 - 30 - 15
   let  step =15;

   console.log(date, d,'date','h',h,'m',m)

  // I = HORA ACTUAL LA CUAL VA A  INCREMENTAR EN CASO DE QUE SEA MENOR A 24 HORAS

for (var i = h; i < 24; ++i) {

    for (var j = i==h ? Math.ceil(m/step) : 0; j < 1; ++j) {
      let hour = i%12 == 0 ? 12 : i%12 ;
      
      let time12 = hour+ ':' + (j*step||'00') + ' ' + meridiem[i/12|0]
      let formato12HoraFin = hour + 1+ ':' + (j*step||'00') + ' ' + meridiem[i/12|0]

      let time24 = i+ ':00:00';
      let formato24HoraFin = i+1+ ':00:00';

      if(time12 !='11:00 PM'){
        const hora ={
          formato12:time12,
          formato12HoraFin:formato12HoraFin,
          hora_inicio: time24,
          hora_fin: formato24HoraFin
          
        }

        this.arregloHorasDisponibles.push(hora);

      }
 
       
    }
}

console.log(this.arregloHorasDisponibles)
  }


  agregarMesesDisponibles(){
    
    let months = new Date().getMonth();

    console.log(months, 'months')
 
    for(let i =  months ; i <= 11 ; i++ ){

this.mesesDisponibles.push(i+1);

    }
  }
  agregarDiasFecha(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);

    console.log(result, 'result')
    return result;
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


  borrarDatosControlReservaciones(){

  this.fecha = null;  
  this.reservacionesDia = [];
  this.arregloHorasDisponibles = [];
  this.mesesDisponibles = [];
  this.arregloHorasDisponibles = [];


  }



  postReservacion(reservacion, cancha, rival, retador){

   // this.reservacionesService.insertarReservacion(reservacion, cancha, rival, retador)
  }

  putURL( api: string ){


    let test: string = ''

    if ( !environment.prdMode ) {

      test = environment.TestURL;

    }

    const URL = environment.preURL  + test +  environment.postURL + api 
    console.log(URL)

    return URL;
  }

     // PUT: api/usuarios/?Cod_Usuario= 2   ACTUALIZAR USUARIO


     private   putReservacion( reservacion,Cod_Usuario, Cod_Reservacion ){

      let  URL = this.putURL( environment.actualizarReservacionURL);
       URL = URL  + environment.codUsuarioParam + Cod_Usuario + environment.codReservacionParam +Cod_Reservacion;
   
      console.log(URL,'URL', 'reser', reservacion)
   
       const options = {

        headers: {

            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'

        }

      };
     
   
      return this.http.put( URL, JSON.stringify(reservacion), options );
    }

    actualizarReservacion(reservacion,Cod_Usuario, Cod_Reservacion  ){


      this.putReservacion( reservacion,Cod_Usuario, Cod_Reservacion  ).subscribe(
        resp => {
              const Historia_PartidosRival = {
                Cod_Partido : null,
                Cod_Reservacion: Cod_Reservacion,
                Cod_Equipo  : reservacion.Cod_Rival,
                Verificacion_QR  : false,
                Goles_Retador : 0,
                Goles_Rival : 0,
                Estado : 0

              }
              const Historia_PartidosRetador= {
                Cod_Partido : null,
                Cod_Reservacion: Cod_Reservacion,
                Cod_Equipo  : reservacion.Cod_Retador,
                Verificacion_QR  : false,
                Goles_Retador : 0,
                Goles_Rival : 0,
                Estado : 0

              }
         console.log('reservacion actualizada', resp)
console.log('historuak 1', Historia_PartidosRival)
console.log('historuak 2', Historia_PartidosRetador)
         this.historialPartidoService.iniciarPartido(Historia_PartidosRival)
         this.historialPartidoService.iniciarPartido(Historia_PartidosRetador)
        }, error => {
          console.log('error', error)
        }
      )
    }

}
