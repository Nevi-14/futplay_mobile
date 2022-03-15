import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Registro } from '../../models/registro.model';

@Component({
  selector: 'app-qr-verification-details',
  templateUrl: './qr-verification-details.page.html',
  styleUrls: ['./qr-verification-details.page.scss'],
})
export class QrVerificationDetailsPage implements OnInit {
  @Input()  registro: Registro
  constructor(
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }
  cerrarModal(){
    this.modalCtrl.dismiss();
  }
}
