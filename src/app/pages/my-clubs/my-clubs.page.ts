import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { CreateClubPage } from '../create-club/create-club.page';
import { EquiposService } from 'src/app/services/equipos.service';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-my-clubs',
  templateUrl: './my-clubs.page.html',
  styleUrls: ['./my-clubs.page.scss'],
})
export class MyClubsPage implements OnInit {
  stadiumProfile =  'assets/main/my-clubs.svg';
  constructor(public equiposService: EquiposService, public modalCtrl: ModalController, public popOverCtrl: PopoverController, public user: UsuariosService) { }

  ngOnInit() {

    console.log(this.equiposService.userclubs ,'owner');
    console.log(this.equiposService.playerClubs , 'player');
  }
  async newClub() {
    const modal = await this.modalCtrl.create({
      component:CreateClubPage,
      cssClass: 'my-custom-class'
    });

    return await modal.present();
  }
  

seleccionarEquipo(equipo){
  this.equiposService.perfilEquipo = equipo
  this.modalCtrl.dismiss();
}
  cerrarModal(){
    this.modalCtrl.dismiss();
  }


}
