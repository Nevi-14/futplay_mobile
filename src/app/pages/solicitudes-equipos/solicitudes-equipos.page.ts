import { Component, OnInit } from '@angular/core';
import { ActionSheetButton, ActionSheetController, ModalController } from '@ionic/angular';

import { UsuariosService } from 'src/app/services/usuarios.service';

import { VideoScreenPage } from '../video-screen/video-screen.page';
import { SolicitudesService } from '../../services/solicitudes.service';
import { EquiposService } from 'src/app/services/equipos.service';
import { PerfilJugadorPage } from '../perfil-jugador/perfil-jugador.page';
import { PerfilSolicitud } from '../../models/perfilSolicitud';

@Component({
  selector: 'app-solicitudes-equipos',
  templateUrl: './solicitudes-equipos.page.html',
  styleUrls: ['./solicitudes-equipos.page.scss'],
})
export class SolicitudesEquiposPage implements OnInit {
  stadiumProfile =  'assets/main/game-match.svg';
  public tipos : string[]=['recibidos','enviados'];
  public selectedType: string = this.tipos[0];
  title = 'recibidas'
  showReceive = true;
  showSend = false;
  constructor(
    public modalCtrl:ModalController,
    public actionSheetCtrl: ActionSheetController,
    public usuariosService: UsuariosService,
    public solicitudesService:SolicitudesService,
    public equiposService:EquiposService

  ) { }

  ngOnInit() {
 this.receive();
  }

  receive(){
    this.solicitudesService.syncGetSolicitudesRecibidasEquipoToPromise(this.equiposService.equipo.equipo.Cod_Equipo).then(solicitudes =>{

      this.solicitudesService.solicitudesEquiposArray = solicitudes;
    })


  }

  send(){

    this.solicitudesService.syncGetSolicitudesEnviadasEquipoToPromise(this.equiposService.equipo.equipo.Cod_Equipo).then(solicitudes =>{

      this.solicitudesService.solicitudesEquiposArray = solicitudes;
    })

  }

  async perfilJugador(jugador) {
    const modal = await this.modalCtrl.create({
      component:PerfilJugadorPage,
      cssClass: 'my-custom-class',
      componentProps:{
        perfil: jugador
      }
    });
    return await modal.present();
  }

  async onOpenMenu(solicitud:PerfilSolicitud){

if(this.usuariosService.usuarios.length == 0){
  
 // this.usuariosService.syncUsusarios(this.usuariosService.usuarioActual.Cod_Usuario);

}

    const normalBtns : ActionSheetButton[] = [
      {   
         text: 'Detalle',
         icon:'eye-outline',
         handler: () =>{
let usuario = null;
usuario = solicitud.usuario;
this.perfilJugador(usuario);
          console.log(solicitud,'solicitud')
         
         }
        
        },
 {   
 //   text: canchaFavoritos ? 'Remover Favorito' : 'Favorito',
   // icon: canchaFavoritos ? 'heart' : 'heart-outline',
   text: 'Aceptar',
   icon:'checkmark-outline',
    handler: () =>{
      this.videoScreen(4);
   //  this.aceptar(solicitud)
    }
   
   },
 
         {   
          text: 'Eliminar',
          icon:'trash-outline',
          handler: () =>{
         // this.rechazar(solicitud)
       
          }
         
         },

         {   
          text: 'Cancelar',
          icon:'close-outline',
         role:'cancel',
         
         }
      
        ]

  
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opiones Solicitud'+' '+  solicitud.usuario.Nombre +' ' + solicitud.usuario.Primer_Apellido,
      cssClass: 'left-align-buttons',
      buttons:normalBtns,
      mode:'ios'
    });
  
  
  
  
  
  await actionSheet.present();
  
  
    }

    async videoScreen(id){
      const modal = await this.modalCtrl.create({
        component:VideoScreenPage,
        cssClass:'modal-view',
        mode:'ios',
        backdropDismiss:false,
        id:'video-screen-modal',
        componentProps:{
          index:id
        }
      });
      return await modal.present();
      
        }

        cerrarModal(){

          this.modalCtrl.dismiss()
        }

}
