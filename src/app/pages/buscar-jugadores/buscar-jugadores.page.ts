import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-buscar-jugadores',
  templateUrl: './buscar-jugadores.page.html',
  styleUrls: ['./buscar-jugadores.page.scss'],
})
export class BuscarJugadoresPage implements OnInit {

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
