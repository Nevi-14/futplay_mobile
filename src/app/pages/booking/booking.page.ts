import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
})
export class BookingPage implements OnInit {
  currentTime = new Date().toLocaleTimeString();
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  cerrarModal(){
    this.modalCtrl.dismiss();
  }

}
