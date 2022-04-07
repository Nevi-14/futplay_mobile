import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateClubPage } from '../create-club/create-club.page';

import { Equipos } from 'src/app/models/equipos';
import { UsuariosService } from '../../services/usuarios.service';

import { EquiposService } from 'src/app/services/equipos.service';

import { MyClubsPage } from '../my-clubs/my-clubs.page';
import { SolicitudesEquiposPage } from '../solicitudes-equipos/solicitudes-equipos.page';
import { SolicitudesService } from 'src/app/services/solicitudes.service';
import { EditarPerfilEquipoPage } from '../editar-perfil-equipo/editar-perfil-equipo.page';
import { EstadisticaEquipoPage } from '../estadistica-equipo/estadistica-equipo.page';


@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.page.html',
  styleUrls: ['./clubs.page.scss'],
})

export class ClubsPage implements OnInit {
  club: Equipos;

  add ='../assets/icons/create.svg';
 find ='../assets/icons/join.svg';
  constructor( public modalCtrl: ModalController, public user: UsuariosService,  public equiposService: EquiposService, public solicitudesService:SolicitudesService) { }

  ngOnInit() {


   // this.user.getJugadoresEquipos(this.clubs.switchClub);

  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: EstadisticaEquipoPage,
      breakpoints: [0, 0.2, 0.5, 1],
      initialBreakpoint: 0.2,
    });
    return await modal.present();
  }
  async newClub() {
    const modal = await this.modalCtrl.create({
      component:CreateClubPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  
  async  gestionarPerfil(){

    const modal = await this.modalCtrl.create({
      component:EditarPerfilEquipoPage,
      componentProps:{
        equipo:this.equiposService.perfilEquipo
      },
      cssClass:'my-custom-modal'
    });

    return await modal.present();

    }

  async solicitudesEquipos() {
    const modal = await this.modalCtrl.create({
      component:SolicitudesEquiposPage,
      cssClass:'my-custom-modal'
    });
     await modal.present();

     const { data } = await modal.onWillDismiss();
     if(data != undefined){
       this.equiposService.SyncJugadoresEquipos( this.equiposService.perfilEquipo.Cod_Equipo).then( jugadores =>{
         this.equiposService.jugadoresPerfilEquipo = []
         this.equiposService.jugadoresPerfilEquipo = jugadores;
     
         
       })
       
     }
  }

  async myClubsMenu(){

    const modal = await this.modalCtrl.create({
      component: MyClubsPage,
      cssClass:'my-custom-modal'
    });

    await modal.present();


 
   
   }





}
