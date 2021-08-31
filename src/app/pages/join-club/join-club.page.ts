import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-join-club',
  templateUrl: './join-club.page.html',
  styleUrls: ['./join-club.page.scss'],
})
export class JoinClubPage implements OnInit {

  constructor( private modalCtrl: ModalController) { }

  ngOnInit() {
  }
  cerrarModal(){
    this.modalCtrl.dismiss();
  }

}
