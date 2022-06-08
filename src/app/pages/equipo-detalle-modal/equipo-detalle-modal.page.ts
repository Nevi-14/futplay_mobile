import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { vistaEquipos } from 'src/app/models/vistaEquipos';
import { EquiposService } from 'src/app/services/equipos.service';
import { AlertasService } from 'src/app/services/alertas.service';
import { EstadisticaEquipoPage } from '../estadistica-equipo/estadistica-equipo.page';
import { PerfilJugadorPage } from '../perfil-jugador/perfil-jugador.page';
import { GenerarReservacionPage } from '../generar-reservacion/generar-reservacion.page';

@Component({
  selector: 'app-equipo-detalle-modal',
  templateUrl: './equipo-detalle-modal.page.html',
  styleUrls: ['./equipo-detalle-modal.page.scss'],
})
export class EquipoDetalleModalPage implements OnInit {
@Input() equipo:vistaEquipos;
stadiumProfile =  'assets/main/player-profile.svg';
teamPic =  null;
img = '';
dureza = '';
  constructor(
    public modalCtrl: ModalController,
    public equiposService: EquiposService,
    public alertasService: AlertasService
  ) { }

  ngOnInit() {
    this.teamPic = this.equiposService.perfilEquipo ? 'https://dev-coding.com/FUTPLAY_APIS_HOST/PerfilEquipoUploads/'+  this.equipo.Foto  +'?'+ this.dateF() : 'assets/team.png';
    this.img = 'assets/img/equipos/'+ this.equipo.Foto;
    this.dureza = 'assets/icons/'+this.equipo.Dureza
    console.log(this.equipo)
  }

  dateF(){
    return new Date().getTime() 
  }

      
  async rivalReservacion(rival){

  
     
    const modal  = await this.modalCtrl.create({
     component: GenerarReservacionPage,
     cssClass: 'my-custom-class',
     componentProps:{
      rival:rival,
      retador:null,
      cancha:null

     }
   });
   await modal .present();
 }
  ionViewWillEnter(){
    if( this.equipo){
      this.equiposService.jugadoresPerfilEquipo = []
      this.alertasService.presentaLoading('Cargando lista de jugadores...')
      this.equiposService.SyncJugadoresEquipos( this.equipo.Cod_Equipo).then( jugadores =>{
        this.equiposService.jugadoresPerfilEquipo = jugadores;
    this.alertasService.loadingDissmiss();
        
      }, error =>{

        this.alertasService.loadingDissmiss();
        this.alertasService.message('FUTPLAY', 'Error cargando lista de jugadores...')
      })

    }

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

  async perfilJugador(jugador) {
    const modal = await this.modalCtrl.create({
      component:PerfilJugadorPage,
      cssClass: 'my-custom-class',
      componentProps:{
        perfil: jugador
      }
    });
    return await modal.present();
  }

  cerrarModal(){
    this.modalCtrl.dismiss();
  }

}
