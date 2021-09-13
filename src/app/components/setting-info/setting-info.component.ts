import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { ProfileInfoPage } from '../../pages/profile-info/profile-info.page';
import { PasswordPage } from '../../pages/password/password.page';
import { PaymentMethodPage } from '../../pages/payment-method/payment-method.page';

@Component({
  selector: 'app-setting-info',
  templateUrl: './setting-info.component.html',
  styleUrls: ['./setting-info.component.scss'],
})
export class SettingInfoComponent implements OnInit {

  constructor(private  modalCtrl: ModalController, private popOverCtrl: PopoverController) { }

  ngOnInit() {}
  async profileInfo() {
    const modal = await this.modalCtrl.create({
      component: ProfileInfoPage,
      cssClass: 'my-custom-class'
    });
    await this.popOverCtrl.dismiss();
    return await modal.present();
  }
  async password() {
    const modal = await this.modalCtrl.create({
      component: PasswordPage,
      cssClass: 'my-custom-class'
    });
    await this.popOverCtrl.dismiss();
    return await modal.present();
  }
  async paymentMethod() {
    const modal = await this.modalCtrl.create({
      component: PaymentMethodPage,
      cssClass: 'my-custom-class'
    });
    await this.popOverCtrl.dismiss();
    return await modal.present();
  }
}
