import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TransferenciasPage } from '../transferencias/transferencias.page';

@Component({
  selector: 'app-club-info',
  templateUrl: './club-info.page.html',
  styleUrls: ['./club-info.page.scss'],
})
export class ClubInfoPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async listaTransferencia() {
    const modal = await this.modalCtrl.create({
      component: TransferenciasPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

}
