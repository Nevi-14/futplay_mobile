import { Component } from '@angular/core';
import { PerfilCancha } from 'src/app/models/perfilCancha';

import { CanchasService } from '../../services/canchas.service';
import {
  ActionSheetButton,
  ActionSheetController,
  InfiniteScrollCustomEvent,
  ModalController,
} from '@ionic/angular';
import { Router } from '@angular/router';
import { CanchaDetallePage } from '../cancha-detalle/cancha-detalle.page';
import { GenerarReservacionPage } from '../generar-reservacion/generar-reservacion.page';
import { FiltroCanchaPage } from '../filtro-cancha/filtro-cancha.page';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { AlertasService } from 'src/app/services/alertas.service';

@Component({
  selector: 'app-canchas',
  templateUrl: './canchas.page.html',
  styleUrls: ['./canchas.page.scss'],
})
export class CanchasPage {
  filtro = {
    Codigo_Pais: null,
    Codigo_Estado: null,
    Codigo_Ciudad: null,
    Cod_Categoria: null,
  };
  textoBuscar = '';
  url = environment.archivosURL;
  items:PerfilCancha[] = [];
  constructor(
    public canchasService: CanchasService,
    public actionSheetCtrl: ActionSheetController,
    public router: Router,
    public modalCtrl: ModalController,
    private translateService: TranslateService,
    public alertasService: AlertasService
  ) {}

  ionViewWillEnter() {
    this.canchasService.syncListaCanchasToPromise().then(
      (resp) => {
        this.canchasService.canchas = resp;
        this.canchasService.dia = this.diaSemana(new Date().getDay());
        this.generateItems();
      },
      (error) => {
        this.alertasService.message(
          'FUTPLAY',
          this.translateService.instant('ALL_FIELDS_REQUIRED')
        );
      }
    );
  }
  onSearchChange(event) {
    this.textoBuscar = event.detail.value;
  
    let index = this.items.filter(x => x.nombre.startsWith(this.textoBuscar));

    if (index.length === 0) {
      let equiposIndex =  this.canchasService.canchas.filter(x => x.nombre.startsWith(this.textoBuscar));
 
  
      if(equiposIndex.length > 0){
        equiposIndex.forEach(element => {
          let index = this.items.findIndex(x => x.cancha.Cod_Cancha === element.cancha.Cod_Cancha );
          if(index === -1){
            this.items.push(element);
          }
        });
      }
    }
  }

  private generateItems() {
    let  count = this.items.length ;
          count =  this.canchasService.canchas.length - count > 50 ? count + 50 :  this.canchasService.canchas.length; 
    for (let i = 0; i < count; i++) {
     let index =  this.items.findIndex(x => x.cancha.Cod_Cancha  ===  this.canchasService.canchas[i].cancha.Cod_Cancha );
      if(index === -1){
        this.items.push(this.canchasService.canchas[i]);
      }
    }
  }
  

  onIonInfinite(ev) {
    this.generateItems();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
  diaSemana(index) {
    return this.canchasService.diaSemana(index);
  }
  disponibilidadCancha(cancha: PerfilCancha) {
    return this.canchasService.disponibilidadCancha(cancha);
  }
  regresar() {
    this.router.navigate(['/futplay/gestion-retos']);
  }
  horarioCancha(cancha: PerfilCancha) {
    return this.canchasService.horarioCancha(cancha);
  }

  async onOpenMenu(cancha: PerfilCancha) {
    const normalBtns: ActionSheetButton[] = [
      {
        text: this.translateService.instant('VIEW_COURT'),
        icon: 'eye-outline',
        handler: () => {
          this.canchaDetalle(cancha);
        },
      },
      {
        text: this.translateService.instant('RESERVE_COURT'),
        icon: 'calendar-outline',
        handler: () => {
          this.canchaReservacion(cancha);
        },
      },
      {
        text: this.translateService.instant('CANCEL'),
        icon: 'close-outline',
        role: 'cancel',
      },
    ];

    const actionSheet = await this.actionSheetCtrl.create({
      header: this.translateService.instant('OPTIONS'),
      cssClass: 'left-align-buttons',
      buttons: normalBtns,
      mode: 'ios',
    });

    await actionSheet.present();
  }
  async canchaReservacion(cancha) {
    const modal = await this.modalCtrl.create({
      component: GenerarReservacionPage,
      cssClass: 'my-custom-class',
      mode: 'md',
      componentProps: {
        rival: null,
        retador: null,
        cancha: cancha,
      },
    });
    await modal.present();
  }

  async canchaDetalle(cancha: PerfilCancha) {
    const modal = await this.modalCtrl.create({
      component: CanchaDetallePage,
      cssClass: 'my-custom-class',
      mode: 'md',
      componentProps: {
        cancha: cancha,
      },
    });

    await modal.present();
  }

  async reservarCancha(cancha) {
    this.canchasService.cancha = cancha;
    this.router.navigate(['/reservar-cancha']);
  }

  async filtroUbicacion() {
    const modal = await this.modalCtrl.create({
      component: FiltroCanchaPage,
      cssClass: 'my-custom-class',
      breakpoints: [0, 0.3, 0.5, 0.8],
      initialBreakpoint: 0.5,
      id: 'my-modal-id',
      componentProps: {
        Codigo_Pais: this.filtro.Codigo_Pais,
        Codigo_Estado: this.filtro.Codigo_Estado,
        Codigo_Ciudad: this.filtro.Codigo_Ciudad,
        Cod_Categoria: this.filtro.Cod_Categoria,
      },
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data !== undefined) {
      this.filtro.Codigo_Pais = data.Codigo_Pais;
      this.filtro.Codigo_Estado = data.Codigo_Estado;
      this.filtro.Codigo_Ciudad = data.Codigo_Ciudad;
      this.filtro.Cod_Categoria = data.Cod_Categoria;
    }
  }

  
}
