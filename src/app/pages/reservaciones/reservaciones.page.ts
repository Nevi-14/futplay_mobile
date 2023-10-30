import { Component } from '@angular/core';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { PerfilReservaciones } from 'src/app/models/perfilReservaciones';
import { ReservacionesService } from 'src/app/services/reservaciones.service';
import { UsuariosService } from '../../services/usuarios.service';
import { CanchasService } from '../../services/canchas.service';
import { PartidoService } from 'src/app/services/partido.service';
import { Router } from '@angular/router';
import { AceptarRetoAbiertoPage } from '../aceptar-reto-abierto/aceptar-reto-abierto.page';
import { InicioPartidoPage } from '../inicio-partido/inicio-partido.page';
import { environment } from 'src/environments/environment';
import { AlertasService } from 'src/app/services/alertas.service';
import { EquiposService } from 'src/app/services/equipos.service';
import { FinalizarReservacionPage } from '../finalizar-reservacion/finalizar-reservacion.page';
import { AceptarRetoPage } from '../aceptar-reto/aceptar-reto.page';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-reservaciones',
  templateUrl: './reservaciones.page.html',
  styleUrls: ['./reservaciones.page.scss'],
})
export class ReservacionesPage {
  url = environment.archivosURL;
  isModalOpen: boolean = false;
  reservaciones: PerfilReservaciones[] = [];
  recibidos = [];
  segment = 'AVAILABLE';
  textoBuscar = '';
  constructor(
    public reservacionesService: ReservacionesService,
    public usuariosService: UsuariosService,
    public modalCtrl: ModalController,
    public canchasService: CanchasService,
    public partidosService: PartidoService,
    public actionSheetCtrl: ActionSheetController,
    public router: Router,
    public alertasService: AlertasService,
    public equiposService: EquiposService,
    public translateService: TranslateService
  ) {}

  async ionViewWillEnter() {
    this.segment = 'AVAILABLE';
    this.cargarReservaciones({ detail: { value: 'AVAILABLE' } });
    this.recibidos =
      await this.reservacionesService.syncgGtReservacionesRecibidas(
        this.usuariosService.usuarioActual.Cod_Usuario
      );
  }
  onSearchChange($event){
    this.textoBuscar = $event.detail.value;
  }
  async cargarReservaciones($event: any) {
    this.alertasService.presentaLoading(
      this.translateService.instant('LOADING')
    );
    switch ($event.detail.value) {
      case 'AVAILABLE':
        this.reservaciones =
          await this.reservacionesService.syncGetReservacionesAbiertasToPromise();
        break;
      case 'CONFIRMED':
        this.reservaciones =
          await this.reservacionesService.syncgGtReservacionesConfirmadas(
            this.usuariosService.usuarioActual.Cod_Usuario
          );
        break;
      case 'RECEIVED':
        this.reservaciones =
          await this.reservacionesService.syncgGtReservacionesRecibidas(
            this.usuariosService.usuarioActual.Cod_Usuario
          );
        break;
      case 'SENT':
        this.reservaciones =
          await this.reservacionesService.syncgGtReservacionesEnviadas(
            this.usuariosService.usuarioActual.Cod_Usuario
          );
        break;
      case 'HISTORY':
        this.reservaciones =
          await this.reservacionesService.syncgGtReservacionesHistorial(
            this.usuariosService.usuarioActual.Cod_Usuario
          );
        break;
    }
    this.recibidos =
    await this.reservacionesService.syncgGtReservacionesRecibidas(
      this.usuariosService.usuarioActual.Cod_Usuario
    );
    this.alertasService.loadingDissmiss();
  }

  async iniciarPartido(reto: PerfilReservaciones) {
    console.log(reto);
    let partido = await this.partidosService.syncGetPartidoReservacion(
      reto.reservacion.Cod_Reservacion
    );
    if (partido.length == 0) {
      this.alertasService.message(
        'FUTPLAY',
        this.translateService.instant('SOMETHING_WENT_WRONG')
      );
    } else {
      this.partidoActual(reto);
    }
  }

  async aceptarRetoAbierto(reto: PerfilReservaciones) {
    if (reto.reservacion.Cod_Estado == 7) {
      return this.finalizarReservacion(reto);
    }
    if (reto.reservacion.Cod_Estado == 5 || reto.reservacion.Cod_Estado == 4) {
      return this.partidoActual(reto);
    }
    const modal = await this.modalCtrl.create({
      component: AceptarRetoAbiertoPage,
      cssClass: 'my-custom-class',
      componentProps: {
        reto: reto,
      },
      id: 'aceptar-reto',
    });
    await modal.present();
    let { data } = await modal.onDidDismiss();
    this.cargarReservaciones({ detail: { value: 'AVAILABLE' } });
  }

  detalleReto(reto: PerfilReservaciones) {
    switch (this.segment) {
      case 'AVAILABLE':
        this.aceptarRetoAbierto(reto);
        break;
      case 'CONFIRMED':
        this.retoConfirmado(reto);
        break;
      case 'RECEIVED':
        this.retosRecibidos(reto);
        break;
      case 'SENT':
        this.detalleRetoEnviado(reto);
        break;
    }
  }

  async partidoActual(reto: PerfilReservaciones) {
    let partido = await this.partidosService.syncGetPartidoReservacion(
      reto.reservacion.Cod_Reservacion
    );
    const modal = await this.modalCtrl.create({
      component: InicioPartidoPage,
      cssClass: 'my-custom-class',
      componentProps: {
        reto: reto,
        partido: partido,
      },
      id: 'inicio-partido',
    });

    await modal.present();
    let { data } = await modal.onDidDismiss();

    this.cargarReservaciones({ detail: { value: this.segment} });
  }

  async finalizarReservacion(reto: PerfilReservaciones) {
    let cancha = await this.canchasService.syncGetPerfilCanchaToPromise(
      reto.cancha.Cod_Cancha
    );
    let rival = await this.equiposService.syncGetPerfilEquipoToPromise(
      reto.rival.Cod_Equipo
    );
    let retador = await this.equiposService.syncGetPerfilEquipoToPromise(
      reto.retador.Cod_Equipo
    );
    if (!this.isModalOpen) {
      this.isModalOpen = true;
      const modal = await this.modalCtrl.create({
        component: FinalizarReservacionPage,
        cssClass: 'my-custom-modal',
        mode: 'md',
        componentProps: {
          cancha: cancha[0],
          nuevaReservacion: reto.reservacion,
          detalleReservacion: reto.detalle,
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

  async finalizarReservacionConfirmada(reto: PerfilReservaciones) {
    let cancha = await this.canchasService.syncGetPerfilCanchaToPromise(
      reto.cancha.Cod_Cancha
    );
    let rival = await this.equiposService.syncGetPerfilEquipoToPromise(
      reto.rival.Cod_Equipo
    );
    let retador = await this.equiposService.syncGetPerfilEquipoToPromise(
      reto.retador.Cod_Equipo
    );
    if (!this.isModalOpen) {
      this.isModalOpen = true;
      const modal = await this.modalCtrl.create({
        component: FinalizarReservacionPage,
        cssClass: 'my-custom-modal',
        mode: 'md',
        componentProps: {
          cancha: cancha[0],
          nuevaReservacion: reto.reservacion,
          detalleReservacion: reto.detalle,
          rival: rival[0],
          retador: retador[0],
          efectuarPago: true,
        },
      });
      await modal.present();
      const { data } = await modal.onDidDismiss();
      this.isModalOpen = false;
      this.cargarReservaciones({ detail: { value: 'CONFIRMED' } });
    }
  }

  async retoConfirmado(reto: PerfilReservaciones) {
    if (reto.reservacion.Cod_Estado == 7) {
      return this.finalizarReservacionConfirmada(reto);
    }
    this.iniciarPartido(reto);
  }
  async detalleRetoEnviado(reto: PerfilReservaciones) {
    const modal = await this.modalCtrl.create({
      component: AceptarRetoPage,
      cssClass: 'my-custom-class',
      componentProps: {
        reto: reto,
      },
    });
    await modal.present();
    let { data } = await modal.onDidDismiss();
    this.cargarReservaciones({ detail: { value: 'SENT' } });
  }

  async retosRecibidos(reto: PerfilReservaciones) {
    let cancha = await this.canchasService.syncGetPerfilCanchaToPromise(
      reto.cancha.Cod_Cancha
    );
    let rival = await this.equiposService.syncGetPerfilEquipoToPromise(
      reto.rival.Cod_Equipo
    );
    let retador = await this.equiposService.syncGetPerfilEquipoToPromise(
      reto.retador.Cod_Equipo
    );
    if (!this.isModalOpen) {
      this.isModalOpen = true;
      const modal = await this.modalCtrl.create({
        component: FinalizarReservacionPage,
        cssClass: 'my-custom-modal',
        mode: 'md',
        componentProps: {
          cancha: cancha[0],
          nuevaReservacion: reto.reservacion,
          detalleReservacion: reto.detalle,
          rival: rival[0],
          retador: retador[0],
          efectuarPago: true,
        },
      });
      await modal.present();
      const { data } = await modal.onDidDismiss();
      this.isModalOpen = false;
      this.cargarReservaciones({ detail: { value: 'RECEIVED' } });
    }
  }
}
