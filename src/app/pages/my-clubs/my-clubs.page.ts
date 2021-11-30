import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { ClubService } from '../../services/club.service';
import { CreateClubPage } from '../create-club/create-club.page';
import { UserService } from '../../services/user.service';
import { JugadoresService } from '../../services/jugadores.service';
import { JoinClubComponent } from 'src/app/components/join-club-component/join-club-component';

@Component({
  selector: 'app-my-clubs',
  templateUrl: './my-clubs.page.html',
  styleUrls: ['./my-clubs.page.scss'],
})
export class MyClubsPage implements OnInit {

  constructor(public clubs: ClubService, public modalCtrl: ModalController, public popOverCtrl: PopoverController, public user: UserService, public jugadores: JugadoresService) { }

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
      cssClass: 'bottom-modal'
    });
    return await modal.present();
  }



}
