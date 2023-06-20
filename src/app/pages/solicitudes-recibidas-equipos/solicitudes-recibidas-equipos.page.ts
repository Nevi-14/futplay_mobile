import { Component, OnInit } from '@angular/core';
import { ActionSheetButton, ActionSheetController, ModalController } from '@ionic/angular';
import { Solicitudes } from 'src/app/models/solicitudes';
import { AlertasService } from 'src/app/services/alertas.service';
import { EquiposService } from 'src/app/services/equipos.service';
import { SolicitudesService } from 'src/app/services/solicitudes.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { EquipoDetalleModalPage } from '../equipo-detalle-modal/equipo-detalle-modal.page';

@Component({
  selector: 'app-solicitudes-recibidas-equipos',
  templateUrl: './solicitudes-recibidas-equipos.page.html',
  styleUrls: ['./solicitudes-recibidas-equipos.page.scss'],
})
export class SolicitudesRecibidasEquiposPage  {

  constructor(
public solicitudesService: SolicitudesService,
public usuariosService:UsuariosService,
public alertasService:AlertasService,
public equiposService:EquiposService,
public actionSheetCtrl:ActionSheetController,
public modalCtrl:ModalController

  ) { }

  ionViewWillEnter() {
this.cargarSolicitudes();
  }

  cargarSolicitudes(){
    this.solicitudesService.syncGetSolicitudesRecibidasUsuarioToPromise(this.usuariosService.usuarioActual.usuario.Cod_Usuario).then(solicitudes =>{
      console.log('solicitudes', solicitudes)
          this.solicitudesService.solicitudesJugadoresArray = solicitudes;
        })
  }
  filledStars(stars:number){

    return new Array(stars)
  }
  emptyStars(stars:number){
    let value = 5 - stars;
    return new Array(value)
  }

  async onOpenMenu(solicitud){

    let equipo  = null;
    console.log('solicitud',solicitud)
    this.equiposService.equipos = [];
    const normalBtns : ActionSheetButton[] = [
      {  
       
     
        //   text: canchaFavoritos ? 'Remover Favorito' : 'Favorito',
          // icon: canchaFavoritos ? 'heart' : 'heart-outline',
          text: 'Detalle equipo',
          icon:'eye-outline',
           handler: () =>{
       this.equipoDetalle(solicitud)
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
           header:  'Opiones Solicitud',
           cssClass: 'left-align-buttons',
           buttons:normalBtns,
           mode:'ios'
         });
         await actionSheet.present();
  
    

  }
  
  rechazar(solicitud){
  
    
    const solicitudActualizar:Solicitudes  = {
  
      Cod_Solicitud : solicitud.Cod_Solicitud,
      Cod_Usuario : solicitud.Cod_Usuario,
      Cod_Equipo :solicitud.Cod_Equipo,
      Confirmacion_Usuario:false,
      Confirmacion_Equipo:false,
      Estado: false
    
    };

    this.solicitudesService.syncPutSolicitudToProimise(solicitudActualizar).then(resp =>{
      this.alertasService.message('FUTPLAY', 'Solicitud Rechazada!.')
      this.cargarSolicitudes();

    }, error =>{

      this.alertasService.message('FUTPLAY', 'Lo sentimos algo salio mal!.')
    })
  

  }

  async equipoDetalle(solicitud:Solicitudes ){
     
    let equipo = await this.equiposService.syncGetPerfilEquipoToPromise(solicitud.Cod_Equipo)
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
 


  aceptar(solicitud){
    console.log('solicitud', solicitud)
        const solicitudActualizar:Solicitudes = {
      
          Cod_Solicitud : solicitud.Cod_Solicitud,
          Cod_Usuario : solicitud.Cod_Usuario,
          Cod_Equipo :solicitud.Cod_Equipo,
          Confirmacion_Usuario:true,
          Confirmacion_Equipo:true,
          Estado:true,
    
        
        };
      
        this.solicitudesService.syncPutSolicitudToProimise(solicitudActualizar).then(resp =>{
       this.alertasService.message('FUTPLAY', 'Solicitud Aceptada.')
            this.cargarSolicitudes();
           
      
        }, error =>{
    
          this.alertasService.message('FUTPLAY', 'Lo sentimos algo salio mal!.')
        })
         
    
      
      }
}
