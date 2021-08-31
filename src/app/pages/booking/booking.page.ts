import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
})
export class BookingPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }
currentTime = new Date().toLocaleTimeString();
  ngOnInit() {
  }

  cerrarModal(){
    this.modalCtrl.dismiss();
  }

}
