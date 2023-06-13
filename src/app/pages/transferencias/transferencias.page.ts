import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { BuscarJugadoresPage } from '../buscar-jugadores/buscar-jugadores.page';

@Component({
  selector: 'app-transferencias',
  templateUrl: './transferencias.page.html',
  styleUrls: ['./transferencias.page.scss'],
})
export class TransferenciasPage implements OnInit {

  constructor(
public router:Router,
public modalCtrl:ModalController

  ) { }

  ngOnInit() {
  }
  regresar(){

    this.router.navigateByUrl('futplay/perfil-equipo',{replaceUrl:true})
  }

  async buscarJugadores() {

    const modal = await this.modalCtrl.create({
      component: BuscarJugadoresPage,
      cssClass: 'my-custom-modal'
    });

    modal.present();
    const { data } = await modal.onWillDismiss();
    console.log(data)



  }
}
