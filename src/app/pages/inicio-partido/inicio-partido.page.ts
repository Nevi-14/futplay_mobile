import { Component, OnInit, Input } from '@angular/core';
import { partidos } from 'src/app/models/partidos';
import { PerfilReservaciones } from 'src/app/models/perfilReservaciones';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ModalController, AlertController } from '@ionic/angular';
import { PartidoService } from 'src/app/services/partido.service';
import { EvaluacionJugadorPage } from '../evaluacion-jugador/evaluacion-jugador.page';
import { AlertasService } from '../../services/alertas.service';
import { CanchasService } from '../../services/canchas.service';
import { StorageService } from '../../services/storage-service';
import { JugadoresService } from '../../services/jugadores.service';
import { PerfilJugador } from 'src/app/models/perfilJugador';
import { TranslateService } from '@ngx-translate/core';
import { ReservacionesService } from 'src/app/services/reservaciones.service';
@Component({
  selector: 'app-inicio-partido',
  templateUrl: './inicio-partido.page.html',
  styleUrls: ['./inicio-partido.page.scss'],
})
export class InicioPartidoPage implements OnInit {
  @Input() reto: PerfilReservaciones;
  @Input() partido: partidos[];
  retador: boolean = null;
  rival: boolean = null;
  jugadoresPermitidosRetador: PerfilJugador[] = [];
  jugadoresPermitidosRival: PerfilJugador[] = [];
  constructor(
    public usuarioService: UsuariosService,
    public modalCtrl: ModalController,
    public partidosService: PartidoService,
    public alertasService: AlertasService,
    public alertCtrl: AlertController,
    public canchasService: CanchasService,
    public storageService: StorageService,
    public jugadoresService: JugadoresService,
    private translateService: TranslateService,
    public reservacionesService: ReservacionesService
  ) {}

  funcionRetador() {
    this.retador = true;
  }

  funcionRival() {
    this.rival = true;
  }

  async ngOnInit() {
    this.alertasService.presentaLoading(
      this.translateService.instant('LOADING')
    );
    this.jugadoresPermitidosRetador =
      await this.jugadoresService.syncJugadoresEquipos(
        this.reto.retador.Cod_Equipo
      );
    this.jugadoresPermitidosRival =
      await this.jugadoresService.syncJugadoresEquipos(
        this.reto.rival.Cod_Equipo
      );
    let indexRetador = this.jugadoresPermitidosRetador.findIndex(
      (user) =>
        user.usuario.Cod_Usuario ==
        this.usuarioService.usuarioActual.Cod_Usuario
    );
    let indexRival = this.jugadoresPermitidosRival.findIndex(
      (user) =>
        user.usuario.Cod_Usuario ==
        this.usuarioService.usuarioActual.Cod_Usuario
    );
    let stringID =
      this.reto.reservacion.Cod_Reservacion +
      '-' +
      this.usuarioService.usuarioActual.Cod_Usuario +
      '-' +
      this.reto.reservacion.Fecha;
    if (indexRetador >= 0 && indexRival >= 0) {
      if (
        this.jugadoresPermitidosRetador[0].usuario.Cod_Usuario ==
        this.usuarioService.usuarioActual.Cod_Usuario
      ) {
        this.funcionRetador();
      } else {
        this.funcionRival();
      }
    } else if (indexRetador >= 0 && indexRival < 0) {
      this.funcionRetador();
    } else if (indexRival >= 0 && indexRetador < 0) {
      this.funcionRival();
    }
    this.alertasService.loadingDissmiss();
    this.storageService.get(stringID).then((codigo) => {
      if (this.partido[0].Estado && this.partido[1].Estado && !codigo) {
        this.storageService.set(
          stringID,
          this.reto.reservacion.Cod_Reservacion
        );
      }
    });
  }

  async empate() {
    const alert = await this.alertCtrl.create({
      header: 'FUTPLAY!',
      subHeader: this.translateService.instant(
        'THE_GAMES_SCORE_IS_CERO_DO_YOU_WANT_TO_CONTINUE'
      ),
      buttons: [
        {
          text: this.translateService.instant('CANCEL'),
          role: 'cancel',
          handler: () => {},
        },
        {
          text: this.translateService.instant('CONTINUE'),
          role: 'confirm',
          handler: () => {
            if (this.partido[0].Cod_Equipo != this.partido[1].Cod_Equipo) {
              this.partidosService
              .syncPutFinalizarPartido(
                this.retador ? this.partido[0] : this.partido[1]
              )
              .then((resp: any) => {
                this.partido = resp.partido;
                this.regresar();
               
                this.evaluacionModal();
              });
            }else{
              this.partidosService
              .syncPutFinalizarPartido(
                this.partido[0]  
              )
              .then((resp: any) => {
                this.partido = resp.partido;
                this.partidosService.syncPutFinalizarPartido(
                this.partido[1]
                )
                .then((resp: any) => {
                  this.partido = resp.partido;
                  this.reservacionesService.cargarReservaciones();
                  this.regresar();
              
                });
           
            
              });
            }
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }
  async continuarEvaluacion() {
    const alert = await this.alertCtrl.create({
      header: 'FUTPLAY!',
      subHeader: this.translateService.instant(
        'ARE_YOU_SURE_YOU_WANT_TO_CONTINUE_YOU_WILL_NOT_BE_ABLE_TO_REVERSE_THE_PROCESS'
      ),
      buttons: [
        {
          text: this.translateService.instant('CANCEL'),
          role: 'cancel',
          handler: () => {},
        },
        {
          text: this.translateService.instant('CONTINUE'),
          role: 'confirm',
          handler: () => {
            this.partidosService
              .syncPutFinalizarPartido(
                this.retador ? this.partido[0] : this.partido[1]
              )
              .then((resp: any) => {
                this.partido = resp.partido;
                this.regresar();
                if (this.partido[0].Cod_Equipo != this.partido[1].Cod_Equipo) {
                  this.evaluacionModal();
                }
              });
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  async continuar() {
    const alert = await this.alertCtrl.create({
      header: 'FUTPLAY!',
      subHeader: this.translateService.instant(
        'ARE_YOU_SURE_YOU_WANT_TO_CONTINUE_YOU_WILL_NOT_BE_ABLE_TO_REVERSE_THE_PROCESS'
      ),
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.partidosService
              .syncPutFinalizarPartido(
                this.retador ? this.partido[0] : this.partido[1]
              )
              .then((resp: any) => {
                this.partido = resp.partido;
                this.regresar();
                if(this.partido[0].Cod_Equipo != this.partido[1].Cod_Equipo){
                  this.evaluacionModal();
                }
                
              });
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }
  async finalizarPartido() {
    this.continuar();
  }

  varificarMarcador() {
    return this.partidosService
      .syncGetPartidoReservacion(this.partido[0].Cod_Reservacion)
      .then((partido) => {
        this.partido = partido;
      });
  }
 

  async evaluacionIndividual() {
    await this.varificarMarcador();


    if (
      this.partido[0].Goles_Retador == 0 &&
      this.partido[1].Goles_Retador == 0 &&
      this.partido[0].Goles_Rival == 0 &&
      this.partido[1].Goles_Rival == 0
    ) {
      this.empate();

      return;
    }

    if (
      this.partido[0].Goles_Retador != this.partido[1].Goles_Retador ||
      this.partido[0].Goles_Rival != this.partido[1].Goles_Rival
    ) {
      this.alertasService.message(
        'FUTPLAY',
        this.translateService.instant(
          'SCORE_NOT_EQUAL_ASK_THE_OTHER_TEAM_TO_FINISH_THE_GAME'
        )
      );

      return;
    }

    this.partidosService
      .syncGetPartidoReservacion(this.reto.reservacion.Cod_Reservacion)
      .then(
        (resp) => {
          if (!resp[0].Estado && !resp[1].Estado) {
            this.alertasService.message(
              'FUTPLAY',
              this.translateService.instant('SOMETHING_WENT_WRONG')
            );
          } else {
            this.continuar();
          }
        },
        (error) => {
          this.alertasService.message(
            'FUTPLAY',
            this.translateService.instant('GAME_ALREADY_FINISHED')
          );
        }
      );
  }

  async evaluacionModal() {
    const modal = await this.modalCtrl.create({
      component: EvaluacionJugadorPage,
      cssClass: 'my-custom-class',
      componentProps: {
        jugadores: [],
        equipo: this.retador ? this.reto.retador : this.reto.rival,
        partido: this.retador ? this.partido[0] : this.partido[1],
        reto: this.reto,
      },

      id: 'evaluacion-individual',
    });

    await modal.present();
    let { data } = await modal.onDidDismiss();
  }

  sumarMarcadorRival() {
    if (this.retador) {
      this.partido[0].Goles_Rival += 1;
      this.actualizarMarcador();
      return;
    } else {
      this.partido[1].Goles_Rival += 1;

      this.actualizarMarcador();
      return;
    }
  }

  restarMarcadorRival() {
    if (this.retador) {
      this.partido[0].Goles_Rival -= 1;
      if (this.partido[0].Goles_Rival >= 0) {
        this.actualizarMarcador();
        return;
      }

      if (this.partido[0].Goles_Rival < 0) {
        this.partido[0].Goles_Rival = 0;
      }
    } else {
      this.partido[1].Goles_Rival -= 1;
      if (this.partido[1].Goles_Rival >= 0) {
        this.actualizarMarcador();
        return;
      }
      if (this.partido[1].Goles_Rival < 0) {
        this.partido[1].Goles_Rival = 0;
      }
    }
  }

  sumarMarcadorRetador() {
    if (this.retador) {
      this.partido[0].Goles_Retador += 1;
      this.actualizarMarcador();
      return;
    } else {
      this.partido[1].Goles_Retador += 1;
      this.actualizarMarcador();
      return;
    }
  }

  restarMarcadorRetador() {
    if (this.retador) {
      this.partido[0].Goles_Retador -= 1;
      if (this.partido[0].Goles_Retador >= 0) {
        this.actualizarMarcador();

        return;
      }
      if (this.partido[0].Goles_Retador < 0) {
        this.partido[0].Goles_Retador = 0;
      }
    } else {
      this.partido[1].Goles_Retador -= 1;
      if (this.partido[1].Goles_Retador >= 0) {
        this.actualizarMarcador();

        return;
      }
      if (this.partido[1].Goles_Retador < 0) {
        this.partido[1].Goles_Retador = 0;
      }
    }
  }

  regresar() {
    this.modalCtrl.dismiss(null, null, 'inicio-partido');
  }

  actualizarMarcador() {
    this.partidosService
      .syncPutPartido(this.retador ? this.partido[0] : this.partido[1])
      .then((resp: any) => {
        this.partidosService
          .syncGetPartidoReservacion(this.reto.reservacion.Cod_Reservacion)
          .then(
            (partido) => {
              this.partido = partido;

              console.log(resp);
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
}
