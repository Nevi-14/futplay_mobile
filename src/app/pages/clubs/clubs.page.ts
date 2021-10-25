import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateClubPage } from '../create-club/create-club.page';
import { JoinClubPage } from '../join-club/join-club.page';
import { UserService } from '../../services/user.service';
import { JugadoresService } from '../../services/jugadores.service';
import { Club } from '../../models/club';
import { ClubService } from 'src/app/services/club.service';
import { SolicitudesService } from '../../services/solicitudes.service';
import { TransferenciasPage } from '../transferencias/transferencias.page';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.page.html',
  styleUrls: ['./clubs.page.scss'],
})

export class ClubsPage implements OnInit {
  club: Club;
  add ='../assets/home/addclub.svg';
 find ='../assets/home/findclub.svg';
  constructor( private modalCtrl: ModalController, private user: UserService, private players: JugadoresService, private clubs: ClubService, private solicitudes: SolicitudesService) { }

  ngOnInit() {
    this.clubs.checkIfHasClub();

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
