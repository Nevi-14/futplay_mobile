import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-encabezado-modal',
  templateUrl: './encabezado-modal.component.html',
  styleUrls: ['./encabezado-modal.component.scss'],
})
export class EncabezadoModalComponent implements OnInit {

  constructor(
    public modalCtrl:ModalController
  ) { }

  ngOnInit() {}

  cerrarModal(){
    this.modalCtrl.dismiss();
  }
}
