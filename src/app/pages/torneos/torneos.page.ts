import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { InscripcionTorneoPage } from '../inscripcion-torneo/inscripcion-torneo.page';

@Component({
  selector: 'app-torneos',
  templateUrl: './torneos.page.html',
  styleUrls: ['./torneos.page.scss'],
})
export class TorneosPage implements OnInit {

  constructor(
public modalCtrl:ModalController

  ) { }

  ngOnInit() {
  }
  async inscripcionTorneo() {
    const modal = await this.modalCtrl.create({
      component:InscripcionTorneoPage,
      cssClass: 'my-custom-class',
 
    });
    return await modal.present();
  }
}
