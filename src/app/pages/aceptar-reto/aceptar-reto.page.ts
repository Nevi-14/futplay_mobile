import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ModalController, ActionSheetController, AlertController } from '@ionic/angular';
import { CanchasService } from 'src/app/services/canchas.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { AlertasService } from 'src/app/services/alertas.service';
import { PerfilReservaciones } from '../../models/perfilReservaciones';
import { ReservacionesService } from 'src/app/services/reservaciones.service';
import { PartidoService } from '../../services/partido.service';
import { partidos } from '../../models/partidos';
import { ProvinciasService } from '../../services/provincias.service';
import { EmailService } from '../../services/email.service';
import { JugadoresService } from 'src/app/services/jugadores.service';
import { PerfilJugador } from '../../models/perfilJugador';
import { PerfilEquipos } from 'src/app/models/perfilEquipos';
import { EquiposService } from 'src/app/services/equipos.service';
import { CanchaDetallePage } from '../cancha-detalle/cancha-detalle.page';
import { EquipoDetalleModalPage } from '../equipo-detalle-modal/equipo-detalle-modal.page';

@Component({
  selector: 'app-aceptar-reto',
  templateUrl: './aceptar-reto.page.html',
  styleUrls: ['./aceptar-reto.page.scss'],
})
export class AceptarRetoPage implements OnInit {
  @Input() reto: PerfilReservaciones
  @Input() partido: partidos[]
  jugadoresPermitidosRetador: PerfilJugador[] = []
  jugadoresPermitidosRival: PerfilJugador[] = []
  rival: PerfilEquipos;
  isModalOpen: boolean = false;
  soccer = 'assets/icon/soccer.svg';
  img = 'assets/main/team-profile.svg';
  allowDelete = false;
  allowUser = false;
  indexRetador: number = null;
  indexRival: number = null;
  unirseAlReto: boolean = false;
  total: number = 0;
  constructor(
    public modalCtrl: ModalController,
    public canchasService: CanchasService,
    public actionCtrl: ActionSheetController,
    public usuariosService: UsuariosService,
    public provinciasService: ProvinciasService,



    public alertCtrl: AlertController,

    public alertasService: AlertasService,
    public reservacionesService: ReservacionesService,
    public partidosService: PartidoService,
    public emailService: EmailService,
    public jugadoresService: JugadoresService,
    public equiposService: EquiposService,
    public cd: ChangeDetectorRef

  ) { }



  async ngOnInit() {
    this.total = Number(((10 / 100) * this.reto.detalle.Monto_Total).toFixed(2));
    this.jugadoresPermitidosRetador = await this.jugadoresService.syncJugadoresEquipos(this.reto.retador.Cod_Equipo);
    this.jugadoresPermitidosRival = await this.jugadoresService.syncJugadoresEquipos(this.reto.rival.Cod_Equipo);
    this.indexRetador = this.jugadoresPermitidosRetador.findIndex(user => user.usuario.Cod_Usuario == this.usuariosService.usuarioActual.usuario.Cod_Usuario);
    this.indexRival = this.jugadoresPermitidosRival.findIndex(user => user.usuario.Cod_Usuario == this.usuariosService.usuarioActual.usuario.Cod_Usuario);

    if (this.indexRival >= 0) {
      this.allowUser = true;
    } else if (this.indexRetador >= 0) {
      // this.allowUser = true;  
    }




  }
  
  async canchaDetalle(){
     
    let cancha = await this.canchasService.syncGetPerfilCanchaToPromise(this.reto.cancha.Cod_Cancha)
    const modal = await this.modalCtrl.create({
      component:CanchaDetallePage,
      cssClass:'modal-view',
      id:'video-screen-modal',
      mode:'ios',
      backdropDismiss:false,
      componentProps:{
        reservar:false,
       cancha:cancha[0]
      }
    });

    return await modal.present();
  }
  async equipoRetadorDetalle(){
   
    let equipo = await this.equiposService.syncGetPerfilEquipoToPromise(this.reto.retador.Cod_Equipo)
    const modal = await this.modalCtrl.create({
      component:EquipoDetalleModalPage,
      mode:'md',
      backdropDismiss:false,
      componentProps:{
        reservar:false,
        equipo:equipo[0]
      }
    });

    return await modal.present();
  }
  async equipoRivalDetalle(){
   
    let equipo = await this.equiposService.syncGetPerfilEquipoToPromise(this.reto.rival.Cod_Equipo)
    const modal = await this.modalCtrl.create({
      component:EquipoDetalleModalPage,
      mode:'md',
      backdropDismiss:false,
      componentProps:{
        reservar:false,
        equipo:equipo[0]
      }
    });

    return await modal.present();
  }
  regresar() {
    this.modalCtrl.dismiss()
  }
  filledStars(stars: number) {
    return new Array(stars)
  }
  emptyStars(stars: number) {
    let value = 5 - stars;
    return new Array(value)
  }

  async alertaReservacion() {
    const alert = await this.alertCtrl.create({
      header: 'FUTPLAY',
      subHeader: 'Proceso De Reservación',
      message: '¿Desea aceptar esta reservación? Recuerda que las reservaciones se pueden cancelar unicamente 24 horas antes de ser confirmadas.',

      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Continuar',
          role: 'confirm',
          handler: async () => {
            this.aceptarReto();
          }
        }
      ]
    });

    await alert.present();
    const { role } = await alert.onDidDismiss();

  }

  async aceptarReto() {
    this.alertasService.presentaLoading('Gestionando cambios..')
    this.reto.detalle.Confirmacion_Rival = true;
    await this.reservacionesService.syncPutReservacione(this.reto.reservacion);
    this.reservacionesService.syncPutDetalleReservaion(this.reto.detalle).then(resp => {
      this.emailService.enviarCorreoReservaciones(2, this.reto.usuario_rival.Correo, this.reto.reservacion.Fecha, this.reto.reservacion.Hora_Inicio, this.reto.cancha.Nombre, this.reto.rival.Nombre, this.reto.retador.Nombre).then(resp => {
        this.emailService.enviarCorreoReservaciones(2, this.reto.usuario_retador.Correo, this.reto.reservacion.Fecha, this.reto.reservacion.Hora_Inicio, this.reto.cancha.Nombre, this.reto.rival.Nombre, this.reto.retador.Nombre).then(resp => {
          this.emailService.enviarCorreoReservaciones(2, this.reto.correo, this.reto.reservacion.Fecha, this.reto.reservacion.Hora_Inicio, this.reto.cancha.Nombre, this.reto.rival.Nombre, this.reto.retador.Nombre).then(resp => {
            this.alertasService.loadingDissmiss();
            this.alertasService.message('FUTPLAY', 'La reservación se confirmo con éxito ')
            this.modalCtrl.dismiss(true)
          }, error => {
            this.alertasService.loadingDissmiss();
            this.alertasService.message('FUTPLAY', 'Lo sentimos algo salio mal ')
          })
        }, error => {
          this.alertasService.loadingDissmiss();
          this.alertasService.message('FUTPLAY', 'Lo sentimos algo salio mal ')
        })

      }, error => {
        this.alertasService.loadingDissmiss();
        this.alertasService.message('FUTPLAY', 'Lo sentimos algo salio mal ')
      })
    }, error => {
      console.log('reto error', error)
    })

  }


}