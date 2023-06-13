import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-inscripcion-torneo',
  templateUrl: './inscripcion-torneo.page.html',
  styleUrls: ['./inscripcion-torneo.page.scss'],
})
export class InscripcionTorneoPage implements OnInit {

  constructor(
  public modalCtrl:ModalController  
  ) { }

  ngOnInit() {
  }

  regresar(){

    this.modalCtrl.dismiss( )
  }
}
