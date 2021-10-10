import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { ClubService } from '../../services/club.service';
import { CreateClubPage } from '../create-club/create-club.page';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-my-clubs',
  templateUrl: './my-clubs.page.html',
  styleUrls: ['./my-clubs.page.scss'],
})
export class MyClubsPage implements OnInit {

  constructor(private clubs: ClubService, private modalCtrl: ModalController, private popOverCtrl: PopoverController, private user: UserService) { }

  ngOnInit() {


  
  }
  
  
  async newClub() {
    const modal = await this.modalCtrl.create({
      component:CreateClubPage,
      cssClass: 'my-custom-class'
    });
    this.popOverCtrl.dismiss();
    return await modal.present();
  }
}
