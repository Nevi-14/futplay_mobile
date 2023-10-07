import { Component } from '@angular/core';
import { EquiposService } from '../../services/equipos.service';
import { UsuariosService } from '../../services/usuarios.service';
import { ModalController, ActionSheetController, ActionSheetButton, InfiniteScrollCustomEvent } from '@ionic/angular';
import { Solicitudes } from 'src/app/models/solicitudes';
import { SolicitudesService } from '../../services/solicitudes.service';
import { AlertasService } from '../../services/alertas.service';
import { JugadoresService } from '../../services/jugadores.service';
import { FiltroUbicacionPage } from '../filtro-ubicacion/filtro-ubicacion.page';
import { EquipoDetalleModalPage } from '../equipo-detalle-modal/equipo-detalle-modal.page';
import { PerfilEquipos } from 'src/app/models/perfilEquipos';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-buscar-equipos',
  templateUrl: './buscar-equipos.page.html',
  styleUrls: ['./buscar-equipos.page.scss'],
})
export class BuscarEquiposPage {
  items = [];
  textoBuscar = '';
  url = environment.archivosURL;
  solicitud: Solicitudes = {
    Cod_Solicitud: null,
    Cod_Usuario: this.usuariosService.usuarioActual.Cod_Usuario,
    Cod_Equipo: null,
    Confirmacion_Usuario: true,
    Confirmacion_Equipo: false,
    Estado: true
  };
  
  filtro = {
    Cod_Provincia: null,
    Cod_Canton: null,
    Cod_Distrito: null,
  };

  constructor(
    public equiposService: EquiposService,
    public usuariosService: UsuariosService,
    public modalCtrl: ModalController,
    public actionSheetCtrl: ActionSheetController,
    public solicitudesService: SolicitudesService,
    public alertasService: AlertasService,
    public jugadoresService: JugadoresService,
    private translateService: TranslateService
  ) {}

  ionViewWillEnter() {
    this.alertasService.presentaLoading(this.translateService.instant('LOADING_DATA'));
    this.equiposService.syncListaEquiposToPromise(this.usuariosService.usuarioActual.Cod_Usuario).then(resp =>{
      this.equiposService.equipos = resp;
      this.generateItems();
      this.alertasService.loadingDissmiss();
    }, error =>{
      this.alertasService.loadingDissmiss();
      this.alertasService.message('FUTPLAY', this.translateService.instant('SOMETHING_WENT_WRONG'));
    });
  }

  regresar() {
    this.modalCtrl.dismiss();
  }

  async filtroUbicacion() {
    const modal = await this.modalCtrl.create({
      component: FiltroUbicacionPage,
      cssClass: 'my-custom-class',
      breakpoints: [0, 0.3, 0.5, 0.8],
      initialBreakpoint: 0.5,
      componentProps: {
        'Cod_Provincia': this.filtro.Cod_Provincia,
        'Cod_Canton': this.filtro.Cod_Canton,
        'Cod_Distrito': this.filtro.Cod_Distrito
      },
      id: 'my-modal-id'
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    console.log(data);

    if (data !== undefined) {
      this.filtro.Cod_Provincia = data.Cod_Provincia;
      this.filtro.Cod_Canton = data.Cod_Canton;
      this.filtro.Cod_Distrito = data.Cod_Distrito;
    }
  }

  onSearchChange(event) {
    this.textoBuscar = event.detail.value;
  }

  private generateItems() {
    const count = this.equiposService.equipos.length + 1;
    for (let i = 0; i < 50; i++) {
      this.items.push(this.equiposService.equipos[i]);
    }
  }

  onIonInfinite(ev) {
    this.generateItems();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  EquipoSolicitud(equipo) {
    this.jugadoresService.syncGetJugador(this.usuariosService.usuarioActual.Cod_Usuario, equipo.equipo.Cod_Equipo).then(resp => {
      if (resp.length > 0) {
        return this.alertasService.message('FUTPLAY', this.translateService.instant('ALREADY_MEMBER_OR_REQUEST_IS_PENDING'));
      }
      this.solicitud.Cod_Equipo = equipo.equipo.Cod_Equipo;
      this.solicitudesService.generarSolicitud(this.solicitud).then(resp => {
        this.alertasService.message('FUTPLAY', this.translateService.instant('REQUEST_SENT_SUCCESSFULLY'));
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

  async onOpenMenu(equipo) {
    console.log(equipo);
    const normalBtns: ActionSheetButton[] = [
      {   
        text: this.translateService.instant('VIEW_PROFILE'),
        icon: 'eye-outline',
        handler: () => {
          this.equipoDetalle(equipo);
        }
      },
      {   
        text: this.translateService.instant('SEND_REQUEST'),
        icon: 'paper-plane-outline',
        handler: () => {
          this.EquipoSolicitud(equipo);
        }
      },
      {   
        text: this.translateService.instant('CANCEL'),
        icon: 'close-outline',
        role: 'cancel'
      }
    ];

    const actionSheet = await this.actionSheetCtrl.create({
      header: this.translateService.instant('OPTIONS'),
      cssClass: 'left-align-buttons',
      buttons: normalBtns,
      mode: 'ios'
    });

    await actionSheet.present();
  }

  async equipoDetalle(perfilEquipo: PerfilEquipos) {
    let equipo = await this.equiposService.syncGetPerfilEquipoToPromise(perfilEquipo.equipo.Cod_Equipo);
    const modal = await this.modalCtrl.create({
      component: EquipoDetalleModalPage,
      cssClass: 'modal-view',
      id: 'video-screen-modal',
      mode: 'md',
      backdropDismiss: false,
      componentProps: {
        reservar: false,
        equipo: equipo[0]
      }
    });

    return await modal.present();
  }
}