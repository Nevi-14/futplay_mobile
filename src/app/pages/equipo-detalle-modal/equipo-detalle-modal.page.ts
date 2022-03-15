import { Component, OnInit, Input } from '@angular/core';
import { Equipos } from 'src/app/models/equipos';
import { ModalController } from '@ionic/angular';
import { vistaEquipos } from 'src/app/models/vistaEquipos';

@Component({
  selector: 'app-equipo-detalle-modal',
  templateUrl: './equipo-detalle-modal.page.html',
  styleUrls: ['./equipo-detalle-modal.page.scss'],
})
export class EquipoDetalleModalPage implements OnInit {
@Input() equipo:vistaEquipos;
stadiumProfile =  'assets/main/player-profile.jpg';
img = '';
dureza = '';
  constructor(
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.img = 'assets/img/equipos/'+ this.equipo.Foto;
    this.dureza = 'assets/icons/'+this.equipo.Dureza
    console.log(this.equipo)
  }

  cerrarModal(){
    this.modalCtrl.dismiss();
  }

}
