import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  ActionSheetButton,
  ActionSheetController,
  ModalController,
} from '@ionic/angular';
import { BuscarJugadoresPage } from '../buscar-jugadores/buscar-jugadores.page';
import { SolicitudesService } from 'src/app/services/solicitudes.service';
import { EquiposService } from 'src/app/services/equipos.service';
import { PerfilSolicitud } from 'src/app/models/perfilSolicitud';
import { PerfilJugadorPage } from '../perfil-jugador/perfil-jugador.page';
import { Solicitudes } from 'src/app/models/solicitudes';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { AlertasService } from 'src/app/services/alertas.service';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-transferencias',
  templateUrl: './transferencias.page.html',
  styleUrls: ['./transferencias.page.scss'],
})
export class TransferenciasPage implements OnInit {
  solicitudes: PerfilSolicitud[] = [];
  segment = 'received';
  url = environment.archivosURL;
  constructor(
    public router: Router,
    public modalCtrl: ModalController,
    public solicitudesService: SolicitudesService,
    public equiposService: EquiposService,
    public actionSheetCtrl: ActionSheetController,
    public usuariosService: UsuariosService,
    public alertasService: AlertasService,
    public cd: ChangeDetectorRef,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.received();
  }
  regresar() {
    this.modalCtrl.dismiss();
  }

  async buscarJugadores() {
    const modal = await this.modalCtrl.create({
      component: BuscarJugadoresPage,
      cssClass: 'my-custom-modal',
    });

    modal.present();
    const { data } = await modal.onWillDismiss();
    if (this.segment == 'sent') {
      this.send();
    } else if (this.segment == 'received') {
      this.received();
    }
  }

  segmentChanged($event) {
    let value = $event.detail.value;
    switch (value) {
      case 'received':
        this.segment = 'received';
        this.received();
        break;
      case 'sent':
        this.segment = 'sent';
        this.send();
        break;
    }
    this.cd.detectChanges();
  }

  received() {
    this.solicitudesService
      .syncGetSolicitudesRecibidasEquipoToPromise(
        this.equiposService.equipo.equipo.Cod_Equipo
      )
      .then((solicitudes) => {
        this.solicitudes = solicitudes;
      });
  }

  send() {
    this.solicitudesService
      .syncGetSolicitudesEnviadasEquipoToPromise(
        this.equiposService.equipo.equipo.Cod_Equipo
      )
      .then((solicitudes) => {
        this.solicitudes = solicitudes;
      });
  }
  rechazar(solicitud: PerfilSolicitud) {
    const solicitudActualizar = {
      Cod_Solicitud: solicitud.solicitud.Cod_Solicitud,
      Cod_Usuario: solicitud.solicitud.Cod_Usuario,
      Cod_Equipo: solicitud.solicitud.Cod_Equipo,
      Confirmacion_Usuario: false,
      Confirmacion_Equipo: true,
      Estado: false,
      Usuarios: null,
      Equipos: null,
    };

    this.alertasService.presentaLoading(
      this.translateService.instant('LOADING')
    );
    this.solicitudesService
      .syncPutSolicitudToProimise(solicitudActualizar)
      .then(
        (resp) => {
          this.alertasService.loadingDissmiss();
          this.alertasService.message(
            'FUTPLAY',
            this.translateService.instant('REQUEST_REJECTED')
          );
          if (this.segment == 'sent') {
            this.send();
          } else if (this.segment == 'received') {
            this.received();
          }
        },
        (error) => {
          this.alertasService.loadingDissmiss();
          this.alertasService.message(
            'FUTPLAY',
            this.translateService.instant('SOMETHING_WENT_WRONG')
          );
        }
      );
  }
  async onOpenMenu(solicitud: PerfilSolicitud) {
    console.log(solicitud, 'solicitud');
    if (this.segment == 'received') {
      const normalBtns: ActionSheetButton[] = [
        {
          text: this.translateService.instant('VIEW_PROFILE'),
          icon: 'eye-outline',
          handler: () => {
            let usuario = null;
            usuario = solicitud.usuario;
            this.perfilJugador(solicitud);
          },
        },
        {
          //   text: canchaFavoritos ? 'Remover Favorito' : 'Favorito',
          // icon: canchaFavoritos ? 'heart' : 'heart-outline',
          text: this.translateService.instant('ACCEPT'),
          icon: 'checkmark-outline',
          handler: () => {
            // this.videoScreen(4);
            this.aceptar(solicitud);
          },
        },

        {
          text: this.translateService.instant('DELETE'),
          icon: 'trash-outline',
          handler: () => {
            this.rechazar(solicitud);
          },
        },

        {
          text: this.translateService.instant('CANCEL'),
          icon: 'close-outline',
          role: 'cancel',
        },
      ];

      const actionSheet = await this.actionSheetCtrl.create({
        header: this.translateService.instant('OPTIONS'),
        cssClass: 'left-align-buttons',
        buttons: normalBtns,
        mode: 'ios',
      });

      await actionSheet.present();
    } else {
      const normalBtns: ActionSheetButton[] = [
        {
          text: this.translateService.instant('VIEW_PROFILE'),
          icon: 'eye-outline',
          handler: () => {
            let usuario = null;
            usuario = solicitud.usuario;
            this.perfilJugador(solicitud);
          },
        },

        {
          text: this.translateService.instant('DELETE'),
          icon: 'trash-outline',
          handler: () => {
            this.rechazar(solicitud);
          },
        },

        {
          text: this.translateService.instant('CANCEL'),
          icon: 'close-outline',
          role: 'cancel',
        },
      ];

      const actionSheet = await this.actionSheetCtrl.create({
        header: this.translateService.instant('OPTIONS'),
        cssClass: 'left-align-buttons',
        buttons: normalBtns,
        mode: 'ios',
      });

      await actionSheet.present();
    }
  }

  aceptar(solicitud: PerfilSolicitud) {
    const solicitudActualizar: Solicitudes = {
      Cod_Solicitud: solicitud.solicitud.Cod_Solicitud,
      Cod_Usuario: solicitud.solicitud.Cod_Usuario,
      Cod_Equipo: solicitud.solicitud.Cod_Equipo,
      Confirmacion_Usuario: true,
      Confirmacion_Equipo: true,
      Estado: true,
    };
    this.alertasService.presentaLoading(
      this.translateService.instant('LOADING')
    );
    this.solicitudesService
      .syncPutSolicitudToProimise(solicitudActualizar)
      .then(
        (resp) => {
          this.alertasService.loadingDissmiss();
          this.alertasService.message(
            'FUTPLAY',
            this.translateService.instant('REQUEST_ACCEPTED')
          );
          if (this.segment == 'sent') {
            this.send();
          } else if (this.segment == 'received') {
            this.received();
          }
        },
        (error) => {
          this.alertasService.loadingDissmiss();
          this.alertasService.message(
            'FUTPLAY',
            this.translateService.instant('SOMETHING_WENT_WRONG')
          );
        }
      );
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
}
