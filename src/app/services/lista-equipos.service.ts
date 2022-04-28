import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Equipos } from '../models/equipos';
import { HttpClient } from '@angular/common/http';

import { ModalController } from '@ionic/angular';
import { EquipoDetalleModalPage } from '../pages/equipo-detalle-modal/equipo-detalle-modal.page';
import { vistaEquipos } from '../models/vistaEquipos';
import { EquipoReservacionPage } from '../pages/equipo-reservacion/equipo-reservacion.page';
import { AlertasService } from './alertas.service';

@Injectable({
  providedIn: 'root'
})
export class ListaEquiposService {

  equipos: vistaEquipos[]=[];

  constructor(
    public http: HttpClient,
    public modalCtrl: ModalController,
    public alertasService: AlertasService
  ) {}

    getURL( api: string ){
      let test: string = ''
      if ( !environment.prdMode ) {
     test = environment.TestURL;
      }
    const URL = environment.preURL  + test +  environment.postURL + api 
   
      return URL;
    }











     getEquipos( ){
      const URL = this.getURL( environment.equiposURL);
      console.log(URL,'URL')
      return this.http.get<vistaEquipos[]>( URL );
    }
   
    SyncEquipos(){
      this.alertasService.presentaLoading('Buscando equipos')
      this.getEquipos().subscribe(
        resp =>{
          this.alertasService.loadingDissmiss()
          this.equipos = resp.slice(0);
          console.log('equipos', resp)
         
        }
   
      );
    }
  
  
  
  
    async detalleEquipo(equipo){

  
     
      const modal  = await this.modalCtrl.create({
       component: EquipoDetalleModalPage,
       cssClass:'my-custom-modal',
       componentProps:{
        equipo:equipo
  
       }
     });
     await modal .present();
   }
  

   async equipoReservacion(equipo){

  
     
    const modal  = await this.modalCtrl.create({
     component: EquipoReservacionPage,
     cssClass: 'my-custom-class',
     componentProps:{
      equipo:equipo

     }
   });
   await modal .present();
 }

 private filtrarEquipos( Cod_Provincia: number, Cod_Canton:number,Cod_Distrito:number){

  let URL = this.getURL( environment.fitrarEquipos);
 let params = environment.Cod_Provincia+ Cod_Provincia + environment.Cod_Canton_Param+ Cod_Canton +
              environment.Cod_Distrito_Param+ Cod_Distrito
  URL = URL+ params

  console.log(URL,'filtro Usuarios ')

  return this.http.get<vistaEquipos[]>( URL );
}

 syncfiltrarEquipos( Cod_Provincia: number, Cod_Canton:number,Cod_Distrito:number){

this.filtrarEquipos(Cod_Provincia,Cod_Canton,Cod_Distrito).subscribe(

resp =>{
this.equipos = [];
  this.equipos = resp.slice(0);

  console.log(this.equipos,'equipos')


}

);
}


   }





