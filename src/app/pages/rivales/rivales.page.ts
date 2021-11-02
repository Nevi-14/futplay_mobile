import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ClubService } from '../../services/club.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { FilterPage } from '../filter/filter.page';
import { ClubInfoComponent } from '../../components/club-info/club-info.component';

@Component({
  selector: 'app-rivales',
  templateUrl: './rivales.page.html',
  styleUrls: ['./rivales.page.scss'],
})
export class RivalesPage implements OnInit {
  star= 'assets/search/star.svg';
  message= 'assets/search/message.svg';
  save= 'assets/search/add-user.svg';
  filter= 'assets/icons/filter.svg';
  constructor(private data: DataService, private club: ClubService, private route: Router,private modalCtrl: ModalController) { }

  ngOnInit() {
    console.log(this.club.club)
  }

 
  async send(club){
     const modal = await this.modalCtrl.create({
      component: ClubInfoComponent,
      cssClass: 'my-custom-class',
      componentProps:{
        club: club
      }
    });
    return await modal.present();
  }
  async filterModal(){
    const modal = await this.modalCtrl.create({
     component: FilterPage,
     cssClass: 'my-custom-class'
   });
   return await modal.present();
 }

}
