import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-inicio-partido',
  templateUrl: './inicio-partido.page.html',
  styleUrls: ['./inicio-partido.page.scss'],
})
export class InicioPartidoPage implements OnInit {
  stadiumProfile =  'assets/main/stadium-profile.jpg';
  soccer= 'assets/icon/soccer.svg';
  constructor(
public modalCtrl: ModalController

  ) { }

  ngOnInit() {
  }
  cerrarModal(){
    this.modalCtrl.dismiss();
  }
}
