import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from '../../services/data.service';
import { FilterPage } from '../filter/filter.page';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.page.html',
  styleUrls: ['./reservations.page.scss'],
})
export class ReservationsPage implements OnInit {
  calendar = '../assets/soccer/008-calendar.svg';
  message = '../assets/socialmedia/text.svg';
  location = '../assets/home/map.svg';
  star= 'assets/search/star.svg';
  save= 'assets/search/add-user.svg';
  filter= 'assets/icons/filter.svg';
  constructor( public data: DataService, public modalCtrl: ModalController) { }

  ngOnInit() {
  }
  async filterModal(){
    const modal = await this.modalCtrl.create({
     component: FilterPage,
     cssClass: 'my-custom-class'
   });
   return await modal.present();
 }
}
