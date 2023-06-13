import { Component, OnInit } from '@angular/core';
import {  ModalController, ActionSheetController } from '@ionic/angular';
import { PerfilReservaciones } from 'src/app/models/perfilReservaciones';
import { ReservacionesService } from 'src/app/services/reservaciones.service';
import { UsuariosService } from '../../services/usuarios.service';
import { CanchasService } from '../../services/canchas.service';
import { PartidoService } from 'src/app/services/partido.service';
import { partidos } from 'src/app/models/partidos';
import { InicioPartidoPage } from '../inicio-partido/inicio-partido.page';
import { Router } from '@angular/router';
import { CanchasPage } from '../canchas/canchas.page';
import { AceptarRetoAbiertoPage } from '../aceptar-reto-abierto/aceptar-reto-abierto.page';
 
@Component({
  selector: 'app-mis-reservaciones',
  templateUrl: './mis-reservaciones.page.html',
  styleUrls: ['./mis-reservaciones.page.scss'],
})
export class MisReservacionesPage implements OnInit {
  categories = ['Confirmados','Recibidos','Enviados','Historial','Revisión','Canceladas'];
textoBuscar = '';
partido:partidos[]=[]
retosAbiertos:PerfilReservaciones[]=[]
retosConfirmados:PerfilReservaciones[]=[]
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
async  ngOnInit() {
 // this.reservacionesService.s

//    this.reservacionesService.selectCategory();
this.reservacionesService.syncgGtReservacionesConfirmadas(this.usuariosService.usuarioActual.usuario.Cod_Usuario).then(reservaciones =>{
 
  if(reservaciones.length > 0){
    this.retosConfirmados = reservaciones;
  }
  this.reservacionesService.syncGetReservacionesAbiertasToPromise().then(reservaciones =>{
  
    if(reservaciones.length > 0){
      this.retosAbiertos = reservaciones;
    }
  })
})
  }

  gestionRetos(){
    this.router.navigateByUrl('/gestion-retos', {replaceUrl:true})
  }
 
  async detalleReto(reto:PerfilReservaciones) {
  await   this.partidosService.syncGetPartidoReservacion(reto.reservacion.Cod_Reservacion).then(partido =>{
    this.partido = partido;


    console.log('partido', partido)
    
    
            })





    const modal = await this.modalCtrl.create({
      component: AceptarRetoAbiertoPage,
      cssClass: 'my-custom-class',
      componentProps: {
        reto: reto,
        partido:this.partido
      },
      id:'aceptar-reto'
    });

     await modal.present();

    let {data} = await modal.onDidDismiss();
    this.reservacionesService.selectCategory();
  }
  cerrarModal (){

 this.modalCtrl.dismiss();
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

   this.reservacionesService.syncgGtReservacionesConfirmadas(this.usuariosService.usuarioActual.usuario.Cod_Usuario).then(reservaciones =>{
    this.retosConfirmados = reservaciones;
  
    this.reservacionesService.syncGetReservacionesAbiertasToPromise().then(reservaciones =>{
      this.retosAbiertos = reservaciones;
    })
  })

   
 }
 
 
inicio(){
  this.router.navigate(['/futplay/mi-perfil']);
}
                     async partidoActual(reto:PerfilReservaciones) {

                      let partido =   await  this.partidosService.syncGetPartidoReservacion(reto.reservacion.Cod_Reservacion);
    

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

                     
}
