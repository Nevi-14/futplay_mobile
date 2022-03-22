import { Injectable } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  isLoading = false;
  loading: HTMLIonLoadingElement ;



  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) { }



  
V

  async presentaLoading( message: string ){
    this.isLoading = true;
    this.loadingCtrl.create({
      message: message ? message : 'Please wait...'
    }).then(loader => {
      loader.present().then(() => {
        if (!this.isLoading) {
          loader.dismiss();
        }
      });
    });
  }
  async   loadingDissmiss(){
    this.isLoading = false;
    let topLoader = await this.loadingCtrl.getTop();
    while (topLoader) {
      if (!(await topLoader.dismiss())) {
        throw new Error('Could not dismiss the topmost loader. Aborting...');
      }
      topLoader = await this.loadingCtrl.getTop();
    }
  }
  
  

  async  message(header,message){
    
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();

}








}
