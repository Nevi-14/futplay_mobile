import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateClubPage } from '../create-club/create-club.page';

import { SolicitudesService } from '../../services/solicitudes.service';
import { TransferenciasPage } from '../transferencias/transferencias.page';
import { JoinClubComponent } from 'src/app/components/join-club-component/join-club-component';
import { Equipos } from 'src/app/models/equipos';
import { UsuariosService } from '../../services/usuarios.service';
import { JugadoresEquiposService } from '../../services/jugadoresEquipos.service';
import { EquiposService } from 'src/app/services/equipos.service';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.page.html',
  styleUrls: ['./clubs.page.scss'],
})

export class ClubsPage implements OnInit {
  club: Equipos;
  add ='../assets/icons/create.svg';
 find ='../assets/icons/join.svg';
  constructor( public modalCtrl: ModalController, public user: UsuariosService, public players: JugadoresEquiposService, public clubs: EquiposService, public solicitudes: SolicitudesService) { }

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
      cssClass: 'my-custom-class',
      componentProps:{
        header: true
      }
    });
    return await modal.present();
  }



}
