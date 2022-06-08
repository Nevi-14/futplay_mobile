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




this.generarArregloHorasDisponibles(Fecha)

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


      generarArregloHorasDisponibles(date){


        // Extraemos el valor del horario de la cancha

        let index =  this.horarioCancha.findIndex(cancha => cancha.Cod_Dia ===  date.getDay()+1 )
        this.alertasService.loadingDissmiss()
        if(this.horarioCancha[index].Estado == false){
          this.alertasService.loadingDissmiss()
          this.alertasService.message('Futplat', 'Cancha no disponible')
          return
         }
         // Extraemos el valor de inicio y fin del dia a consultar
         let open = Number(this.horarioCancha[index].Hora_Inicio.match(/([0-9]{1,2})/).slice(1));
         let start = 0
         let end = Number(this.horarioCancha[index].Hora_Fin.match(/([0-9]{1,2})/).slice(1));

        const d1 = this.formatoFecha(new Date(date), '/');
        const d2 = this.formatoFecha(new Date(), '/');
    if(d1 === d2){
      let newStart = new Date().getHours();
      let minutes = new Date().getMinutes();

  if(open > newStart ){

    start = open;
  }else{
if(minutes > 0){
  start = newStart +1;
    
}else{
  start = newStart;
    
}
  }
 
      
    }else{
      start =  Number(this.horarioCancha[index].Hora_Inicio.match(/([0-9]{1,2})/).slice(1)); 
    }

 console.log(start, 'start')
 if(start > open){
  this.alertasService.loadingDissmiss()

  console.log(this.horarioCancha[index],'this.horarioCancha[index]')
  return
 }
       for (var i = start; i < end; ++i) {
this.stopLoading  = i;
// Extraemos valores generales como valor hora,  formato 12 horas - 24 horas  y hora fin en formato 24 horas

       let hour = i%12 == 0 ? 12 : i%12 ;
       let  time12 =   hour+ ':' + '00' + ' ' +  (i < 12 ? 'AM': 'PM')
       let  formatoFin12 =   hour + 1+ ':' + '00' + ' ' +  (i < 12 ? 'AM': 'PM')
       let startTime24 =  i+ ':00:00';
       let endTime24 = i+1+ ':00:00';

       const hora ={

        dia:new Date(date).toLocaleString('es', {weekday:'long'}),
        fecha:this.formatoFecha(new Date(date), '/'),
        formato12:time12,
        formatoFin12: formatoFin12,
        hora_inicio: startTime24,
        hora_fin: endTime24
       }


       this.horasdiaConsulta.push(hora);

       if(i == end -1){
      
   for(let j = 0; j < this.reservacionesFiltroFecha.length; j++){

    let h = this.horasdiaConsulta.findIndex(
      
      hora => hora.hora_inicio  === String(this.reservacionesFiltroFecha[j].Hora_Inicio)
      
      )
      
    this.horasdiaConsulta.splice(h, 1)


        }
    
   //     this.alertasService.loadingDissmiss()
  
        this.horaSeleccionada = this.horasdiaConsulta[0].hora_inicio;
//alert(this.horaSeleccionada)
this.diaCompleto = 0;
this.diaCompleto = this.reservacionesFiltroFecha.filter(guia => guia.diaCompleto == true).length

console.log(this.horasdiaConsulta, 'horasdiaConsulta')
       }
       if(this.stopLoading ==  end){
        this.alertasService.loadingDissmiss()
      }

       }

   
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



}
