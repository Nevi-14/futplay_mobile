import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ClubService } from '../../services/club.service';

@Component({
  selector: 'app-confirmed',
  templateUrl: './confirmed.page.html',
  styleUrls: ['./confirmed.page.scss'],
})
export class ConfirmedPage implements OnInit {


  constructor( private modalCtrl: ModalController, private clubs: ClubService) { }

  ngOnInit() {
    this.clubs.checkIfHasClub();
  }
  cerrarModal(){
    this.modalCtrl.dismiss();
  }

}
