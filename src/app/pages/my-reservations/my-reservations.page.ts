import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { ConfirmedPage } from '../confirmed/confirmed.page';
import { RetoDetallePage } from '../reto-detalle/reto-detalle.page';

import { ClubInfoComponent } from '../../components/club-info/club-info.component';
import { Router } from '@angular/router';
import { RetosTemplateComponent } from '../../components/retos-template/retos-template.component';
import { ReservacionesService } from '../../services/reservaciones.service';
import { EquiposService } from 'src/app/services/equipos.service';


@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.page.html',
  styleUrls: ['./my-reservations.page.scss'],
})
export class MyReservationsPage implements OnInit {
  img1 = '../assets/icons/ball.svg';
  img2 = '../assets/icons/time.svg';
  img3 = '../assets/icons/eye.svg';
  constructor(public modalCtrl: ModalController, public retos: ReservacionesService, public clubs: EquiposService,public router: Router) { }

  ngOnInit() {
  }
  async send() {
    const modal = await this.modalCtrl.create({
      component: RetosTemplateComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  async receive() {
    const modal = await this.modalCtrl.create({
      component: RetosTemplateComponent,
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


  reservacion(){
    this.modalCtrl.dismiss();
    this.router.navigate(['/home/reservations'])
   
  }

  async details(reto){
const i = this.clubs.club.findIndex(c => c.equipoID === reto.clubID2)
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
  const i = this.retos.retos.findIndex(r => r.reservacionID === reto.retoID)
  this.retos.retos.splice(i, 1);
  alert('deleted')
  }

  returnName(clubID){
const i = this.clubs.club.findIndex(c=> c.equipoID === clubID)
return this.clubs.club[i].nombre;
  }
}
