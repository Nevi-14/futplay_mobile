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
 
@Component({
  selector: 'app-reservaciones',
  templateUrl: './reservaciones.page.html',
  styleUrls: ['./reservaciones.page.scss'],
})
export class ReservacionesPage {
categories = ['Confirmados','Recibidos','Enviados','Historial','Revisión','Canceladas'];
  constructor(
public reservacionesService:ReservacionesService,
public usuariosService:UsuariosService,
public modalCtrl: ModalController,
public canchasService:CanchasService,
public partidosService:PartidoService,
public actionSheetCtrl: ActionSheetController,
public router: Router
  ) {

     
  }
  ionViewWillEnter() {
this.reservacionesService.cargarReservaciones();
 
  }

  gestionRetos(){
    this.router.navigateByUrl('/gestion-retos', {replaceUrl:true})
  }
 

  iniciarPartido(reto:PerfilReservaciones){
    this.partidoActual(reto);
 
    
  }

 
  async partidoActual(reto:PerfilReservaciones) {

    let partido =   await  this.partidosService.syncGetPartidoReservacion(reto.reservacion.Cod_Reservacion);


    console.log(partido,'partido')
 if(!partido[0].Estado && !partido[1].Estado){
  partido[0].Verificacion_QR = true;
  partido[1].Verificacion_QR = true;
  partido[0].Estado = true;
  partido[1].Estado = true;
  await this.partidosService.syncPutPartidoCodigoQR(partido[0]);
await this.partidosService.syncPutPartidoCodigoQR(partido[1]);
 }
 
 
    const modal = await this.modalCtrl.create({
      component:InicioPartidoPage,
      cssClass: 'my-custom-class',
      componentProps:{
        reto:reto,
        partido:partido
      },
      id:'inicio-partido'
    });
  
    await modal.present();
    let {data} = await modal.onDidDismiss();


    this.reservacionesService.selectCategory();

    if(data != undefined){

      
     }
  }

  async detalleReto(reto:PerfilReservaciones) {
    const modal = await this.modalCtrl.create({
      component: AceptarRetoAbiertoPage,
      cssClass: 'my-custom-class',
      componentProps: {
        reto: reto
      }
    });

     await modal.present();

    let {data} = await modal.onDidDismiss();
    this.reservacionesService.selectCategory();
  }

  async nuevaReservacion(){
    const modal  = await this.modalCtrl.create({
      component: CanchasPage,
     cssClass: 'my-custom-class',
     mode:'ios',
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
