import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BuscarEquiposPage } from '../buscar-equipos/buscar-equipos.page';
import { CrearEquipoPage } from '../crear-equipo/crear-equipo.page';

@Component({
  selector: 'app-crear-unirse-equipo',
  templateUrl: './crear-unirse-equipo.page.html',
  styleUrls: ['./crear-unirse-equipo.page.scss'],
})
export class CrearUnirseEquipoPage implements OnInit {
  add = '../assets/league.svg';
  find = '../assets/img/images/team.svg';

  constructor(public modalCtrl: ModalController) {}

  ngOnInit() {}

 
  async crearEquipo() {
    const modal = await this.modalCtrl.create({
      component: CrearEquipoPage,
      cssClass: 'my-custom-class',
      id: 'create-modal'
    });

    await modal.present();
    const { data } = await modal.onDidDismiss();

    if (data !== undefined) {
      console.log(data, 'data');
      
    }
  }

  async buscarEquipos() {
    const modal = await this.modalCtrl.create({
      component: BuscarEquiposPage,
      cssClass: 'my-custom-class'
    });

    return modal.present();
  }
}