import { Component, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import { IonContent, ModalController } from '@ionic/angular';
import { PerfilEquipos } from 'src/app/models/perfilEquipos';
import { AlertasService } from 'src/app/services/alertas.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { EquiposService } from '../../services/equipos.service';
import { FiltroUbicacionPage } from '../filtro-ubicacion/filtro-ubicacion.page';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-lista-equipos',
  templateUrl: './lista-equipos.page.html',
  styleUrls: ['./lista-equipos.page.scss'],
})
export class ListaEquiposPage {
  @Input() club: PerfilEquipos;
  @Input() rival: boolean;

  filtro = {
    Codigo_Pais: null,
    Codigo_Estado: null,
    Codigo_Ciudad: null,
  };
  textoBuscar = '';
  url = environment.archivosURL;
  @ViewChild(IonContent, { static: false }) content: IonContent;
  constructor(
    public modalCtrl: ModalController,
    public equiposService: EquiposService,
    public usuariosService: UsuariosService,
    public alertasService: AlertasService,
    private cd: ChangeDetectorRef,
    private translateService: TranslateService
  ) {}

  ionViewWillEnter() {
    if (this.rival) {
      this.alertasService.presentaLoading(
        this.translateService.instant('LOADING')
      );
      this.equiposService
        .syncListaEquiposToPromise(
          this.usuariosService.usuarioActual.Cod_Usuario
        )
        .then(
          (resp) => {
            this.equiposService.equipos = resp.slice(0);
            this.alertasService.loadingDissmiss();
            this.cd.markForCheck();
            this.cd.detectChanges();
          },
          (error) => {
            this.alertasService.loadingDissmiss();
            this.alertasService.message(
              'FUTPLAY',
              this.translateService.instant('SOMETHING_WENT_WRONG')
            );
          }
        );
    } else {
      this.alertasService.presentaLoading(
        this.translateService.instant('LOADING')
      );
      this.equiposService
        .syncMisEquiposToPromise(this.usuariosService.usuarioActual.Cod_Usuario)
        .then(
          (resp) => {
            this.equiposService.equipos = resp.slice(0);
            this.alertasService.loadingDissmiss();
            this.cd.markForCheck();
            this.cd.detectChanges();
            this.cd.markForCheck();
            this.cd.detectChanges();
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
  }
  detalleEquipo(equipo) {
    //this.equiposService.detalleEquipo(equipo)
  }
  onSearchChange(event) {
    this.textoBuscar = event.detail.value;
  }

  ScrollToTop() {
    this.content.scrollToTop(1500);
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
        Codigo_Pais: this.filtro.Codigo_Pais,
        Codigo_Estado: this.filtro.Codigo_Estado,
        Codigo_Ciudad: this.filtro.Codigo_Ciudad,
      },

      id: 'my-modal-id',
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data !== undefined) {
      this.filtro.Codigo_Pais = data.Codigo_Pais;
      this.filtro.Codigo_Estado = data.Codigo_Estado;
      this.filtro.Codigo_Ciudad = data.Codigo_Ciudad;
    }
  }

  retornarEquipo(equipo: PerfilEquipos) {
    this.modalCtrl.dismiss({
      equipo: equipo,
    });
  }
  filledStars(stars: number) {
    return new Array(stars);
  }
  emptyStars(stars: number) {
    let value = 5 - stars;
    return new Array(value);
  }
}
