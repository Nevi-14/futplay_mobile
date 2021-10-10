import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateClubPage } from '../create-club/create-club.page';
import { JoinClubPage } from '../join-club/join-club.page';

@Component({
  selector: 'app-first-login-club',
  templateUrl: './first-login-club.page.html',
  styleUrls: ['./first-login-club.page.scss'],
})
export class FirstLoginClubPage implements OnInit {


  add ='../assets/home/addclub.svg';
 find ='../assets/home/findclub.svg';
  constructor( private modalCtrl: ModalController) { }

  ngOnInit() {
  }
  async newClub() {
    const modal = await this.modalCtrl.create({
      component:CreateClubPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
  async findClub() {
    const modal = await this.modalCtrl.create({
      component:JoinClubPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

}
