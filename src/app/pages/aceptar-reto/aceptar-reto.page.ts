import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CanchasService } from 'src/app/services/canchas.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { AlertasService } from 'src/app/services/alertas.service';
import { PerfilReservaciones } from '../../models/perfilReservaciones';
import { ReservacionesService } from 'src/app/services/reservaciones.service';
import { PartidoService } from '../../services/partido.service';
import { partidos } from '../../models/partidos';
import { JugadoresService } from 'src/app/services/jugadores.service';
import { PerfilJugador } from '../../models/perfilJugador';
import { PerfilEquipos } from 'src/app/models/perfilEquipos';
import { EquiposService } from 'src/app/services/equipos.service';
import { CanchaDetallePage } from '../cancha-detalle/cancha-detalle.page';
import { EquipoDetalleModalPage } from '../equipo-detalle-modal/equipo-detalle-modal.page';
import { environment } from 'src/environments/environment';
import { PerfilCancha } from 'src/app/models/perfilCancha';

@Component({
  selector: 'app-aceptar-reto',
  templateUrl: './aceptar-reto.page.html',
  styleUrls: ['./aceptar-reto.page.scss'],
})
export class AceptarRetoPage implements OnInit {
  cancha: PerfilCancha;
  @Input() reto: PerfilReservaciones;
  @Input() aceptar = false;
  @Input() partido: partidos[];
  jugadoresPermitidosRetador: PerfilJugador[] = [];
  jugadoresPermitidosRival: PerfilJugador[] = [];
  rival: PerfilEquipos;
  isModalOpen = false;
  danger = 'danger';
  soccer = 'assets/icon/soccer.svg';
  img = 'assets/main/team-profile.svg';
  allowDelete = false;
  allowUser = false;
  indexRetador: number = null;
  indexRival: number = null;
  unirseAlReto = false;
  total = 0;
  url = environment.archivosURL;

  constructor(
    public modalCtrl: ModalController,
    public canchasService: CanchasService,
    public usuariosService: UsuariosService,
    public alertasService: AlertasService,
    public reservacionesService: ReservacionesService,
    public partidosService: PartidoService,
    public jugadoresService: JugadoresService,
    public equiposService: EquiposService
  ) {}

  async ngOnInit() {
    let canchas = await this.canchasService.syncGetPerfilCanchaToPromise(
      this.reto.reservacion.Cod_Cancha
    );
    this.cancha = canchas[0];
    this.total = Number(
      ((10 / 100) * this.reto.detalle.Monto_Total).toFixed(2)
    );
    this.jugadoresPermitidosRetador = await this.jugadoresService.syncJugadoresEquipos(
      this.reto.retador.Cod_Equipo
    );
    this.jugadoresPermitidosRival = await this.jugadoresService.syncJugadoresEquipos(
      this.reto.rival.Cod_Equipo
    );
    this.indexRetador = this.jugadoresPermitidosRetador.findIndex(
      (user) => user.usuario.Cod_Usuario == this.usuariosService.usuarioActual.Cod_Usuario
    );
    this.indexRival = this.jugadoresPermitidosRival.findIndex(
      (user) => user.usuario.Cod_Usuario == this.usuariosService.usuarioActual.Cod_Usuario
    );
  }

  async canchaDetalle() {
    let cancha = await this.canchasService.syncGetPerfilCanchaToPromise(
      this.reto.cancha.Cod_Cancha
    );
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

  async equipoRetadorDetalle() {
    let equipo = await this.equiposService.syncGetPerfilEquipoToPromise(
      this.reto.retador.Cod_Equipo
    );
    const modal = await this.modalCtrl.create({
      component: EquipoDetalleModalPage,
      mode: 'md',
      backdropDismiss: false,
      componentProps: {
        reservar: false,
        equipo: equipo[0],
      },
    });

    return await modal.present();
  }

  async equipoRivalDetalle() {
    let equipo = await this.equiposService.syncGetPerfilEquipoToPromise(
      this.reto.rival.Cod_Equipo
    );
    const modal = await this.modalCtrl.create({
      component: EquipoDetalleModalPage,
      mode: 'md',
      backdropDismiss: false,
      componentProps: {
        reservar: false,
        equipo: equipo[0],
      },
    });

    return await modal.present();
  }

  regresar() {
    this.modalCtrl.dismiss();
  }
}