import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ReservacionesCanchasUsuarios } from '../models/Reservaciones_Canchas_Usuarios';
import { AlertasService } from './alertas.service';
import { Canchas } from '../models/canchas';
import { HorarioCanchas } from '../models/horarioCanchas';
import { HorarioCanchasService } from './horario-canchas.service';
import { GestionRetos } from '../models/gestionRetos';
import { VideoScreenPage } from '../pages/video-screen/video-screen.page';
import { MisReservacionesPage } from '../pages/mis-reservaciones/mis-reservaciones.page';
import { ModalController } from '@ionic/angular';
import { Reservaciones } from '../models/reservaciones';
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
retos :GestionRetos[] = [];

constructor(

public http: HttpClient,
public alertasService: AlertasService,
public horarioCanchasService: HorarioCanchasService,
public modalCtrl: ModalController


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



    private   putReservacion( reservacion,Cod_Usuario, Cod_Reservacion ){

      let  URL = this.getURL( environment.actualizarReservacionURL);
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

    actualizarReservacionToPromise(reservacion,Cod_Usuario, Cod_Reservacion  ){
   return    this.putReservacion( reservacion,Cod_Usuario, Cod_Reservacion  ).toPromise()
      }

 async   syncReservaciones(canchas:Canchas[]){

  this.reservaciones = [];



  for(let c = 0; c < canchas.length; c++){

  await   this.syncReservacionesToPromise(canchas[c].Cod_Cancha).then(resp =>{

    for(let i = 0; i < resp.length; i++){
      this.reservaciones.push(resp[i]) 
    }

  }, error =>{
    this.alertasService.message('FUTPLAY', 'Error sincronizando reservaciones');

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

 syncPutReservacion(Cod_Reservacion ,Cod_Estado){

  return this.putReservacionEstado(Cod_Reservacion ,Cod_Estado).toPromise();
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

syncHorario(Cod_Cancha){
  this.horarioCanchasService.syncHorarioCanchasPromise(Cod_Cancha).then(resp =>{
    this.horario = resp;

})
}

async  cancularHora(Fecha,Inicio){

  let horas = [];

  let index = new Date(Fecha).getDay();
  this.diaActual =  this.horario[index];
  let apertura = null;
  if(Inicio  != undefined && Inicio !=null){
    apertura = Inicio
  }else{
    apertura = this.horario[index].Hora_Inicio;
  }
  let cierre = this.horario[index].Hora_Fin;

     
    
    
    
  let year,month,day,hour,minutes,seconds,milliseconds = null;
  // DATA THAT DOES NOT CHANGE
  
  year = Fecha.getFullYear();;
  month = Fecha.getMonth();
  day = Fecha.getDate();
  hour = Fecha.getHours();
  minutes = 0;
  seconds = 0;
  milliseconds = 0;

  hour =  hour%12 == 0 ? 0 : hour
  
   for (var i = apertura; i < cierre; ++i) {
     
    let element :any = null;
  let id = i;
  let hours = i;
  let time12 =   hours%12 == 0 ? 12 : hours%12;
  let meridiem =  i < 12 ? 'AM': 'PM';
  let formatD =    String(year)+'-'+String(month+1).padStart(2,'0') + '-' + String(day).padStart(2,'0');

  // 2022-08-03T00:00:00
  let returnD = formatD + 'T' + String(hours).padStart(2,'0') + ':' + '00' + ':00';
     

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
        date: returnD
      }
      horas.push(element)

  
   if(i == cierre -1){
  
    return horas;
  
  
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



    private getRetosEnviados(Cod_Usuario){
      var today = new Date();
  
      const Fecha_Inicio = today.getFullYear()+'-'+(today.getMonth() +1) +'-'+today.getDate();
      let URL = this.getURL( environment.reservacionesEnviadasUrl);
          URL = URL + environment.codUsuarioParam+Cod_Usuario+ environment.Fecha_Inicio +Fecha_Inicio

          console.log(URL);
      return this.http.get<GestionRetos[]>( URL );
    }
  
    private getRetosRecibidos( Cod_Usuario){
      var today = new Date();
  
      const Fecha_Inicio = today.getFullYear()+'-'+(today.getMonth() +1) +'-'+today.getDate();
      let URL = this.getURL( environment.reservacionesRecibidasUrl);
      URL = URL + environment.codUsuarioParam+Cod_Usuario+ environment.Fecha_Inicio +Fecha_Inicio
      console.log(URL);
      return this.http.get<GestionRetos[]>( URL );
    }

    private getRetosActuales( Cod_Usuario){

      let URL = this.getURL( environment.reservacionesActualesUrl);
      URL = URL + environment.codUsuarioParam+Cod_Usuario;
      console.log(URL);
      return this.http.get<GestionRetos[]>( URL );
    }

    private getRetosRevision( Cod_Usuario){

      let URL = this.getURL( environment.reservacionesRevisionUrl);
      URL = URL + environment.codUsuarioParam+Cod_Usuario;
      console.log(URL);
      return this.http.get<GestionRetos[]>( URL );
    }

    private getDisponibilidadCancha( cod_cancha,fecha,hora_inicio,hora_fin){

      let URL = this.getURL( environment.consultarDisponibilidadURL);
      URL = URL + environment.codCanchaParam+cod_cancha+ environment.fechaSecondParam+fecha+ environment.horaInicio+hora_inicio+ environment.horaFin+hora_fin;
      console.log(URL);
      return this.http.get<Reservaciones[]>( URL );
    }

    private getRetosConfirmadas( Cod_Usuario){
      var today = new Date();
  
      const Fecha_Inicio = today.getFullYear()+'-'+(today.getMonth() +1) +'-'+today.getDate();
  
      let URL = this.getURL( environment.reservacionesConfirmadasUrl);
      URL = URL + environment.codUsuarioParam+Cod_Usuario+ environment.Fecha_Inicio +Fecha_Inicio
      console.log(URL);
      return this.http.get<GestionRetos[]>( URL );
    }
  
    private getRetosHistorial( Cod_Usuario){
      var today = new Date();
  
      const Fecha_Inicio = today.getFullYear()+'-'+(today.getMonth() +1) +'-'+today.getDate();
  
      let URL = this.getURL( environment.reservacionesHistorialUrl);
      URL = URL + environment.codUsuarioParam+Cod_Usuario+ environment.Fecha_Inicio +Fecha_Inicio
      console.log(URL);
      return this.http.get<GestionRetos[]>( URL );
    }
  
    private GetReservacion(Cod_Reservacion){
  
      let URL =  this.getURL(environment.reservacionURL);
          URL = URL + environment.codReservacion + Cod_Reservacion;
  
          console.log(URL)
          return this.http.get<GestionRetos>( URL );
    }
  

    syncGetDisponibilidadCancha(cod_cancha,fecha,hora_inicio,hora_fin){

      return this.getDisponibilidadCancha(cod_cancha,fecha,hora_inicio,hora_fin).toPromise();
    }
    syncRetosEnviados(Cod_Usuario){
 
  
 
      this.getRetosEnviados(Cod_Usuario).subscribe(
        resp =>{
          this.retos = [];
          console.log(resp)
          this.retos = resp.slice(0);
console.log('retoosidjjd', this.retos)
        }, error =>{
  
          if(error){
        
            this.alertasService.message('FUTPLAY', 'Error cargando retos');
  
          }
        }
  
      );
    }

    syncRetosActuales(Cod_Usuario){
      this.retos = [];
      
     
          this.getRetosActuales(Cod_Usuario).subscribe(
            resp =>{
      
              console.log(resp)
              this.retos = resp.slice(0);
    
            }, error =>{
      
              if(error){
            
                this.alertasService.message('FUTPLAY', 'Error cargando retos');
      
              }
            }
      
          );
        }
        syncRetosRevision(Cod_Usuario){
          this.retos = [];
          
         
              this.getRetosRevision(Cod_Usuario).subscribe(
                resp =>{
          
                  console.log(resp)
                  this.retos = resp.slice(0);
        
                }, error =>{
          
                  if(error){
                
                    this.alertasService.message('FUTPLAY', 'Error cargando retos');
          
                  }
                }
          
              );
            }
    syncRetosHistorial(Cod_Usuario){

   
      this.retos = [];
      
          this.getRetosHistorial(Cod_Usuario).subscribe(
            resp =>{
      
              console.log(resp)
              this.retos = resp.slice(0);

            }, error =>{
      
              if(error){

                this.alertasService.message('FUTPLAY', 'Error cargando provincias');
      
              }
            }
      
          );
        }
    syncRetosRecibidos(Cod_Usuario){
      this.retos = [];
    
          this.getRetosRecibidos(Cod_Usuario).subscribe(
            resp =>{
      
              console.log(resp)
              this.retos = resp.slice(0);

            }, error =>{
      
              if(error){
              
                this.alertasService.message('FUTPLAY', 'Error cargando retos');
      
              }
            }
      
          );
        }
  
        syncGetReservacionToPromise(Cod_Reservacion){
  
    return this.GetReservacion(Cod_Reservacion).toPromise();
  }
        
    syncRetosConfirmados(Cod_Usuario){

      this.retos = [];
      
          this.getRetosConfirmadas(Cod_Usuario).subscribe(
            resp =>{
      
              console.log(resp)
              this.retos = resp.slice(0);

            }, error =>{
      
              if(error){
   
                this.alertasService.message('FUTPLAY', 'Error cargando provincias');
      
              }
            }
      
          );
        }
  


     
        private   deleteConfirmacionReservacion(Cod_Reservacion ){
    
  
          let URL = this.getURL( environment.confirmacionReservacionesURL);
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
        syncDeleteConfirmacionReservacion(reservacion  ){
          return this.deleteConfirmacionReservacion( reservacion.Cod_Reservacion ).toPromise();
        }


        private postReservaciones (confirmacion){
          const URL = this.getURL( environment.confirmacionReservacionesURL  );
          const options = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
          };
         
          return this.http.post( URL, JSON.stringify(confirmacion), options );
        }
      
        insertarReservacion(confirmacion){
  
          this.alertasService.presentaLoading('Enviando información al resador')
  console.log(confirmacion,'confirmacion')
          this.postReservaciones(confirmacion).subscribe(
  
            resp => {
              this.alertasService.loadingDissmiss();
              this.presentModal();
              this.videoScreen(1);
            // this.alertasService.message('FUTPLAY','La reservacion se guardo con exito')
            
            }
          )
  
   
        }

        
      async videoScreen(id){
        const modal = await this.modalCtrl.create({
          component:VideoScreenPage,
          cssClass:'modal-view',
          id:'video-screen-modal',
          mode:'ios',
          backdropDismiss:false,
          componentProps:{
            index:id
          }
        });
        return await modal.present();
        
          }
      async presentModal() {
        const modal = await this.modalCtrl.create({
          component: MisReservacionesPage,
          cssClass: 'my-custom-class'
        });
        return await modal.present();
      }
}
