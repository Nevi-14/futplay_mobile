import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateClubPage } from '../create-club/create-club.page';
import { UserService } from '../../services/user.service';
import { JugadoresService } from '../../services/jugadores.service';
import { Club } from '../../models/club';
import { ClubService } from 'src/app/services/club.service';
import { SolicitudesService } from '../../services/solicitudes.service';
import { TransferenciasPage } from '../transferencias/transferencias.page';
import { JoinClubComponent } from 'src/app/components/join-club-component/join-club-component';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.page.html',
  styleUrls: ['./clubs.page.scss'],
})

export class ClubsPage implements OnInit {
  club: Club;
  add ='../assets/icons/create.svg';
 find ='../assets/icons/join.svg';
  constructor( public modalCtrl: ModalController, public user: UserService, public players: JugadoresService, public clubs: ClubService, public solicitudes: SolicitudesService) { }

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
      component:JoinClubComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }



}
