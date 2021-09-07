import { Component, Input, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { TransferenciasPage } from '../transferencias/transferencias.page';
import { ClubProfileInfoPage } from '../club-profile-info/club-profile-info.page';
import { MyClubsPageModule } from '../my-clubs/my-clubs.module';
import { MyClubsPage } from '../my-clubs/my-clubs.page';
import { Club } from '../../models/club';

@Component({
  selector: 'app-club-info',
  templateUrl: './club-info.page.html',
  styleUrls: ['./club-info.page.scss'],
})
export class ClubInfoPage implements OnInit {
@Input() club: Club;
  constructor(private modalCtrl: ModalController,private popoverCtrl: PopoverController) { }

  ngOnInit() {
    console.log(this.club)
  }

  async listaTransferencia() {
    const modal = await this.modalCtrl.create({
      component: TransferenciasPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
  async clubinfo(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: ClubProfileInfoPage,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
      backdropDismiss: true
    });
    await popover.present();

    const { data } = await popover.onWillDismiss();
    console.log(data);
  }
  async myclubs(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: MyClubsPage,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
      backdropDismiss: true
    });
    await popover.present();

    const { data } = await popover.onWillDismiss();
    console.log(data);
  }

  cerrarModal(){
    this.modalCtrl.dismiss();
  }

}
