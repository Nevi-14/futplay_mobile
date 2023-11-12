import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetButton, ActionSheetController, ModalController, Platform } from '@ionic/angular';
import { PerfilReservaciones } from 'src/app/models/perfilReservaciones';
import { AlertasService } from 'src/app/services/alertas.service';
import { ReservacionesService } from 'src/app/services/reservaciones.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { environment } from 'src/environments/environment';
import { AceptarRetoPage } from '../aceptar-reto/aceptar-reto.page';
import { PerfilCancha } from 'src/app/models/perfilCancha';
import { CanchasService } from 'src/app/services/canchas.service';
import { TranslateService } from '@ngx-translate/core';
import { GenerarReservacionPage } from '../generar-reservacion/generar-reservacion.page';
import { CanchaDetallePage } from '../cancha-detalle/cancha-detalle.page';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { HistorialRetosPage } from '../historial-retos/historial-retos.page';
@Component({
  selector: 'app-gestion-retos',
  templateUrl: './gestion-retos.page.html',
  styleUrls: ['./gestion-retos.page.scss'],
})
export class GestionRetosPage implements OnInit {
  reservaciones: PerfilReservaciones[] = [];
  url = environment.archivosURL;
  textoBuscar = '';
  canchas:PerfilCancha[] = [];
  constructor(
    public router: Router, 
    public reservacionesService:ReservacionesService, 
    public usuariosService:UsuariosService, 
    public alertasService:AlertasService,
    public modalCtrl:ModalController,
    public canchasService:CanchasService,
    public translateService:TranslateService,
    public actionSheetCtrl:ActionSheetController,
   
    
    ) {}
  
 async  ngOnInit() {
  if(!this.usuariosService.usuarioActual) return;
    this.reservaciones = await this.reservacionesService.syncgGtReservacionesConfirmadas(this.usuariosService.usuarioActual.Cod_Usuario);
    this.canchasService.syncListaCanchasToPromise().then(
      (resp) => {
        this.canchas = resp;
 
      },
      (error) => {
        this.alertasService.message(
          'FUTPLAY',
          this.translateService.instant('ALL_FIELDS_REQUIRED')
        );
      }
    );
  }

  regresar() {
    this.router.navigateByUrl('/futplay/reservaciones', { replaceUrl: true });
  }
  redirigir(ruta) {
    this.router.navigateByUrl(ruta, { replaceUrl: true });
  }
  ListaCanchas() {
    this.router.navigateByUrl('futplay/canchas', { replaceUrl: true });
  }
  onSearchChange($event){
    this.textoBuscar = $event.detail.value;
  }
  filtroUbicacion(){
    this.alertasService.message('FUTPLAY', 'Not Availabe yet')
  }

  async detalleReto(reto:PerfilReservaciones) {

  
    const modal = await this.modalCtrl.create({
      component: AceptarRetoPage,
      cssClass: 'my-custom-class',
      componentProps: {
        reto: reto
      },
    });

     await modal.present();

    let {data} = await modal.onDidDismiss();
     
  
}

async todaslasReservaciones() {
  const modal = await this.modalCtrl.create({
    component: HistorialRetosPage,
    cssClass: 'my-custom-class',
  });

   await modal.present();

  let {data} = await modal.onDidDismiss();
   

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
}
