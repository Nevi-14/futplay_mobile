import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SentPage } from '../sent/sent.page';
import { ReceivedPage } from '../received/received.page';
import { ConfirmedPage } from '../confirmed/confirmed.page';
import { RetosService } from 'src/app/services/retos.service';
import { RetoDetallePage } from '../reto-detalle/reto-detalle.page';
import { ClubService } from '../../services/club.service';
import { ClubInfoComponent } from '../../components/club-info/club-info.component';


@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.page.html',
  styleUrls: ['./my-reservations.page.scss'],
})
export class MyReservationsPage implements OnInit {
  img1 = '../assets/icons/ball.svg';
  img2 = '../assets/icons/time.svg';
  img3 = '../assets/icons/eye.svg';
  constructor(public modalCtrl: ModalController, public retos: RetosService, public clubs: ClubService) { }

  ngOnInit() {
  }
  async send() {
    const modal = await this.modalCtrl.create({
      component: SentPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  async receive() {
    const modal = await this.modalCtrl.create({
      component: ReceivedPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  async confirm() {
    const modal = await this.modalCtrl.create({
      component: ConfirmedPage    ,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  cerrarModal(){
    this.modalCtrl.dismiss();
  }



  async details(reto){
const i = this.clubs.club.findIndex(c => c.clubID === reto.clubID2)
    const modal = await  this.modalCtrl.create({
      component: ClubInfoComponent,
      cssClass:'my-custom-class',
      componentProps:{
        reto: reto,
        club:this.clubs.club[i]
      }
    })
    return await modal.present();
  }

  delete(reto){
  const i = this.retos.retos.findIndex(r => r.retoID === reto.retoID)
  this.retos.retos.splice(i, 1);
  alert('deleted')
  }

  returnName(clubID){
const i = this.clubs.club.findIndex(c=> c.clubID === clubID)
return this.clubs.club[i].nombre;
  }
}
