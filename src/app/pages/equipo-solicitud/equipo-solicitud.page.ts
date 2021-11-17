import { Component, Input, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { ClubService } from '../../services/club.service';

@Component({
  selector: 'app-equipo-solicitud',
  templateUrl: './equipo-solicitud.page.html',
  styleUrls: ['./equipo-solicitud.page.scss'],
})
export class EquipoSolicitudPage implements OnInit {
@Input() usuarioID: number;
  constructor(public modalCtrl: ModalController,public clubes: ClubService, public popOver: PopoverController) { }

  ngOnInit() {
  }


  equipo(equipo){

    const i = this.clubes.club.findIndex( c => c.usuarioID === this.usuarioID);
    this.popOver.dismiss({
      equipo:equipo
    });
  }

}
