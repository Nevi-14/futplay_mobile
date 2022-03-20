import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BuscarJugadoresPage } from '../buscar-jugadores/buscar-jugadores.page';

@Component({
  selector: 'app-solicitudes-equipos',
  templateUrl: './solicitudes-equipos.page.html',
  styleUrls: ['./solicitudes-equipos.page.scss'],
})
export class SolicitudesEquiposPage implements OnInit {
  stadiumProfile =  'assets/main/game-match.svg';
  public tipos : string[]=['recibidos','enviados'];
  public selectedType: string = this.tipos[0];
  constructor(
    public modalCtrl:ModalController
  ) { }

  ngOnInit() {
  }
  segmentChanged(event:any){
    console.log(event)
    

    this.selectedType = event.detail.value;
    console.log(event.detail.value)

  }

  cerrarModal(){

    this.modalCtrl.dismiss();
  }
  async buscarJugadores(){

    const modal = await this.modalCtrl.create({
      component:BuscarJugadoresPage,
      cssClass:'my-cutom-class'
    });

    return await modal.present();
  }
}
