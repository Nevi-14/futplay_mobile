import { Component, Input, OnInit } from '@angular/core';
import * as stripe from '@stripe/stripe-js';
import { StripeService } from 'src/app/services/stripe.service';
import { AlertasService } from 'src/app/services/alertas.service';
import { Reservaciones } from 'src/app/models/reservaciones';
import { DetalleReservaciones } from 'src/app/models/detalleReservaciones';
import { format } from 'date-fns';
import { ReservacionesService } from 'src/app/services/reservaciones.service';
import { EmailService } from 'src/app/services/email.service';
import { Router } from '@angular/router';
import { PerfilEquipos } from 'src/app/models/perfilEquipos';
import { PerfilCancha } from 'src/app/models/perfilCancha';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { CodigosDescuentosService } from 'src/app/services/codigos-descuentos.service';
import { ConfirmacionPagosService } from 'src/app/services/confirmacion-pagos.service';
import { CodigosDescuento } from 'src/app/models/codigoDescuento';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { JugadoresService } from 'src/app/services/jugadores.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})

export class PaymentComponent implements OnInit {
  @Input() cancha: PerfilCancha;
  @Input() nuevaReservacion: Reservaciones;
  @Input() detalleReservacion: DetalleReservaciones;
  @Input() rival: PerfilEquipos;
  @Input() retador: PerfilEquipos;
  @Input() monto = 0;
  codigoDescuento: CodigosDescuento = null;
  private stripe: stripe.Stripe;
  elements: stripe.StripeElements;
  card: stripe.StripeCardElement;
  code = '';
  actualizar = false;

  constructor(
    private stripeService: StripeService,
    public alertasService: AlertasService,
    public gestionReservacionesService: ReservacionesService,
    public emailService: EmailService,
    public reservacionesService: ReservacionesService,
    public router: Router,
    public usuariosService: UsuariosService,
    public codigosDescuentosService: CodigosDescuentosService,
    public confirmacionPagosService: ConfirmacionPagosService,
    public modalCtrl: ModalController,
    private translateService: TranslateService,
    public jugadoresService:JugadoresService
  ) {}

  async ngOnInit() {
    this.stripe = await stripe.loadStripe(this.stripeService.stripePublicKey);
    this.elements = this.stripe.elements();
    this.card = this.elements.create('card');
    let doc = document.getElementById('card-element');
    this.card.mount(doc);
    let pago =  await this.confirmacionPagosService.getConfirmacionPagoToPromise(this.nuevaReservacion.Cod_Reservacion);
    if(pago.length == 1){
       this.alertasService.message('FUTPLAY',this.translateService.instant('PAYMENT_FROM_THE_OTHER_TEAM_IS_REQUIRED'));
    }
  }

  async verificarUsuario(equipo:PerfilEquipos, verificarJugador?:boolean){
    let jugadores = await this.jugadoresService.syncJugadoresEquipos(equipo.equipo.Cod_Equipo);
    if(verificarJugador){
      let jugador = jugadores.find(jugador => jugador.jugador.Cod_Usuario == this.usuariosService.usuarioActual.Cod_Usuario);
      return jugador ? true : false;
    }
   let  capitan = jugadores[0].jugador.Cod_Usuario ==  this.usuariosService.usuarioActual.Cod_Usuario ? true : false;
   return capitan;
  }
  async onSubmit() {
    if (this.code) {
      this.codigosDescuentosService.getDescuentoToPromise(this.code).then(
        (resp) => {
          if (resp.length == 0) {
            this.alertasService.message(
              'FUTPLAY',
              this.translateService.instant('SOMETHING_WENT_WRONG')
            );
            return;
          }
          this.codigoDescuento = resp[0];
          this.enviarReto();
        },
        (error) => {
          this.alertasService.message(
            'FUTPLAY',
            this.translateService.instant('SOMETHING_WENT_WRONG')
          );
          return;
        }
      );
      return;
    }
    this.alertasService.presentaLoading(
      this.translateService.instant('LOADING')
    );

    let payment = await this.stripeService.createPaymentIntent(this.monto);
    const result = await this.stripe.confirmCardPayment(`${payment}`, {
      payment_method: {
        card: this.card,
        billing_details: {
          name: this.usuariosService.usuarioActual.Nombre,
          email: this.usuariosService.usuarioActual.Correo,
        },
      },
    });
    if (result.error) {
      this.alertasService.loadingDissmiss();
      this.alertasService.message(
        'FUTPLAY',
        this.translateService.instant('SOMETHING_WENT_WRONG')
      );
    } else {
      let id = result.paymentIntent.id;
      this.enviarReto(id);
    }
  }

 async  enviarReto(id?) {
    this.alertasService.presentaLoading(
      this.translateService.instant('SAVING_DATA')
    );
    if(this.nuevaReservacion.Cod_Tipo == 1){
   
      this.detalleReservacion.Notas_Estado = this.translateService.instant('INDIVIDUAL_RESERVATION');
     }else if (this.nuevaReservacion.Cod_Tipo == 2){

      this.detalleReservacion.Notas_Estado = this.translateService.instant('PENDING_CONFIRMATION');
     }else {
      this.detalleReservacion.Notas_Estado = this.translateService.instant('PENDING_CONFIRMATION');

      this.rival.equipo.Abreviacion;
    
     }
    if (this.nuevaReservacion.Cod_Tipo == 1) {

 

        this.nuevaReservacion.Fecha = format(
      new Date(this.nuevaReservacion.Fecha),
      'yyy-MM-dd'
    );

      this.nuevaReservacion.Titulo = this.translateService.instant(
        'INDIVIDUAL_RESERVATION'
      );


      this.nuevaReservacion.Hora_Inicio =
      format(new Date(this.nuevaReservacion.Hora_Inicio), 'yyy-MM-dd') +
      ' ' +
      new Date(this.nuevaReservacion.Hora_Inicio).toTimeString().split(' ')[0];
    this.nuevaReservacion.Hora_Fin =
      format(new Date(this.nuevaReservacion.Hora_Fin), 'yyy-MM-dd') +
      ' ' +
      new Date(this.nuevaReservacion.Hora_Fin).toTimeString().split(' ')[0];
      this.nuevaReservacion.Cod_Estado = 4;
      this.detalleReservacion.Cod_Estado = 4;
 
  
    this.detalleReservacion.Cod_Rival = this.retador.equipo.Cod_Equipo;
    this.detalleReservacion.Confirmacion_Rival = true;
   

    this.gestionReservacionesService
      .insertarReservacionToPromise(this.nuevaReservacion)
      .then(
        (resp: any) => {
        console.log(resp,'post')
          this.detalleReservacion.Cod_Reservacion =
            resp.reservacion.Cod_Reservacion;
          this.gestionReservacionesService
            .insertarDetalleReservacionToPromise(this.detalleReservacion)
            .then(
              (resp) => {
this.insertarPagosIndividuales(id)
               
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
        },
        (error) => {
          this.alertasService.loadingDissmiss();
          this.alertasService.message(
            'FUTPLAY',
            this.translateService.instant('SOMETHING_WENT_WRONG')
          );
        }
      );







    }else{


      this.insertarPagosGrupales(id);

    }

  }


  async insertarPagosGrupales(id?){
    let montoDescuento =
    this.codigoDescuento != null
      ? (this.monto * this.codigoDescuento.Porcentaje) / 100
      : 0;

  let confirmacionPagoRetador = {
    Id: null,
    Confirmacion_Pago: id ? id : null,
    Cod_Reservacion: this.detalleReservacion.Cod_Reservacion,
    Cod_Equipo: this.retador.equipo.Cod_Equipo,
    Codigo_Descuento:
      this.codigoDescuento != null
        ? this.codigoDescuento.Codigo_Descuento
        : null,
    Porcentaje_Descuento:
      this.codigoDescuento != null
        ? this.codigoDescuento.Porcentaje
        : 0,
    Monto_Descuento: montoDescuento,
    Monto: this.monto,
    Estado:
      montoDescuento > 0
        ? this.monto - montoDescuento == 0
          ? true
          : false
        : id
        ? true
        : false,
    Monto_Pago: this.monto - montoDescuento,
  };
  

  let confirmacionPagoRival = {
    Id: null,
    Confirmacion_Pago: id ? id : null,
    Cod_Reservacion: this.detalleReservacion.Cod_Reservacion,
    Cod_Equipo: this.rival.equipo.Cod_Equipo,
    Codigo_Descuento:
      this.codigoDescuento != null
        ? this.codigoDescuento.Codigo_Descuento
        : null,
    Porcentaje_Descuento:
      this.codigoDescuento != null
        ? this.codigoDescuento.Porcentaje
        : 0,
    Monto_Descuento: montoDescuento,
    Monto: this.monto,
    Estado:
      montoDescuento > 0
        ? this.monto - montoDescuento == 0
          ? true
          : false
        : id
        ? true
        : false,
    Monto_Pago: this.monto - montoDescuento,
  };


let pago =  await this.confirmacionPagosService.getConfirmacionPagoToPromise(this.nuevaReservacion.Cod_Reservacion);
 
  if(pago.length == 0 ){

    this.nuevaReservacion.Cod_Estado = 7;
    this.detalleReservacion.Cod_Estado = 7;
    await this.gestionReservacionesService.syncPutReservacione(this.nuevaReservacion);
    await this.gestionReservacionesService.syncPutDetalleReservaion(this.detalleReservacion);

    this.confirmacionPagosService
    .postVerificacionPagoToPromise(confirmacionPagoRival)
    .then(async (resp) => {
      this.alertasService.loadingDissmiss();
      this.modalCtrl.dismiss();
      await this.gestionReservacionesService.cargarReservaciones();
      this.alertasService.message(
        'FUTPLAY',
        this.translateService.instant(
          'CHALLENGE_ACCEPTED_SUCCESSFULLY'
        )
      );
    });
  }else if(pago.length == 1){
        this.nuevaReservacion.Cod_Estado = 4;
      this.detalleReservacion.Cod_Estado = 4;
      await this.gestionReservacionesService.syncPutReservacione(this.nuevaReservacion);
      await this.gestionReservacionesService.syncPutDetalleReservaion(this.detalleReservacion);
    this.confirmacionPagosService
      .postVerificacionPagoToPromise(confirmacionPagoRetador)
      .then(async (resp) => {
        this.alertasService.loadingDissmiss();
        await this.gestionReservacionesService.cargarReservaciones();
        this.modalCtrl.dismiss();
        this.alertasService.message(
          'FUTPLAY',
          this.translateService.instant(
            'CHALLENGE_COMPLETED_SUCCESSFULLY'
          )
        );
      });

  }
 
  }

  async insertarPagosIndividuales(id?){
    let montoDescuento =
    this.codigoDescuento != null
      ? (this.monto * this.codigoDescuento.Porcentaje) / 100
      : 0;

  let confirmacionPagoRival = {
    Id: null,
    Confirmacion_Pago: id ? id : null,
    Cod_Reservacion: this.detalleReservacion.Cod_Reservacion,
    Cod_Equipo: this.retador.equipo.Cod_Equipo,
    Codigo_Descuento:
      this.codigoDescuento != null
        ? this.codigoDescuento.Codigo_Descuento
        : null,
    Porcentaje_Descuento:
      this.codigoDescuento != null
        ? this.codigoDescuento.Porcentaje
        : 0,
    Monto_Descuento: montoDescuento,
    Monto: this.monto,
    Estado:
      montoDescuento > 0
        ? this.monto - montoDescuento == 0
          ? true
          : false
        : id
        ? true
        : false,
    Monto_Pago: this.monto - montoDescuento,
  };
  this.confirmacionPagosService
    .postVerificacionPagoToPromise(confirmacionPagoRival)
    .then(async (resp) => {
      if (!this.rival) {
        this.alertasService.loadingDissmiss();
        this.modalCtrl.dismiss();
        await this.gestionReservacionesService.cargarReservaciones();
        this.alertasService.message(
          'FUTPLAY',
          this.translateService.instant(
            'CHALLENGE_SENT_SUCCESSFULLY'
          )
        );
      }
    });
  }





}
