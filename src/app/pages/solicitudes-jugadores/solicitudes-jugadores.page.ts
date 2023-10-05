import { Component, OnInit, Input } from '@angular/core';
import { ActionSheetButton, ModalController, ActionSheetController } from '@ionic/angular';
import { EquiposService } from 'src/app/services/equipos.service';
import { SolicitudesService } from 'src/app/services/solicitudes.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { BuscarEquiposPage } from '../buscar-equipos/buscar-equipos.page';
import { EquipoDetalleModalPage } from '../equipo-detalle-modal/equipo-detalle-modal.page';
import { Solicitudes } from '../../models/solicitudes';
import { AlertasService } from '../../services/alertas.service';
import { Router } from '@angular/router';
import { PerfilEquipos } from 'src/app/models/perfilEquipos';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { PerfilCancha } from '../../models/perfilCancha';
import { PerfilSolicitud } from 'src/app/models/perfilSolicitud';

@Component({
  selector: 'app-solicitudes-jugadores',
  templateUrl: './solicitudes-jugadores.page.html',
  styleUrls: ['./solicitudes-jugadores.page.scss'],
})
export class SolicitudesJugadoresPage implements OnInit {
  @Input() showReceiveInput;
  @Input()showSendInput;
  url = environment.archivosURL;
title = 'Recibidas'
activeCategory = 0;
segment = 'received' ;
categories = [ 'recibidas','enviadas'];
showReceive = true;
showSend = false;
selected:string = '';
solicitudes = [];
 
  constructor(
    public modalCtrl:ModalController,
    public equiposService: EquiposService,
    public usuariosService:UsuariosService,
    public actionSheetCtrl: ActionSheetController,
    public solicitudesService:SolicitudesService,
    public alertasService: AlertasService,
    public router:Router,
    private translateService: TranslateService
  ) { }

  ngOnInit() {
   this.showReceive =  true
   this.showSend = false
   this.activeCategory = 0


   this.receive();

 
  
  }

  segmentChanged($event){
this.segment = $event.detail.value;
let value = $event.detail.value;
switch(value){
    case 'received':
      this.receive();
    break;
    case 'sent':
      this.send();
      break;
}
  }
 

    async detalleEquipo(equipo){

  
     
      const modal  = await this.modalCtrl.create({
       component: EquipoDetalleModalPage,
       cssClass:'my-custom-modal',
       componentProps:{
        equipo:equipo
  
       }
     });
     await modal .present();
   }
   radioGroupChange(event) {
  let value =  event.detail.value;

  if(value=='send'){
this.send()
  }else{
this.receive();
  }
    }

  send(){
   this.solicitudesService.syncGetSolicitudesEnviadasUsuarioToPromise(this.usuariosService.usuarioActual.Cod_Usuario).then(solicitudes =>{
  this.solicitudes= solicitudes;
  
 
  })
  }

  receive(){
 this.solicitudesService.syncGetSolicitudesRecibidasUsuarioToPromise(this.usuariosService.usuarioActual.Cod_Usuario).then(solicitudes =>{
  
 this.solicitudesService.solicitudesJugadoresArray = solicitudes;
  this.solicitudes= solicitudes;
    })
  }
  regresar(){
this.modalCtrl.dismiss();
  }
  async buscarJugadores(){

    const modal = await this.modalCtrl.create({
      component:BuscarEquiposPage,
      cssClass:'my-cutom-class'
    });

     await modal.present();

     const { data } = await modal.onWillDismiss();
if(data != undefined){
 
}
  }
  aceptar(solicitud: PerfilSolicitud){
 
    const solicitudActualizar:Solicitudes = {
  
      Cod_Solicitud : solicitud.solicitud.Cod_Solicitud,
      Cod_Usuario : solicitud.solicitud.Cod_Usuario,
      Cod_Equipo :solicitud.solicitud.Cod_Equipo,
      Confirmacion_Usuario:true,
      Confirmacion_Equipo:true,
      Estado:true,

    
    };
    this.alertasService.presentaLoading(this.translateService.instant('LOADING'));
    this.solicitudesService.syncPutSolicitudToProimise(solicitudActualizar).then(resp =>{
      if(this.segment=='send'){
        this.send()
          }else{
        this.receive();
          }
    this.alertasService.loadingDissmiss();
   this.alertasService.message('FUTPLAY', this.translateService.instant('REQUEST_ACCEPTED'))
    }, error =>{
      this.alertasService.loadingDissmiss();
      this.alertasService.message('FUTPLAY', this.translateService.instant('SOMETHING_WENT_WRONG'))
    })
     

  
  }

  async equipoDetalle(perfilEquipo:PerfilEquipos){
     
    let equipo = await this.equiposService.syncGetPerfilEquipoToPromise(perfilEquipo.equipo.Cod_Equipo)
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

  async onOpenMenu(solicitud: PerfilSolicitud ) {
 
    if (this.segment == 'received') {
      const normalBtns: ActionSheetButton[] = [ {  
       
     
        //   text: canchaFavoritos ? 'Remover Favorito' : 'Favorito',
          // icon: canchaFavoritos ? 'heart' : 'heart-outline',
          text: this.translateService.instant('VIEW_PROFILE'),
          icon:'eye-outline',
           handler: () =>{
            this.equiposService.syncGetPerfilEquipoToPromise(solicitud.equipo.Cod_Equipo).then(resp=>{
              this.equipoDetalle(resp[0])
            })
    
           }
          
          },
          {   
            text: this.translateService.instant('ACCEPT_REQUEST'),  
            icon:'checkmark-outline',
            handler: () =>{
           this.aceptar(solicitud)
         
            }
           
           },
      
              {   
               text: this.translateService.instant('CANCEL_REQUEST'),
               icon:'trash-outline',
               handler: () =>{
              this.rechazar(solicitud)
            
               }
              
              },
     
              {   
               text: this.translateService.instant('CANCEL'),
               icon:'close-outline',
              role:'cancel',
              
              }
           
      ];

      const actionSheet = await this.actionSheetCtrl.create({
        header: this.translateService.instant('OPTIONS'),
        cssClass: 'left-align-buttons',
        buttons: normalBtns,
        mode: 'ios',
      });

      await actionSheet.present();
    } else {
      const normalBtns: ActionSheetButton[] = [
        {
          text: this.translateService.instant('VIEW_PROFILE'),
          icon: 'eye-outline',
          handler: () => {
 
            this.equiposService.syncGetPerfilEquipoToPromise(solicitud.equipo.Cod_Equipo).then(resp=>{
              this.equipoDetalle(resp[0])
            })
          },
        },

        {
          text: this.translateService.instant('DELETE'),
          icon: 'trash-outline',
          handler: () => {
            this.rechazar(solicitud);
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




  async onOpenMen2(solicitud){

    let equipo  = null;
  
    this.equiposService.equipos = [];
    const normalBtns : ActionSheetButton[] = [
      {  
       
     
        //   text: canchaFavoritos ? 'Remover Favorito' : 'Favorito',
          // icon: canchaFavoritos ? 'heart' : 'heart-outline',
          text: this.translateService.instant('VIEW_PROFILE'),
          icon:'eye-outline',
           handler: () =>{
       this.equipoDetalle(solicitud)
           }
          
          },
 
      
              {   
               text: this.translateService.instant('CANCEL_REQUEST'),
               icon:'trash-outline',
               handler: () =>{
              this.rechazar(solicitud)
            
               }
              
              },
     
              {   
               text: this.translateService.instant('CANCEL'),
               icon:'close-outline',
              role:'cancel',
              
              }
           
             ]
     
       
         const actionSheet = await this.actionSheetCtrl.create({
           header: this.translateService.instant('OPTIONS'),
           cssClass: 'left-align-buttons',
           buttons:normalBtns,
           mode:'ios'
         });
         await actionSheet.present();
  
    

  
        }
  
  rechazar(solicitud: PerfilSolicitud){
  
    
    const solicitudActualizar = {
  
      Cod_Solicitud : solicitud.solicitud.Cod_Solicitud,
      Cod_Usuario : solicitud.solicitud.Cod_Usuario,
      Cod_Equipo :solicitud.solicitud.Cod_Equipo,
      Confirmacion_Usuario:false,
      Confirmacion_Equipo:true,
      Estado: false,
      Usuarios: null,
      Equipos: null
    
    };
  
    this.solicitudesService.syncPutSolicitudToProimise(solicitudActualizar).then(resp =>{

      this.alertasService.message('FUTPLAY',this.translateService.instant('REQUEST_REJECTED'))
    }, error =>{
    
        this.alertasService.message('FUTPLAY', this.translateService.instant('SOMETHING_WENT_WRONG'))
    })

    this.solicitudesService.syncPutSolicitudToProimise(solicitudActualizar).then(resp =>{
      
      if(this.segment=='send'){
        this.send()
          }else{
        this.receive();
          }
   

    }, error =>{

      this.alertasService.message('FUTPLAY', this.translateService.instant('SOMETHING_WENT_WRONG'))
    })
  

  }
  filledStars(stars:number){

    return new Array(stars)
  }
  emptyStars(stars:number){
    let value = 5 - stars;
    return new Array(value)
  }

}