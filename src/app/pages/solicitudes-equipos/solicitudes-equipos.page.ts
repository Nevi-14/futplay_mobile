import { Component, OnInit } from '@angular/core';
import { ActionSheetButton, ActionSheetController, ModalController } from '@ionic/angular';
import { EquiposService } from 'src/app/services/equipos.service';
import { SolicitudesService } from 'src/app/services/solicitudes.service';
import { BuscarJugadoresPage } from '../buscar-jugadores/buscar-jugadores.page';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { PerfilJugadorPage } from '../perfil-jugador/perfil-jugador.page';
import { GoogleAdsService } from 'src/app/services/google-ads.service';
import { VideoScreenPage } from '../video-screen/video-screen.page';

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
    public solicitudesService:SolicitudesService,
    public equiposService: EquiposService,
    public actionSheetCtrl: ActionSheetController,
    public usuariosService: UsuariosService,
    public googleAdsService: GoogleAdsService
  ) { }

  ngOnInit() {
  
    this.solicitudesService.syncGetSolicitudesEquipos(this.equiposService.perfilEquipo.Cod_Equipo, true,false, true)

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

  async onOpenMenu(solicitud){

if(this.usuariosService.usuarios.length == 0){
  
  this.usuariosService.syncUsusarios(this.usuariosService.usuarioActual.Cod_Usuario);

}

    const normalBtns : ActionSheetButton[] = [
      {   
         text: 'Detalle',
         icon:'eye-outline',
         handler: () =>{
let usuario = null;
           let i = this.usuariosService.usuarios.findIndex(usu => usu.Cod_Usuario == solicitud.Cod_Usuario)

           if(i >=0){
            usuario = this.usuariosService.usuarios[i];
            this.perfilJugador(usuario);

           }
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
      header: 'Opiones Solicitud'+' '+  solicitud.Nombre_Jugador +' ' + solicitud.Primer_Apellido,
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
  send(){
    this.showSend = true;
    this.showReceive = false;

    this.title = 'enviadas'
    this.solicitudesService.syncGetSolicitudesEquipos(this.equiposService.perfilEquipo.Cod_Equipo, false,true, true)
  }

  receive(){
    this.showReceive = true;
    this.showSend = false;
    this.title = 'recibidas'
    this.solicitudesService.syncGetSolicitudesEquipos(this.equiposService.perfilEquipo.Cod_Equipo, true,false, true)


  }
  
  segmentChanged(event:any){
    console.log(event)
    

    this.selectedType = event.detail.value;
    console.log(event.detail.value)
  
        //    SOLICITUDES ENVIADAS
   // Cod_Equipo ,  CONFIRMACION_USUARIO = false, CONFIRMACION_EQUIPO = true, ESTADO = TRUE
    // SOLICITUDES RECIVIDAS
   // Cod_Equipo ,  CONFIRMACION_USUARIO = True, CONFIRMACION_EQUIPO = false, ESTADO = TRUE

   if(this.selectedType == 'recibidos'){
    this.solicitudesService.syncGetSolicitudesEquipos(this.equiposService.perfilEquipo.Cod_Equipo, true,false, true)
    
       }else{
    
        this.solicitudesService.syncGetSolicitudesEquipos(this.equiposService.perfilEquipo.Cod_Equipo, false,true, true)
       }

  }

  cerrarModal(){

    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
  async buscarJugadores(){

    const modal = await this.modalCtrl.create({
      component:BuscarJugadoresPage,
      cssClass:'my-cutom-class'
    });

     await modal.present();

     const { data } = await modal.onWillDismiss();
     if( data == undefined || data != undefined){
      this.solicitudesService.syncGetSolicitudesEquipos(this.equiposService.perfilEquipo.Cod_Equipo, false,true, true)
       this.selectedType = this.tipos[1]
       
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
  this.solicitudesService.syncGetSolicitudesEquipos(this.equiposService.perfilEquipo.Cod_Equipo, true,false, true)
  this.selectedType = this.tipos[0]


  
}

rechazar(solicitud){

  const solicitudActualizar = {

    Cod_Solicitud : solicitud.Cod_Solicitud,
    Cod_Usuario : solicitud.Cod_Usuario,
    Cod_Equipo :solicitud.Cod_Equipo,
    Confirmacion_Usuario:true,
    Confirmacion_Equipo:false,
    Fecha: solicitud.Fecha,
    Estado: false,
    Usuarios: null,
    Equipos: null
  
  };

  this.solicitudesService.actualizarSolicitud(solicitudActualizar,solicitud.Cod_Solicitud,solicitud.Cod_Usuario);
  this.selectedType = this.tipos[0]
}

}
