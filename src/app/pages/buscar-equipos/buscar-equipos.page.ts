import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-buscar-equipos',
  templateUrl: './buscar-equipos.page.html',
  styleUrls: ['./buscar-equipos.page.scss'],
})
export class BuscarEquiposPage implements OnInit {

  stadiumProfile =  'assets/main/game-match.svg';
  constructor(
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  cerrarModal(){

    this.modalCtrl.dismiss();
  }

}
