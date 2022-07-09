import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AlertasService } from './alertas.service';
import { ModalController } from '@ionic/angular';
import { MisReservacionesPage } from '../pages/mis-reservaciones/mis-reservaciones.page';
import { GoogleAdsService } from './google-ads.service';

@Injectable({
  providedIn: 'root'
})
export class ConfirmacionReservacionesService {

  constructor(
    public http: HttpClient,
    public alertasService:AlertasService,
    public modalCtrl:ModalController,
    public googleAdsService: GoogleAdsService
  ) { }


  
  getURL( api: string,id: string ){
    let test: string = ''
    if ( !environment.prdMode ) {
      test = environment.TestURL;
    }
    const URL = environment.preURL  + test +  environment.postURL + api + id
console.log(URL);
    return URL;
  }


// POST RESERVACIONES

      // POST CANCHA

      private postReservaciones (confirmacion){
        const URL = this.getURL( environment.confirmacionReservacionesURL, '' );
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

        this.alertasService.presentaLoading('Enviando información al restador')
console.log(confirmacion,'confirmacion')
        this.postReservaciones(confirmacion).subscribe(

          resp => {
            this.alertasService.loadingDissmiss();
            this.presentModal();
            this.googleAdsService.showInterstitial();
          // this.alertasService.message('FUTPLAY','La reservacion se guardo con exito')
          
          }
        )

 
      }

      async presentModal() {
        const modal = await this.modalCtrl.create({
          component: MisReservacionesPage,
          cssClass: 'my-custom-class'
        });
        return await modal.present();
      }

}
