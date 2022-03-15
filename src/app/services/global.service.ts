import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  loading: HTMLIonLoadingElement;
darkMode: boolean = true;
darkMode2: boolean;
loadingReady = false;
mode = 'Modo oscuro';
icon = 'moon';
isLoading = false;
  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController

  ) { }




  
  async presentaLoading( mensaje: string ){
    this.loading = await this.loadingCtrl.create({
      message: mensaje,
    });
    this.loading.present();
    const { data } = await this.loading.onDidDismiss();
    if(data !== undefined && data.data){
console.log('return')
     this.loadingDissmiss();
    }
  }

  async loadingDissmiss() {

    return await this.loading.dismiss();
  }




    
  async  presentAlert(header,message){ 
      
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: header,
      subHeader: 'Futplay',
      message: message,
      buttons: ['OK']
    });

    await alert.present();



}



alertDissmiss(){
  this.loading.dismiss();
}


}
