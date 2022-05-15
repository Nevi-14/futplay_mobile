import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { EquiposService } from 'src/app/services/equipos.service';
import { SolicitudesService } from 'src/app/services/solicitudes.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { BuscarEquiposPage } from '../buscar-equipos/buscar-equipos.page';
import { CrearUnirseEquipoPage } from '../crear-unirse-equipo/crear-unirse-equipo.page';
import { GenerarReservacionPage } from '../generar-reservacion/generar-reservacion.page';

@Component({
  selector: 'app-mis-equipos',
  templateUrl: './mis-equipos.page.html',
  styleUrls: ['./mis-equipos.page.scss'],
})
export class MisEquiposPage implements OnInit {
  img =  'assets/main/my-clubs.svg';
  constructor(
    public equiposService: EquiposService,
     public modalCtrl: ModalController, 
     public popOverCtrl: PopoverController,
      public user: UsuariosService,
       public solicitudesService:SolicitudesService,
        public router: Router
        ) { }

  ngOnInit() {

    console.log(this.equiposService.userclubs ,'owner');
    console.log(this.equiposService.playerClubs , 'player');
    console.log(this.equiposService.misEquipos,'equiposService.misEquipo')
  }
  async crearEquipo() {
    const modal = await this.modalCtrl.create({
      component: GenerarReservacionPage,
      cssClass: 'my-custom-class'
    });

    return await modal.present();
  }
  

 async  crearUnirseEquipo(){
    const modal = await this.modalCtrl.create({
      component:CrearUnirseEquipoPage,
      cssClass:'my-custom-class'
    })

    return await modal.present();
  }
  async unirseEquipo(){

    const modal = await this.modalCtrl.create({
      component:BuscarEquiposPage,
      cssClass:'my-cutom-class'
    });

    return await modal.present();
  }
seleccionarEquipo(equipo){
  this.equiposService.perfilEquipo = equipo

  this.solicitudesService.syncGetSolicitudesEquipos(this.equiposService.perfilEquipo.Cod_Equipo, true, true,true);
  this.equiposService.SyncJugadoresEquipos( equipo.Cod_Equipo).then( jugadores =>{
    this.equiposService.jugadoresPerfilEquipo = []
    this.equiposService.jugadoresPerfilEquipo = jugadores;

    this.modalCtrl.dismiss({
      equipo:equipo
    });
    
  })

}
  cerrarModal(){
    this.modalCtrl.dismiss();
  }
  async buscarJugadores(){

    const modal = await this.modalCtrl.create({
      component:BuscarEquiposPage,
      cssClass:'my-cutom-class'
    });

     await modal.present();

     const { data } = await modal.onWillDismiss();
if(data != undefined){
  
}
  }

}
