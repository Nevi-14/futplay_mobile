import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FilterPage } from '../filter/filter.page';
import { OpcionesService } from '../../services/opciones.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.page.html',
  styleUrls: ['./reservations.page.scss'],
})
export class ReservationsPage implements OnInit {
  calendar = '../assets/icons/calendar.svg';
  message = '../assets/icons/message.svg';
  location = '../assets/icons/map.svg';
  star= 'assets/search/star.svg';
  save= 'assets/search/add-user.svg';
  soccer= 'assets/icon/soccer.svg';
  constructor( public modalCtrl: ModalController, public opcionesService: OpcionesService) { }

  ngOnInit() {
  }
  async filtrar(){
    const modal = await this.modalCtrl.create({
     component: FilterPage,
     cssClass: 'dynamic-modal'
   });
   console.log('hello')
   return await modal.present();
   
  }
  
}
