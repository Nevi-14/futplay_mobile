import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ClubService } from '../../services/club.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ClubInfoPage } from '../club-info/club-info.page';

@Component({
  selector: 'app-rivales',
  templateUrl: './rivales.page.html',
  styleUrls: ['./rivales.page.scss'],
})
export class RivalesPage implements OnInit {
  star= 'assets/search/star.svg';
  message= 'assets/search/message.svg';
  save= 'assets/search/save.svg';
  constructor(private data: DataService, private club: ClubService, private route: Router,private modalCtrl: ModalController) { }

  ngOnInit() {
    console.log(this.club.club)
  }

 
  async send(club){
     const modal = await this.modalCtrl.create({
      component: ClubInfoPage,
      cssClass: 'my-custom-class',
      componentProps:{
        club: club
      }
    });
    return await modal.present();
  }

}
