import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { format } from 'date-fns';
import { ConfirmacionPagos } from 'src/app/models/confirmacionPagos';
import { DetalleReservaciones } from 'src/app/models/detalleReservaciones';
import { PerfilCancha } from 'src/app/models/perfilCancha';
import { PerfilEquipos } from 'src/app/models/perfilEquipos';
import { Reservaciones } from 'src/app/models/reservaciones';
import { AlertasService } from 'src/app/services/alertas.service';
import { ConfirmacionPagosService } from 'src/app/services/confirmacion-pagos.service';
import { EmailService } from 'src/app/services/email.service';
import { ReservacionesService } from 'src/app/services/reservaciones.service';
import { StripeService } from 'src/app/services/stripe.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-finalizar-reservacion',
  templateUrl: './finalizar-reservacion.page.html',
  styleUrls: ['./finalizar-reservacion.page.scss'],
})
export class FinalizarReservacionPage {
  @Input() cancha: PerfilCancha;
  @Input() nuevaReservacion: Reservaciones;
  @Input() detalleReservacion: DetalleReservaciones;
  @Input() rival: PerfilEquipos;
  @Input() retador: PerfilEquipos;
  @Input() efectuarPago: boolean;
 pagoPendiente = false;
  total = 0;
  url = environment.archivosURL;
   pago:ConfirmacionPagos[] = [];
  constructor(
    private alertController: AlertController,
    public modalCtrl: ModalController,
    public alertasService: AlertasService,
    public gestionReservacionesService: ReservacionesService,
    public emailService: EmailService,
    public usuariosService: UsuariosService,
    public router: Router,
    public reservacionesService: ReservacionesService,
    public stripeService: StripeService,
    private translateService: TranslateService,
    public confirmacionPagosService: ConfirmacionPagosService
  ) {}

  async presentAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async ionViewWillEnter() {
    this.pagoPendiente = this.nuevaReservacion.Cod_Estado == 7 ? true : false;

   this.pago =  await this.confirmacionPagosService.getConfirmacionPagoToPromise(this.nuevaReservacion.Cod_Reservacion);
 
    console.log(
      this.nuevaReservacion,
      this.detalleReservacion,
      this.rival,
      this.retador,
      this.cancha
    );
    this.detalleReservacion.Cod_Retador = this.retador.equipo.Cod_Equipo;
    if (this.rival) {
      this.detalleReservacion.Cod_Rival = this.rival.equipo.Cod_Equipo;
    }
    this.detalleReservacion.Monto_Total =
      this.detalleReservacion.Total_Horas * this.cancha.cancha.Precio_Hora;
    this.detalleReservacion.Precio_Hora = this.cancha.cancha.Precio_Hora;

    this.detalleReservacion.Monto_Equipo =
      this.detalleReservacion.Monto_Total / 2;
    if (this.nuevaReservacion.Cod_Tipo == 1) {
      let monto = (10 / 100) * this.detalleReservacion.Monto_Total;
      this.total = Number((monto * 2).toFixed(2));
      this.detalleReservacion.Monto_FP = this.total;
    } else {
      this.total = Number(
        ((10 / 100) * this.detalleReservacion.Monto_Total).toFixed(2)
      );
      this.detalleReservacion.Monto_FP = this.total * 2;
    }
    this.detalleReservacion.Porcentaje_FP = 10;

    this.nuevaReservacion.Detalle = `${this.formatoAmPM(
      new Date(this.nuevaReservacion.Hora_Inicio)
    )} en  ${this.cancha.cancha.Nombre} `;
  }

  regresar() {
    this.modalCtrl.dismiss();
  }

  enviarReto() {
    this.alertasService.presentaLoading(
      this.translateService.instant('SAVING')
    );
    if (this.nuevaReservacion.Cod_Tipo == 1) {
      this.nuevaReservacion.Titulo = this.translateService.instant(
        'INDIVIDUAL_RESERVATION'
      );
      this.detalleReservacion.Notas_Estado = this.translateService.instant(
        'INDIVIDUAL_RESERVATION'
      );
    } else if (this.nuevaReservacion.Cod_Tipo == 2) {
      this.nuevaReservacion.Titulo = this.translateService.instant(
        'OPEN_RESERVATION'
      );
      this.detalleReservacion.Cod_Rival = this.retador.equipo.Cod_Equipo;
      this.detalleReservacion.Notas_Estado = this.translateService.instant(
        'PENDING_CONFIRMATION'
      );
    } else {
      this.detalleReservacion.Notas_Estado = this.translateService.instant(
        'PENDING_CONFIRMATION'
      );
      this.nuevaReservacion.Titulo =
        this.retador.equipo.Abreviacion +
        ' VS ' +
        this.rival.equipo.Abreviacion;
    }
    this.nuevaReservacion.Fecha = format(
      new Date(this.nuevaReservacion.Fecha),
      'yyy-MM-dd'
    );
    this.nuevaReservacion.Hora_Inicio =
      format(new Date(this.nuevaReservacion.Hora_Inicio), 'yyy-MM-dd') +
      ' ' +
      new Date(this.nuevaReservacion.Hora_Inicio)
        .toTimeString()
        .split(' ')[0];
    this.nuevaReservacion.Hora_Fin =
      format(new Date(this.nuevaReservacion.Hora_Fin), 'yyy-MM-dd') +
      ' ' +
      new Date(this.nuevaReservacion.Hora_Fin).toTimeString().split(' ')[0];
    if (this.nuevaReservacion.Cod_Tipo == 2) {
      this.nuevaReservacion.Cod_Estado = 10;
      this.detalleReservacion.Cod_Estado = 10;
    } else if (this.nuevaReservacion.Cod_Tipo == 3) {
      this.nuevaReservacion.Cod_Estado = 2;
      this.detalleReservacion.Cod_Estado = 3;
    } else {
      this.nuevaReservacion.Cod_Estado = 4;
      this.detalleReservacion.Cod_Estado = 4;
    }
    this.detalleReservacion.Confirmacion_Rival = true;
    this.gestionReservacionesService
      .insertarReservacionToPromise(this.nuevaReservacion)
      .then(
        (resp: any) => {
          this.detalleReservacion.Cod_Reservacion =
            resp.reservacion.Cod_Reservacion;
          this.gestionReservacionesService
            .insertarDetalleReservacionToPromise(this.detalleReservacion)
            .then(
              async (resp) => {
                if (this.rival && this.retador) {
                  this.emailService
                    .enviarCorreoReservaciones(
                      1,
                      this.rival.correo
                    )
                    .then(
                      async (resp) => {
                        await this.gestionReservacionesService.cargarReservaciones();
                        this.regresar();
                        this.alertasService.loadingDissmiss();
                        this.alertasService.message(
                          'FUTPLAY',
                          this.translateService.instant(
                            'CHALLENGE_SENT_SUCCESSFULLY'
                          )
                        );
                      },
                      (error) => {
                        this.alertasService.loadingDissmiss();
                      }
                    );
                } else {
                  await this.gestionReservacionesService.cargarReservaciones();
                  this.regresar();
                  this.alertasService.loadingDissmiss();
                  this.alertasService.message(
                    'FUTPLAY',
                    this.translateService.instant(
                      'CHALLENGE_SENT_SUCCESSFULLY'
                    )
                  );
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
          return;
          this.regresar();
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

  formatoAmPM(date: Date) {
    // hour: 'numeric', minute: 'numeric', hour12: true
    return date.toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  }
}