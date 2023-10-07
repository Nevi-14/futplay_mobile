import { Component, OnInit } from '@angular/core';
import { PerfilReservaciones } from 'src/app/models/perfilReservaciones';
import { ReservacionesService } from 'src/app/services/reservaciones.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { CanchasService } from 'src/app/services/canchas.service';
import { EquiposService } from 'src/app/services/equipos.service';
import { FinalizarReservacionPage } from '../finalizar-reservacion/finalizar-reservacion.page';
import { InicioPartidoPage } from '../inicio-partido/inicio-partido.page';
import { PartidoService } from 'src/app/services/partido.service';
import { AlertasService } from 'src/app/services/alertas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-retos-confirmados',
  templateUrl: './retos-confirmados.page.html',
  styleUrls: ['./retos-confirmados.page.scss'],
})
export class RetosConfirmadosPage implements OnInit {
  url = environment.archivosURL;
  reservaciones: PerfilReservaciones[] = [];
  isModalOpen: boolean = false;
  constructor(
    public reservacionesService: ReservacionesService,
    public usuariosSErvice: UsuariosService,
    public modalCtrl: ModalController,
    public canchasService: CanchasService,
    public equiposService: EquiposService,
    public partidosService: PartidoService,
    public alertasService: AlertasService,
    public router: Router
  ) {}

  async iniciarPartido(reto: PerfilReservaciones) {
    let partido = await this.partidosService.syncGetPartidoReservacion(
      reto.reservacion.Cod_Reservacion
    );
    if (partido.length == 0) {
      this.alertasService.message(
        'FUTPLAY',
        'Lo sentimos, algo salio mal, intentalo mas tarde!.'
      );
    } else {
      this.partidoActual(reto);
    }
  }
  regresar() {
    this.router.navigateByUrl('/futplay/reservaciones', { replaceUrl: true });
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

    this.reservacionesService.selectCategory();

    this.reservacionesConfirmadas();
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
      this.reservacionesConfirmadas();
    }
  }
  async detalleReto(reto: PerfilReservaciones) {
    if (reto.reservacion.Cod_Estado == 7) {
      return this.finalizarReservacion(reto);
    }
    this.iniciarPartido(reto);
  }

  ngOnInit() {
    this.reservacionesConfirmadas();
  }
  reservacionesConfirmadas() {
    this.reservacionesService
      .syncgGtReservacionesConfirmadas(
        this.usuariosSErvice.usuarioActual.Cod_Usuario
      )
      .then((reservaciones) => {
        this.reservaciones = reservaciones;
      });
  }
}
