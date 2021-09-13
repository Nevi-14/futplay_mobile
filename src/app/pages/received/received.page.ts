import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-received',
  templateUrl: './received.page.html',
  styleUrls: ['./received.page.scss'],
})
export class ReceivedPage implements OnInit {

  constructor( private modalCtrl: ModalController) { }

  ngOnInit() {
  }
  cerrarModal(){
    this.modalCtrl.dismiss();
  }
}
