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
  stadiumProfile =  'assets/main/my-clubs.jpg';
  constructor(public clubs: EquiposService, public modalCtrl: ModalController, public popOverCtrl: PopoverController, public user: UsuariosService) { }

  ngOnInit() {

    console.log(this.clubs.userclubs ,'owner');
    console.log(this.clubs.playerClubs , 'player');
  }
  async newClub() {
    const modal = await this.modalCtrl.create({
      component:CreateClubPage,
      cssClass: 'my-custom-class'
    });

    return await modal.present();
  }
  


  cerrarModal(){
    this.modalCtrl.dismiss();
  }


}
