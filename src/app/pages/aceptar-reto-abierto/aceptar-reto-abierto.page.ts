import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { AlertasService } from 'src/app/services/alertas.service';
import { CanchasService } from 'src/app/services/canchas.service';
import { EmailService } from 'src/app/services/email.service';
import { EquiposService } from 'src/app/services/equipos.service';
import { JugadoresService } from 'src/app/services/jugadores.service';
import { PartidoService } from 'src/app/services/partido.service';
import { ReservacionesService } from 'src/app/services/reservaciones.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { FinalizarReservacionPage } from '../finalizar-reservacion/finalizar-reservacion.page';
import { ListaEquiposPage } from '../lista-equipos/lista-equipos.page';
import { CanchaDetallePage } from '../cancha-detalle/cancha-detalle.page';
import { EquipoDetalleModalPage } from '../equipo-detalle-modal/equipo-detalle-modal.page';
import { PerfilCancha } from 'src/app/models/perfilCancha';
import { PerfilEquipos } from 'src/app/models/perfilEquipos';
import { PerfilJugador } from 'src/app/models/perfilJugador';
import { PerfilReservaciones } from 'src/app/models/perfilReservaciones';

@Component({
  selector: 'app-aceptar-reto-abierto',
  templateUrl: './aceptar-reto-abierto.page.html',
  styleUrls: ['./aceptar-reto-abierto.page.scss'],
})
export class AceptarRetoAbiertoPage implements OnInit {
  @Input() reto: PerfilReservaciones;
  cancha: PerfilCancha = null;
  jugadoresPermitidosRetador: PerfilJugador[] = [];
  jugadoresPermitidosRival: PerfilJugador[] = [];
  rival: PerfilEquipos;
  isModalOpen = false;
  soccer = 'assets/icon/soccer.svg';
  img = 'assets/main/team-profile.svg';
  allowDelete = false;
  allowUser = false;
  indexRetador: number = null;
  indexRival: number = null;
  unirseAlReto = false;
  total = 0;
  danger = 'danger';
  url = environment.archivosURL;

  constructor(
    public modalCtrl: ModalController,
    public canchasService: CanchasService,
    public actionCtrl: ActionSheetController,
    public usuariosService: UsuariosService,
    public alertCtrl: AlertController,
    public alertasService: AlertasService,
    public reservacionesService: ReservacionesService,
    public partidosService: PartidoService,
    public emailService: EmailService,
    public jugadoresService: JugadoresService,
    public equiposService: EquiposService,
    public cd: ChangeDetectorRef,
    private translateService: TranslateService,
    public canchasSErvice: CanchasService
  ) {}

  async ngOnInit() {
    let canchas = await this.canchasService.syncGetPerfilCanchaToPromise(this.reto.reservacion.Cod_Cancha);
    this.cancha = canchas[0];
    this.total = Number(((10 / 100) * this.reto.detalle.Monto_Total).toFixed(2));
    console.log(this.reto, 'reto');

    this.jugadoresPermitidosRetador = await this.jugadoresService.syncJugadoresEquipos(this.reto.retador.Cod_Equipo);
    this.jugadoresPermitidosRival = await this.jugadoresService.syncJugadoresEquipos(this.reto.rival.Cod_Equipo);
    this.indexRetador = this.jugadoresPermitidosRetador.findIndex((user) => user.usuario.Cod_Usuario == this.usuariosService.usuarioActual.Cod_Usuario);
    this.indexRival = this.jugadoresPermitidosRival.findIndex((user) => user.usuario.Cod_Usuario == this.usuariosService.usuarioActual.Cod_Usuario);

    if (this.indexRival >= 0) {
      this.allowUser = true;
    } else if (this.indexRetador >= 0) {
      this.allowUser = true;
    }
  }

  async finalizarReservacion() {
    let cancha = await this.canchasService.syncGetPerfilCanchaToPromise(this.reto.cancha.Cod_Cancha);
    let rival = await this.equiposService.syncGetPerfilEquipoToPromise(this.rival.equipo.Cod_Equipo);
    let retador = await this.equiposService.syncGetPerfilEquipoToPromise(this.reto.retador.Cod_Equipo);
    this.regresar();

    if (!this.isModalOpen) {
      this.isModalOpen = true;
      const modal = await this.modalCtrl.create({
        component: FinalizarReservacionPage,
        cssClass: 'my-custom-modal',
        mode: 'ios',
        componentProps: {
          cancha: cancha[0],
          nuevaReservacion: this.reto.reservacion,
          detalleReservacion: this.reto.detalle,
          rival: rival[0],
          retador: retador[0],
          efectuarPago: true,
        },
      });
      await modal.present();
      const { data } = await modal.onDidDismiss();
      this.isModalOpen = false;
      if (data !== undefined) {
      }
    }
  }

  async canchaDetalle() {
    let cancha = await this.canchasService.syncGetPerfilCanchaToPromise(this.reto.cancha.Cod_Cancha);
    const modal = await this.modalCtrl.create({
      component: CanchaDetallePage,
      cssClass: 'modal-view',
      id: 'video-screen-modal',
      mode: 'ios',
      backdropDismiss: false,
      componentProps: {
        reservar: false,
        cancha: cancha[0],
      },
    });

    return await modal.present();
  }

  async equipoDetalle() {
    let equipo = await this.equiposService.syncGetPerfilEquipoToPromise(this.reto.retador.Cod_Equipo);
    const modal = await this.modalCtrl.create({
      component: EquipoDetalleModalPage,
      cssClass: 'modal-view',
      id: 'video-screen-modal',
      mode: 'md',
      backdropDismiss: false,
      componentProps: {
        reservar: false,
        equipo: equipo[0],
      },
    });

    return await modal.present();
  }

  async doYouWantToDelete() {
    const alert = await this.alertCtrl.create({
      header: 'FUTPLAY',
      message: '¿Desea eliminar el reto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'OK',
          role: 'Continuar',
          handler: () => {},
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  async agregarRival() {
    if (!this.isModalOpen) {
      this.isModalOpen = true;
      this.equiposService.equipos = [];
      const modal = await this.modalCtrl.create({
        component: ListaEquiposPage,
        cssClass: 'my-custom-modal',
        mode: 'ios',
        componentProps: {
          rival: false,
        },
      });
      await modal.present();
      const { data } = await modal.onDidDismiss();
      this.isModalOpen = false;
      console.log(data, 'data');
      if (data !== undefined) {
        this.rival = data.equipo;
        this.unirseAlReto = true;
        this.reto.detalle.Cod_Estado = 4;
        this.cd.detectChanges();
        this.reto.detalle.Cod_Rival = this.rival.equipo.Cod_Equipo;
        this.reto.reservacion.Titulo = this.reto.retador.Nombre + ' VS ' + this.rival.equipo.Nombre;
      }
    }
  }
  async alertaEliminar() {
    const alert = await this.alertCtrl.create({
      header: 'FUTPLAY',
      message: this.translateService.instant(
        'DO_YOU_WANT_TO_DELETE_THE_RESERVATION'
      ),
      cssClass: 'custom-alert',
      buttons: [
        {
          text: this.translateService.instant('CANCEL'),
          role: 'cancel',
          handler: () => {},
        },
        {
          text: this.translateService.instant('CONTINUE'),
          role: 'Continuar',
          handler: () => {
            this.cancelarReservacion();
          },
        },
      ],
    });

    await alert.present();
  }
  async cancelarReservacion() {
    this.alertasService.presentaLoading(this.translateService.instant(
        'LOADING'
      ));
this.reservacionesService.syncDeleteReservacion(this.reto.reservacion.Cod_Reservacion).then(async () => {
  this.alertasService.loadingDissmiss();
  this.modalCtrl.dismiss();
  this.alertasService.message('FUTPLAY', this.translateService.instant(
    'RESERVATION_DELETED_SUCCESSFULLY'
  ));
}, error => {
  this.alertasService.loadingDissmiss();
  this.alertasService.message('FUTPLAY', this.translateService.instant(
    'SOMETHING_WENT_WRONG'
  ));
})



  }

  filledStars(stars: number) {
    return new Array(stars);
  }

  emptyStars(stars: number) {
    let value = 5 - stars ? stars : 0;
    return new Array(value);
  }

  regresar() {
    this.modalCtrl.dismiss();
  }
}