import { Component, OnInit } from '@angular/core';
import { ActionSheetButton, ActionSheetController, ModalController } from '@ionic/angular';

import { UsuariosService } from 'src/app/services/usuarios.service';

import { VideoScreenPage } from '../video-screen/video-screen.page';
import { SolicitudesService } from '../../services/solicitudes.service';
import { EquiposService } from 'src/app/services/equipos.service';
import { PerfilJugadorPage } from '../perfil-jugador/perfil-jugador.page';
import { PerfilSolicitud } from '../../models/perfilSolicitud';
import { BuscarJugadoresPage } from '../buscar-jugadores/buscar-jugadores.page';
import { Solicitudes } from '../../models/solicitudes';
import { AlertasService } from '../../services/alertas.service';

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
  segment = 0;
  showReceive = true;
  showSend = false;
  activeCategory = 0;
  categories = [ 'recibidas','enviadas'];
  constructor(
    public modalCtrl:ModalController,
    public actionSheetCtrl: ActionSheetController,
    public usuariosService: UsuariosService,
    public solicitudesService:SolicitudesService,
    public equiposService:EquiposService,
    public alertasService: AlertasService

  ) { }

  ngOnInit() {
 this.receive();
  }

  receive(){
    this.solicitudesService.syncGetSolicitudesRecibidasEquipoToPromise(this.equiposService.equipo.equipo.Cod_Equipo).then(solicitudes =>{

      this.solicitudesService.solicitudesEquiposArray = solicitudes;
    })


  }
  selectCategory(index){
    this.activeCategory = index;
    this.segment = index;
    switch(index){
   
     case 0:
      this.title = 'Recibidas'
      this.receive();

     break;
     
     case 1:
      this.title = 'Enviadas'
      this.send();
     break;
   
     default:
       
       break;
   }
   
   
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

    if(this.activeCategory == 0){

  

      const normalBtns : ActionSheetButton[] = [
        {   
           text: 'Detalle',
           icon:'eye-outline',
           handler: () =>{
  let usuario = null;
  usuario = solicitud.usuario;
  this.perfilJugador(solicitud);
            console.log(solicitud,'solicitud')
           
           }
          
          },
   {   
   //   text: canchaFavoritos ? 'Remover Favorito' : 'Favorito',
     // icon: canchaFavoritos ? 'heart' : 'heart-outline',
     text: 'Aceptar',
     icon:'checkmark-outline',
      handler: () =>{
      // this.videoScreen(4);
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
        header: 'Opiones Solicitud'+' '+  solicitud.usuario.Nombre +' ' + solicitud.usuario.Primer_Apellido,
        cssClass: 'left-align-buttons',
        buttons:normalBtns,
        mode:'ios'
      });
    
    
    
    
    
    await actionSheet.present();
    
    
}else{

  const normalBtns : ActionSheetButton[] = [
    {   
       text: 'Detalle',
       icon:'eye-outline',
       handler: () =>{
let usuario = null;
usuario = solicitud.usuario;
this.perfilJugador(solicitud);
        console.log(solicitud,'solicitud')
       
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
    header: 'Opiones Solicitud'+' '+  solicitud.usuario.Nombre +' ' + solicitud.usuario.Primer_Apellido,
    cssClass: 'left-align-buttons',
    buttons:normalBtns,
    mode:'ios'
  });





await actionSheet.present();



}

    }

      
  rechazar(solicitud){
  
    const solicitudActualizar = {
  
      Cod_Solicitud : solicitud.solicitud.Cod_Solicitud,
      Cod_Usuario : solicitud.solicitud.Cod_Usuario,
      Cod_Equipo :solicitud.solicitud.Cod_Equipo,
      Confirmacion_Usuario:false,
      Confirmacion_Equipo:true,
      Fecha: solicitud.Fecha,
      Estado: false,
      Usuarios: null,
      Equipos: null
    
    };
  
    this.solicitudesService.syncPutSolicitudToProimise(solicitudActualizar).then(resp =>{

      this.alertasService.message('FUTPLAY','Solicitud cancelada')
      this.solicitudesService.syncPutSolicitudToProimise(solicitudActualizar).then(resp =>{
        this.solicitudesService.syncGetSolicitudesRecibidasEquipoToPromise(this.equiposService.equipo.equipo.Cod_Equipo).then(resp=>{
          this.solicitudesService.solicitudesEquiposArray = resp;
          this.solicitudesService.syncGetSolicitudesRecibidasUsuarioToPromise(this.usuariosService.usuarioActual.Cod_Usuario).then(resp=>{
            this.solicitudesService.solicitudesEquiposArray = resp;
          })
        })
        this.selectedType = this.tipos[0]
 
      }, error =>{
  
        alert('Lo sentimos algo salio mal')
      })
    }, error =>{
      this.alertasService.message('FUTPLAY','Lo sentimos algo salio mal')
    })
  

  }


    aceptar(solicitud:PerfilSolicitud){

      const solicitudActualizar:Solicitudes = {
    
        Cod_Solicitud : solicitud.solicitud.Cod_Solicitud,
        Cod_Usuario : solicitud.solicitud.Cod_Usuario,
        Cod_Equipo :solicitud.solicitud.Cod_Equipo,
        Confirmacion_Usuario:true,
        Confirmacion_Equipo:true,
        Estado:true,
  
      
      };
    
      this.solicitudesService.syncPutSolicitudToProimise(solicitudActualizar).then(resp =>{
        this.solicitudesService.syncGetSolicitudesRecibidasEquipoToPromise(this.equiposService.equipo.equipo.Cod_Equipo).then(resp=>{
          this.solicitudesService.solicitudesEquiposArray = resp;
         
        })
        this.selectedType = this.tipos[0]
 
      }, error =>{
  
        alert('Lo sentimos algo salio mal')
      })
       
  
    
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
        async buscarJugadores() {
          const modal = await this.modalCtrl.create({
            component:BuscarJugadoresPage,
            cssClass:'my-custom-modal'
          });
           await modal.present();
      
           const { data } = await modal.onWillDismiss();
           if(data != undefined){
             
           
             
           }
        }
}
