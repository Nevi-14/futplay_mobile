import { Component } from '@angular/core';
import {  ModalController, ActionSheetController } from '@ionic/angular';
import { PerfilReservaciones } from 'src/app/models/perfilReservaciones';
import { ReservacionesService } from 'src/app/services/reservaciones.service';
import { UsuariosService } from '../../services/usuarios.service';
import { CanchasService } from '../../services/canchas.service';
import { PartidoService } from 'src/app/services/partido.service';
import { Router } from '@angular/router';
import { AceptarRetoAbiertoPage } from '../aceptar-reto-abierto/aceptar-reto-abierto.page';
import { CanchasPage } from '../canchas/canchas.page';
import { InicioPartidoPage } from '../inicio-partido/inicio-partido.page';
import { environment } from 'src/environments/environment';
import { AlertasService } from 'src/app/services/alertas.service';
import { EquiposService } from 'src/app/services/equipos.service';
import { FinalizarReservacionPage } from '../finalizar-reservacion/finalizar-reservacion.page';
import { AceptarRetoPage } from '../aceptar-reto/aceptar-reto.page';
 
@Component({
  selector: 'app-reservaciones',
  templateUrl: './reservaciones.page.html',
  styleUrls: ['./reservaciones.page.scss'],
})
export class ReservacionesPage {
categories = ['Confirmados','Recibidos','Enviados','Historial','Revisión','Canceladas'];
url = environment.archivosURL;
isModalOpen: boolean = false;
  constructor(
public reservacionesService:ReservacionesService,
public usuariosService:UsuariosService,
public modalCtrl: ModalController,
public canchasService:CanchasService,
public partidosService:PartidoService,
public actionSheetCtrl: ActionSheetController,
public router: Router,
public alertasService:AlertasService,
public equiposService:EquiposService
  ) {

     
  }
  ionViewWillEnter() {
this.reservacionesService.cargarReservaciones();
 
  }

  gestionRetos(){
    this.router.navigateByUrl('/gestion-retos', {replaceUrl:true})
  }
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

    if (data != undefined) {
    }
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
  async detalleReto(reto: PerfilReservaciones) {
    if (reto.reservacion.Cod_Estado == 7) {
      return this.finalizarReservacion(reto);
    }if(reto.reservacion.Cod_Estado == 5 || reto.reservacion.Cod_Estado == 4){
      return this.partidoActual(reto);
    }
    const modal = await this.modalCtrl.create({
      component: AceptarRetoAbiertoPage,
      cssClass: 'my-custom-class',
      componentProps: {
        reto: reto
      },
      id:'aceptar-reto'
    });

     await modal.present();

    let {data} = await modal.onDidDismiss();
    this.reservacionesService.selectCategory();
  }

 
  async nuevaReservacion(){
    const modal  = await this.modalCtrl.create({
      component: CanchasPage,
     cssClass: 'my-custom-class',
     mode:'md',
     componentProps:{
      rival:null,
      retador:null,
      cancha:null
     }
   });
   await modal .present();
let {data} = await modal.onDidDismiss();
this.reservacionesService.cargarReservaciones();
   
 }
 
 
                
}
