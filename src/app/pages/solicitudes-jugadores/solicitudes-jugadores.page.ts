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
segment = 0 ;
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
  aceptar(solicitud){
 
    const solicitudActualizar:Solicitudes = {
  
      Cod_Solicitud : solicitud.Cod_Solicitud,
      Cod_Usuario : solicitud.Cod_Usuario,
      Cod_Equipo :solicitud.Cod_Equipo,
      Confirmacion_Usuario:true,
      Confirmacion_Equipo:true,
      Estado:true,

    
    };
  
    this.solicitudesService.syncPutSolicitudToProimise(solicitudActualizar).then(resp =>{
      this.solicitudesService.syncPutSolicitudToProimise(solicitudActualizar).then(resp =>{
        this.solicitudesService.syncGetSolicitudesRecibidasUsuarioToPromise(this.usuariosService.usuarioActual.Cod_Usuario).then(resp=>{
          this.solicitudesService.solicitudesJugadoresArray = resp;
        })
      
     this.alertasService.message('FUTPLAY', this.translateService.instant('REQUEST_ACCEPTED'))
      }, error =>{
  
        this.alertasService.message('FUTPLAY', this.translateService.instant('SOMETHING_WENT_WRONG'))
      })
       
  
    }, error =>{

 
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
  async onOpenMenu(solicitud){

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
  
  rechazar(solicitud){
  
    
    const solicitudActualizar = {
  
      Cod_Solicitud : solicitud.Cod_Solicitud,
      Cod_Usuario : solicitud.Cod_Usuario,
      Cod_Equipo :solicitud.Cod_Equipo,
      Confirmacion_Usuario:false,
      Confirmacion_Equipo:true,
      Fecha: solicitud.Fecha,
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
      
      this.solicitudesService.syncGetSolicitudesEnviadasUsuarioToPromise(this.usuariosService.usuarioActual.Cod_Usuario).then(resp=>{
        this.solicitudesService.solicitudesJugadoresArray = resp;
      })
   

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