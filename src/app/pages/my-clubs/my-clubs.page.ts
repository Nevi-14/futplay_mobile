import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { CreateClubPage } from '../create-club/create-club.page';
import { EquiposService } from 'src/app/services/equipos.service';
import { UsuariosService } from '../../services/usuarios.service';
import { ListaEquiposPage } from '../lista-equipos/lista-equipos.page';
import { BuscarEquiposPage } from '../buscar-equipos/buscar-equipos.page';

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
  
  async buscarEquipos(){

    const modal = await this.modalCtrl.create({
      component:BuscarEquiposPage,
      cssClass:'my-cutom-class'
    });

    return await modal.present();
  }
seleccionarEquipo(equipo){
  this.equiposService.perfilEquipo = equipo

    
  this.equiposService.SyncJugadoresEquipos( equipo.Cod_Equipo).then( jugadores =>{
    this.equiposService.jugadoresPerfilEquipo = []
    this.equiposService.jugadoresPerfilEquipo = jugadores;

    this.modalCtrl.dismiss();
    
  })

}
  cerrarModal(){
    this.modalCtrl.dismiss();
  }


}
