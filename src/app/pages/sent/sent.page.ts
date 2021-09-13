import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-sent',
  templateUrl: './sent.page.html',
  styleUrls: ['./sent.page.scss'],
})
export class SentPage implements OnInit {


  constructor( private modalCtrl: ModalController) { }

  ngOnInit() {
  }
  cerrarModal(){
    this.modalCtrl.dismiss();
  }

}
