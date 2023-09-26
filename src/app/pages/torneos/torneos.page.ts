import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-torneos',
  templateUrl: './torneos.page.html',
  styleUrls: ['./torneos.page.scss'],
})
export class TorneosPage implements OnInit {

  constructor(
public modalCtrl:ModalController

  ) { }

  ngOnInit() {
  }

}
