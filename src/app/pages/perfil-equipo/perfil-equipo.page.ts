import { Component } from '@angular/core';
import { ActionSheetButton, ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { EquipoGeolocalizacion } from 'src/app/models/equipoGeolocalizacion';
import { AlertasService } from '../../services/alertas.service';
import { EquiposGeolocalizacionService } from '../../services/equipos-geolocalizacion.service';
import { EquiposService } from '../../services/equipos.service';
import { JugadoresService } from '../../services/jugadores.service';
import { SolicitudesService } from '../../services/solicitudes.service';
import { UsuariosService } from '../../services/usuarios.service';
import { EditarPerfilEquipoPage } from '../editar-perfil-equipo/editar-perfil-equipo.page';
import { EquipoGeolocalizacionPage } from '../equipo-geolocalizacion/equipo-geolocalizacion.page';
import { EstadisticaEquipoPage } from '../estadistica-equipo/estadistica-equipo.page';
import { MisEquiposPage } from '../mis-equipos/mis-equipos.page';
import { PerfilJugadorPage } from '../perfil-jugador/perfil-jugador.page';
import { TransferenciasPage } from '../transferencias/transferencias.page';
import { Router } from '@angular/router';
import { PerfilJugador } from 'src/app/models/perfilJugador';

@Component({
  selector: 'app-perfil-equipo',
  templateUrl: './perfil-equipo.page.html',
  styleUrls: ['./perfil-equipo.page.scss'],
})
export class PerfilEquipoPage {
  equipoGeolocalizacion: EquipoGeolocalizacion;
  url = environment.archivosURL;
  dureza = [
    {
      id: 0,
      titulo: this.translateService.instant('NEUTRAL_TEAM'),
      image: 'equipo-neutral.svg',
    },
    {
      id: 1,
      titulo: this.translateService.instant('ANNOYING_GAME'),
      image: 'juego-molesto.svg',
    },
    {
      id: 2,
      titulo: this.translateService.instant('IRRESPONSIBLE_AGGRESSIVENESS'),
      image: 'agresividad-irresponsable.svg',
    },
    {
      id: 3,
      titulo: this.translateService.instant('REBELLIOUS_CHARACTER'),
      image: 'caracter-revelde.svg',
    },
    {
      id: 4,
      titulo: this.translateService.instant('MORE_THAN_A_CLUB'),
      image: 'mas-que-un-club.svg',
    },
    {
      id: 5,
      titulo: this.translateService.instant('WORLD_CLASS_FAIR_PLAY'),
      image: 'clase-mundial-fairplay.svg',
    },
  ];
  teamPic = null;
  modalOpen = false;

  constructor(
    public equiposService: EquiposService,
    public jugadoresService: JugadoresService,
    public actionSheetCtrl: ActionSheetController,
    public modalCtrl: ModalController,
    public solicitudesService: SolicitudesService,
    public alertasService: AlertasService,
    public alertCtrl: AlertController,
    public usuariosService: UsuariosService,
    public equipoGeolocalizacionService: EquiposGeolocalizacionService,
    private translateService: TranslateService,
    public router: Router
  ) {}

    ionViewWillEnter() {
 this.cargarEquipos();
  }
async cargarEquipos(){
  let equipos = await this.equiposService.syncMisEquiposToPromise(
    this.usuariosService.usuarioActual.Cod_Usuario
  );
  if (equipos.length == 0)
    return this.router.navigateByUrl('/futplay/crear-unirse-equipo', {
      replaceUrl: true,
    });
    this.equiposService.misEquipos = equipos;
    this.equiposService.equipo = this.equiposService.misEquipos[0];
  this.solicitudesService
    .syncGetSolicitudesRecibidasEquipoToPromise(
      this.equiposService.equipo.equipo.Cod_Equipo
    )
    .then((solicitudes) => {
      this.solicitudesService.solicitudesEquiposArray = solicitudes;

      this.jugadoresService
        .syncJugadoresEquipos(this.equiposService.equipo.equipo.Cod_Equipo)
        .then((jugadores) => {
          this.jugadoresService.jugadores = jugadores;
          this.equipoGeolocalizacionService
            .syncGetEquipoGeolocalizacionToPromise(
              this.equiposService.equipo.equipo.Cod_Equipo
            )
            .then((geolocalizacion) => {
              this.equipoGeolocalizacion = geolocalizacion[0];
            });
        });
    });
}
  filledStars(stars: number) {
    return new Array(stars);
  }

  emptyStars(stars: number) {
    let value = 5 - stars;
    return new Array(value);
  }

  async equipoGeolocalizacionModal() {

    if(this.usuariosService.usuarioActual.Cod_Usuario != this.equiposService.equipo.equipo.Cod_Usuario) return
    if (!this.modalOpen) {
      const modal = await this.modalCtrl.create({
        component: EquipoGeolocalizacionPage,
        backdropDismiss: false,
        cssClass: 'alert-modal',
        mode: 'md',
        componentProps: {
          equipoGeolocalizacion: this.equipoGeolocalizacion,
        },
      });
      this.modalOpen = true;

      await modal.present();
      const { data } = await modal.onWillDismiss();

      this.modalOpen = false;
    }
  }

  async leaveTeam() {

    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'FUTPLAY',
      message: this.translateService.instant('LEAVE_TEAM_CONFIRMATION'),
      buttons: [
        {
          text: this.translateService.instant('CANCEL'),
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {},
        },
        {
          text: this.translateService.instant('CONFIRM'),
          id: 'confirm-button',
          handler: () => {
            let jugador:PerfilJugador = null ;
            let index = this.jugadoresService.jugadores.findIndex( e=> e.usuario.Cod_Usuario == this.usuariosService.usuarioActual.Cod_Usuario);
            if(index >=0){
              jugador = this.jugadoresService.jugadores[index];
            }
            this.alertasService.presentaLoading(
              this.translateService.instant('VALIDATING_DATA')
            );
            this.jugadoresService
              .syncDeleteJugadorEquipo(jugador.jugador.Cod_Jugador)
              .then(
                (resp) => {
                  this.alertasService.loadingDissmiss();
                  this.cargarEquipos();
                  this.alertasService.message(
                    'FUTPLAY',
                    this.translateService.instant('ACTION_COMPLETE')
                  );
                },
                (error) => {
                  this.alertasService.loadingDissmiss();
                  this.alertasService.message(
                    'FUTPLAY',
                    this.translateService.instant('SOMETHING_WENT_WRONG')
                  );
                }
              );
          },
        },
      ],
    });

    await alert.present();
  }
  async gestionarPerfil() {
    const modal = await this.modalCtrl.create({
      component: EditarPerfilEquipoPage,
      mode: 'md',
      componentProps: {
        equipo: this.equiposService.equipo.equipo,
      },
      cssClass: 'my-custom-modal',
    });

    modal.present();
    const { data } = await modal.onWillDismiss();

    if(data){
      this.cargarEquipos();
 
    }
  }

  async myClubsMenu() {
    const modal = await this.modalCtrl.create({
      component: MisEquiposPage,
      cssClass: 'my-custom-modal',
      mode: 'md',
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();

    this.jugadoresEquipo();
  }

  async onOpenMenu(jugador) {
    let normalBtns: ActionSheetButton[];

    if (
      this.usuariosService.usuarioActual.Cod_Usuario ==
      this.equiposService.equipo.equipo.Cod_Usuario
    ) {
      normalBtns = [
        {
          text: this.translateService.instant('PLAYER_DETAILS'),
          icon: 'person-outline',
          handler: () => {
            this.perfilJugador(jugador);
          },
        },
        {
          text: this.translateService.instant('REMOVE_USER'),
          icon: 'lock-closed-outline',
          handler: () => {
            this.confirmDelete(jugador);
          },
        },

        {
          text: this.translateService.instant('CANCEL'),
          icon: 'close-outline',
          role: 'cancel',
        },
      ];
    } else {
      normalBtns = [
        {
          text: this.translateService.instant('PLAYER_DETAILS'),
          icon: 'person-outline',
          handler: () => {
            this.perfilJugador(jugador);
          },
        },

        {
          text: this.translateService.instant('CANCEL'),
          icon: 'close-outline',
          role: 'cancel',
        },
      ];
    }

    const actionSheet = await this.actionSheetCtrl.create({
      header: this.translateService.instant('OPTIONS'),
      cssClass: 'left-align-buttons',
      buttons: normalBtns,
      mode: 'ios',
    });

    await actionSheet.present();
  }

  async solicitudesEquipos() {
    if (!this.modalOpen) {
      const modal = await this.modalCtrl.create({
        component: TransferenciasPage,
        cssClass: 'alert-modal',
        mode: 'md',
      });
      this.modalOpen = true;

      await modal.present();
      const { data } = await modal.onWillDismiss();

      this.modalOpen = false;
      this.jugadoresEquipo();
    }
  }

  jugadoresEquipo() {
    this.solicitudesService
      .syncGetSolicitudesRecibidasEquipoToPromise(
        this.equiposService.equipo.equipo.Cod_Equipo
      )
      .then((solicitudes) => {
        this.solicitudesService.solicitudesEquiposArray = solicitudes;
        this.jugadoresService
          .syncJugadoresEquipos(this.equiposService.equipo.equipo.Cod_Equipo)
          .then(
            (jugadores) => {
              this.jugadoresService.jugadores = [];
              this.jugadoresService.jugadores = jugadores;
            },
            (error) => {
              this.alertasService.message(
                'FUTPLAY',
                this.translateService.instant('SOMETHING_WENT_WRONG')
              );
            }
          );
      });
  }

  async presentModal(equipo) {
    const modal = await this.modalCtrl.create({
      component: EstadisticaEquipoPage,

      cssClass: 'my-custom-css',
      componentProps: {
        equipo: equipo,
      },
    });
    return await modal.present();
  }

  async perfilJugador(jugador) {
    const modal = await this.modalCtrl.create({
      component: PerfilJugadorPage,
      cssClass: 'my-custom-class',
      componentProps: {
        perfil: jugador,
      },
    });
    return await modal.present();
  }

  async confirmDelete(jugador) {
    if (
      jugador.usuario.Cod_Usuario ==
      this.equiposService.equipo.equipo.Cod_Usuario
    ) {
      this.alertasService.message(
        'FUTPLAY',
        this.translateService.instant('CANT_DELETE_CAPTAIN')
      );
      return;
    }
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'FUTPLAY',
      message: this.translateService.instant('CONFIRM_DELETE'),
      buttons: [
        {
          text: this.translateService.instant('CANCEL'),
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {},
        },
        {
          text: this.translateService.instant('CONFIRM'),
          id: 'confirm-button',
          handler: () => {
            this.alertasService.presentaLoading(
              this.translateService.instant('VALIDATING_DATA')
            );
            this.jugadoresService
              .syncDeleteJugadorEquipo(jugador.jugador.Cod_Jugador)
              .then(
                (resp) => {
                  this.alertasService.loadingDissmiss();
                  this.jugadoresEquipo();
                  this.alertasService.message(
                    'FUTPLAY',
                    this.translateService.instant('ACTION_COMPLETE')
                  );
                },
                (error) => {
                  this.alertasService.loadingDissmiss();
                  this.alertasService.message(
                    'FUTPLAY',
                    this.translateService.instant('SOMETHING_WENT_WRONG')
                  );
                }
              );
          },
        },
      ],
    });

    await alert.present();
  }
}