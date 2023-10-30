import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AlertasService {
  segment = 'reservaciones';
  isLoading = false;
  loading: HTMLIonLoadingElement;
  pagina = null;

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public translateService: TranslateService
  ) { }

  async presentaLoading(message: string) {
    this.isLoading = true;

    this.loadingCtrl.create({
      message: message ? message : this.translateService.instant('PLEASE_WAIT'),
      cssClass: 'activity-detail-loading'
    }).then(loader => {
      loader.present().then(() => {
        if (!this.isLoading) {
          loader.dismiss();
        }
      });
    });
  }

  async loadingDissmiss() {
    this.isLoading = false;
    this.checkAndCloseLoader();
    setTimeout(() => this.checkAndCloseLoader(), 1000);
  }

  async closeLoader() {
    this.checkAndCloseLoader();
    setTimeout(() => this.checkAndCloseLoader(), 1000);
  }

  async checkAndCloseLoader() {
    const loader = await this.loadingCtrl.getTop();
    if (loader !== undefined) {
      await this.loadingCtrl.dismiss();
    }
  }

  async message(header, message) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}