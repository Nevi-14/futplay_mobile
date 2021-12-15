import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { CreateClubPage } from '../create-club/create-club.page';

import { JoinClubComponent } from 'src/app/components/join-club-component/join-club-component';
import { EquiposService } from 'src/app/services/equipos.service';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-my-clubs',
  templateUrl: './my-clubs.page.html',
  styleUrls: ['./my-clubs.page.scss'],
})
export class MyClubsPage implements OnInit {

  constructor(public clubs: EquiposService, public modalCtrl: ModalController, public popOverCtrl: PopoverController, public user: UsuariosService) { }

  ngOnInit() {

    console.log(this.clubs.userclubs ,'owner');
    console.log(this.clubs.playerClubs , 'player');
  }
  async newClub() {
    this.modalCtrl.dismiss();
    const modal = await this.modalCtrl.create({
      component:CreateClubPage,
      cssClass: 'my-custom-class'
    });

    return await modal.present();
  }
  
  async findClub() {
    this.modalCtrl.dismiss();
    const modal = await this.modalCtrl.create({
      component:JoinClubComponent,
      cssClass: 'my-custom-modal',
      showBackdrop: true,
      backdropDismiss: true,
      componentProps:{
        header:true
      },
      animated: true,
    });
    return await modal.present();
  }

  cerrarModal(){
    this.modalCtrl.dismiss();
  }


}
