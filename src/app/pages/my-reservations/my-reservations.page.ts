import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SentPage } from '../sent/sent.page';
import { ReceivedPage } from '../received/received.page';
import { ConfirmedPage } from '../confirmed/confirmed.page';

@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.page.html',
  styleUrls: ['./my-reservations.page.scss'],
})
export class MyReservationsPage implements OnInit {
  img1 = '../assets/icons/ball.svg';
  img2 = '../assets/icons/time.svg';
  img3 = '../assets/icons/eye.svg';
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }
  async send() {
    const modal = await this.modalCtrl.create({
      component: SentPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  async receive() {
    const modal = await this.modalCtrl.create({
      component: ReceivedPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  async confirm() {
    const modal = await this.modalCtrl.create({
      component: ConfirmedPage    ,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  cerrarModal(){
    this.modalCtrl.dismiss();
  }

}
