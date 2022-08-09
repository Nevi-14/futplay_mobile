import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { HorarioCanchas } from '../models/horarioCanchas';
import { ReservacionesCanchasUsuarios } from '../models/Reservaciones_Canchas_Usuarios';
import { AlertasService } from './alertas.service';
interface horas{
  formatoFin12:string,
  formato12:string,
  hora_inicio: string
  hora_fin: string
}
@Injectable({
  providedIn: 'root'
})
export class GenerarReservacionService {
stopLoading = 0;

diaConsulta = {

  fecha:null,
  id:null,
  dia:null

}
cancha = {
  
  cod_cancha:null,
  hora_inicio: null,
  hora_fin:null
  
  }
  horarioCancha:HorarioCanchas[] =[];
  reservacionesFiltroFecha:ReservacionesCanchasUsuarios[]=[];
  horasdiaConsulta:horas[] = [];
  horaSeleccionada = null;
  diaCompleto = 0;








  constructor(
    public http: HttpClient,
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



  private getHorarioCanchas( id){

    let URL = this.getURL( environment.horarioCanchasUrl);
          URL = URL +  environment.codCanchaParam + id;

    return this.http.get<HorarioCanchas[]>( URL );

  }

      //=========================================================================================
      // HORARIO CANCHA 
      //==========================================================================================
   syncHorarioCanchas(Cod_Cancha){

   return  this.getHorarioCanchas(Cod_Cancha).toPromise();


   }
   private reservacionesFiltrarFecha( Cod_Cancha,Fecha){
 
     let URL = this.getURL( environment.FiltrarFecha);
     URL = URL +  environment.codCanchaParam + Cod_Cancha +  environment.fechaParam + Fecha;
     console.log(URL,'url')
     return this.http.get<ReservacionesCanchasUsuarios[]>( URL );
 
   }
 
    syncreservacionesFiltrarFecha(Cod_Cancha,Fecha){
 
    return  this.reservacionesFiltrarFecha(Cod_Cancha,Fecha).toPromise();
 
 
    }

      //=========================================================================================
      // HORARIO CANCHA 
      //==========================================================================================
  
      
          generarReservacion(Cod_Cancha,Fecha){
            this.alertasService.presentaLoading('Verificando Horas Disponibles')
            this.horasdiaConsulta = []
            this.syncHorarioCanchas(Cod_Cancha).then(resp =>{


              if(resp){
      
                this.horarioCancha = resp.slice(0);
                console.log(this.horarioCancha,'this.horarioCancha','dia', new Date().getDay()+1)

              }
            }).then(resp =>{


console.log('completed')

this.syncreservacionesFiltrarFecha(Cod_Cancha,this.formatoFecha(Fecha, '-')).then(resp =>{


  if(resp){

    this.reservacionesFiltroFecha = resp.slice(0);
    console.log(this.reservacionesFiltroFecha,'this.reservacionesFiltroFecha')
  }
}).then(resp =>{


console.log('completed 2')






})

            })
          }

      //=========================================================================================
      // RESERVACIONES DIA
      //==========================================================================================



      //===========================================================================================
      // Fprmato HorA
      //============================================================================================
      


formatoHora(value){


  switch(value){

case 'AM':

break;

case 'PM':

break;

case 12:

break;

case 24:

break;
    default: ''
    return

  }


}

      //=========================================================================================
      //  HORAS TOTALES DIA
      //==========================================================================================










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



}
