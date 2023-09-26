import { Component, OnInit, Input } from '@angular/core';
import { PerfilEquipos } from 'src/app/models/perfilEquipos';
import { JugadoresService } from '../../services/jugadores.service';
import { PerfilJugador } from '../../models/perfilJugador';
import { EstadisticaEquipoPage } from '../estadistica-equipo/estadistica-equipo.page';
import { ModalController } from '@ionic/angular';
import { PerfilJugadorPage } from '../perfil-jugador/perfil-jugador.page';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-equipo-detalle-modal',
  templateUrl: './equipo-detalle-modal.page.html',
  styleUrls: ['./equipo-detalle-modal.page.scss'],
})

export class EquipoDetalleModalPage implements OnInit {
  @Input() equipo:PerfilEquipos
  jugadores:PerfilJugador[]=[]
  url = environment.archivosURL;
  dureza = [

    {id:0,titulo:'Equipo Neutral',image:'equipo-neutral.svg'},
    {id:1,titulo:'Juego Molesto',image:'juego-molesto.svg'},
    {id:2,titulo:'Agresividad Irresponsable',image:'agresividad-irresponsable.svg'},
    {id:3,titulo:'Caracter Revelde',image:'caracter-revelde.svg'},
    {id:4,titulo:'Mas Que Un Club',image:'mas-que-un-club.svg'},
    {id:5,titulo:'Clase Mundia FairPlay',image:'clase-mundial-fairplay.svg'}
  
  ]
  constructor(

    public jugadoresService: JugadoresService,
    public modalCtrl: ModalController

  ) { }

  ngOnInit() {
    this.jugadoresService.syncJugadoresEquipos(this.equipo.equipo.Cod_Equipo).then(jugadores => {
      this.jugadores = jugadores;
   
  
    })

  }

  async presentModal(equipo) {
    const modal = await this.modalCtrl.create({
      component: EstadisticaEquipoPage,

      cssClass:'my-custom-css',
      componentProps:{
        equipo:equipo
      }
    });
    return await modal.present();
  }
  filledStars(stars: number) {

    return new Array(stars)
  }
  emptyStars(stars: number) {
    let value = 5 - stars;
    return new Array(value)
  }

  async perfilJugador(jugador) {
    const modal = await this.modalCtrl.create({
      component: PerfilJugadorPage,
      cssClass: 'my-custom-class',
      componentProps: {
        perfil: jugador
      }
    });
    return await modal.present();
  }
  
  durezaEquipo(value){
  console.log(value.detail.value)
  alert(value)
   
  }

  regresar(){

    this.modalCtrl.dismiss();
  }

}
