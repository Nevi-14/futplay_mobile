import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-confirmed',
  templateUrl: './confirmed.page.html',
  styleUrls: ['./confirmed.page.scss'],
})
export class ConfirmedPage implements OnInit {


  constructor( private modalCtrl: ModalController) { }

  ngOnInit() {
  }
  cerrarModal(){
    this.modalCtrl.dismiss();
  }

}
