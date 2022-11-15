import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PerfilCancha } from '../models/perfilCancha';

import { AlertasService } from './alertas.service';
import { ActionSheetController } from '@ionic/angular';

 interface  dia {
  Code:number,
  Day : string
 }
@Injectable({
  providedIn: 'root'
})
export class CanchasService {
canchas:PerfilCancha[]=[];
cancha:PerfilCancha;
semana = [
  { Code: 0, Day: 'Domingo' },
  { Code: 1, Day: 'Lunes' },
  { Code: 2, Day: 'Martes' },
  { Code: 3, Day: 'Miercoles' },
  { Code: 4, Day: 'Jueves' },
  { Code: 5, Day: 'Viernes' },
  { Code: 6, Day: 'Sabado' }]
  dia:dia = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    public alertasService: AlertasService,
    public actionCtrl: ActionSheetController
  ) { }
  reload:boolean = false;
// GET  METHODS

  getURL( api: string ){

    let test: string = ''
    if ( !environment.prdMode ) {
      test = environment.TestURL;
      
    }
  const URL = environment.preURL  + test +  environment.postURL + api;


    return URL;
  }

 

  private getListaCanchas( ){
    let URL = this.getURL( environment.getListaCanchasURL);

        console.log(URL, 'URL')
    return this.http.get<PerfilCancha[]>( URL );
  }



  syncListaCanchasToPromise(){

  return this.getListaCanchas().toPromise();

  
  }

     diaSemana(index) {
          return this.semana[index]
        }
        diaNombre(index) {
          return this.semana[index].Day
        }
        disponibilidadCancha(cancha:PerfilCancha) {
     let filtro = cancha.horario[new Date().getDay()];

console.log('Hora_Fin',filtro.Hora_Fin )
console.log('current time', new Date().getHours())
if(filtro.Hora_Fin   <= new Date().getHours()+1){

  return 'Cerrada'
}
          if(filtro.Estado){
        
            return 'Disponible'
  
          }else{
            return 'Cerrada'
          }
          
        }
        disponibidadReservacion(cancha:PerfilCancha) {
          let filtro = cancha.horario[new Date().getDay()];
                    if(filtro[0].Estado){
                  
                      return true
            
                    }else{
                      return false
                    }
                    
                  }
        horarioCancha(cancha:PerfilCancha){


          let filtro = cancha.horario[new Date().getDay()];
          if(!filtro.Estado){
           
            return 'El dia ' + this.dia.Day + ' la cancha se encuentra cerrada.'
                      }
          let inicio  = filtro.Hora_Inicio;
          let fin  = filtro.Hora_Fin;
         
          return this.retornaHoraAmPm(inicio)  + ' - ' +this.retornaHoraAmPm(fin);

        }

        retornaHoraAmPm(hours){


          let minutes = null;
          const ampm = hours >= 12 ? 'PM' : 'AM';
          hours = hours % 12;
          hours = hours ? hours : 12; // the hour '0' should be '12'
          hours = hours < 10 ? '0' + hours : hours;
          // appending zero in the start if hours less than 10
          minutes = minutes < 10 ? '0' + minutes : minutes;
          
          let hourValue = hours +':'+'00'+':'+'00'+' ' + ampm;
          
          
          return hourValue;
          
          }
          async navigate() {
     
            //Kuala Lumpur City Center coordinates
            let toLat= this.cancha.cancha.Latitud;
            let toLong= this.cancha.cancha.Longitud;
        
            
            let destination = toLat + ',' + toLong;
        
        
            //1. Declaring an empty array
            let actionLinks=[];
        
            //2. Populating the empty array
        
             //2A. Add Google Maps App
            actionLinks.push({
              text: 'Google Maps App',
              icon: 'navigate',
              handler: () => {
                window.open("https://www.google.com/maps/search/?api=1&query="+destination)
              }
            })
        
           
             //2B. Add Waze App
            actionLinks.push({
              text: 'Waze App',
              icon: 'navigate',
              handler: () => {
                window.open("https://waze.com/ul?ll="+destination+"&navigate=yes&z=10");
              }
            });
        
           //2C. Add a cancel button, you know, just to close down the action sheet controller if the user can't make up his/her mind
            actionLinks.push({
              text: 'Cancel',
              icon: 'close',
              role: 'cancel',
              handler: () => {
                // console.log('Cancel clicked');
              }
            })
            
        
            
        
             const actionSheet = await this.actionCtrl.create({
             header: 'Navigate',
             buttons: actionLinks
           });
           await actionSheet.present();
        }
        

      }
        
