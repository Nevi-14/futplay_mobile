import { Component, Input, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { EquiposService } from '../../services/equipos.service';

@Component({
  selector: 'app-equipo-solicitud',
  templateUrl: './equipo-solicitud.page.html',
  styleUrls: ['./equipo-solicitud.page.scss'],
})
export class EquipoSolicitudPage implements OnInit {
@Input() usuarioID: number;
  constructor(public modalCtrl: ModalController,public clubes: EquiposService, public popOver: PopoverController) { }

  ngOnInit() {
  }


  equipo(equipo){

    const i = this.clubes.club.findIndex( c => c.usuarioID === this.usuarioID);
    this.modalCtrl.dismiss({
      equipo:equipo
    });
  }

}
