import { Component, OnInit, Input } from '@angular/core';
import { ActionSheetButton, ModalController, ActionSheetController } from '@ionic/angular';
import { EquiposService } from 'src/app/services/equipos.service';
import { SolicitudesService } from 'src/app/services/solicitudes.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { BuscarEquiposPage } from '../buscar-equipos/buscar-equipos.page';
import { EquipoDetalleModalPage } from '../equipo-detalle-modal/equipo-detalle-modal.page';

@Component({
  selector: 'app-solicitudes-jugadores',
  templateUrl: './solicitudes-jugadores.page.html',
  styleUrls: ['./solicitudes-jugadores.page.scss'],
})
export class SolicitudesJugadoresPage implements OnInit {
  @Input() showReceiveInput;
  @Input()showSendInput;
title = 'Recibidas'
activeCategory = 1;
categories = ['Enviadas', 'Recibidas'];
showReceive = true;
showSend = false;
selected:string = '';
  constructor(
    public modalCtrl:ModalController,
    public solicitudesService:SolicitudesService,
    public equiposService: EquiposService,
    public usuariosService:UsuariosService,
    public actionSheetCtrl: ActionSheetController
  ) { }

  ngOnInit() {
   this.showReceive =  this.showReceiveInput;
   this.showSend = this.showSendInput;
    if(this.showReceive){
this.receive();
    }else{
this.send();
    }
  
  }

  selectCategory(index){
    this.activeCategory = index;
   
    switch(index){
   
     case 0:
       this.send();
     break;
     
     case 1:
      this.receive();
     break;

     break;
     
     case 3:
   
     break;
   
     default:
       
       break;
   }
   
   
       }
  async onOpenMenu(solicitud){

    let equipo  = null;

    this.equiposService.equipos = [];

this.equiposService.SyncEquipos(this.usuariosService.usuarioActual.Cod_Usuario).then(resp =>{
  this.equiposService.equipos  = resp;

 let i = this.equiposService.equipos.findIndex(equi => equi.Cod_Equipo == solicitud.Cod_Equipo);

 if(i >=0){
  equipo = this.equiposService.equipos[i];
 }

});

    const normalBtns : ActionSheetButton[] = [
      {   
         text: 'Detalle',
         icon:'eye-outline',
         handler: () =>{
           this.detalleEquipo(equipo)
          console.log(solicitud,'solicitud')
         
         }
        
        },
 {   
 //   text: canchaFavoritos ? 'Remover Favorito' : 'Favorito',
   // icon: canchaFavoritos ? 'heart' : 'heart-outline',
   text: 'Aceptar',
   icon:'checkmark-outline',
    handler: () =>{
     this.aceptar(solicitud)
    }
   
   },
 
         {   
          text: 'Eliminar',
          icon:'trash-outline',
          handler: () =>{
          this.rechazar(solicitud)
       
          }
         
         },

         {   
          text: 'Cancelar',
          icon:'close-outline',
         role:'cancel',
         
         }
      
        ]

  
    const actionSheet = await this.actionSheetCtrl.create({
      header:  'Opiones Solicitud'+' '+  solicitud.Nombre_Equipo,
      cssClass: 'left-align-buttons',
      buttons:normalBtns,
      mode:'ios'
    });
  
  
  
  
  
  await actionSheet.present();
  
  
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
    this.selected ='send';
    this.showReceive = false;
    this.showSend = true;
    this.title = 'Enviadas'
    this.solicitudesService.syncGetSolicitudesJugadores(this.usuariosService.usuarioActual.Cod_Usuario, true,false, true)
  }

  receive(){
    this.selected ='receive';
    this.showReceive = true;
    this.showSend = false;
    
    this.title = 'Recibidas'
    this.solicitudesService.syncGetSolicitudesJugadores(this.usuariosService.usuarioActual.Cod_Usuario, false,true, true)


  }
  cerrarModal(){

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
  this.solicitudesService.syncGetSolicitudesJugadores(this.usuariosService.usuarioActual.Cod_Usuario, true,false, true)

  
}
  }
  aceptar(solicitud){

    const solicitudActualizar = {
  
      Cod_Solicitud : solicitud.Cod_Solicitud,
      Cod_Usuario : solicitud.Cod_Usuario,
      Cod_Equipo :solicitud.Cod_Equipo,
      Confirmacion_Usuario:true,
      Confirmacion_Equipo:true,
      Fecha: solicitud.Fecha,
      Estado: true,
      Usuarios: null,
      Equipos: null
    
    };
  
    this.solicitudesService.actualizarSolicitud(solicitudActualizar,solicitud.Cod_Solicitud,solicitud.Cod_Usuario);

  
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
  
    this.solicitudesService.actualizarSolicitud(solicitudActualizar,solicitud.Cod_Solicitud,solicitud.Cod_Usuario);

  }


}
