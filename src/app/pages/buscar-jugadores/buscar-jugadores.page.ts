import { Component, OnInit } from '@angular/core';
import { ActionSheetButton, ModalController, ActionSheetController } from '@ionic/angular';
import { UsuariosService } from '../../services/usuarios.service';
import { EquiposService } from '../../services/equipos.service';
 

import { PerfilUsuario } from '../../models/perfilUsuario';
import { PerfilJugadorPage } from '../perfil-jugador/perfil-jugador.page';
import { FiltroUbicacionPage } from '../filtro-ubicacion/filtro-ubicacion.page';
import { SolicitudesEquiposPage } from '../solicitudes-equipos/solicitudes-equipos.page';
 
import { VideoScreenPage } from '../video-screen/video-screen.page';
import { Solicitudes } from '../../models/solicitudes';
import { SolicitudesService } from '../../services/solicitudes.service';
import { FiltroUsuariosPage } from '../filtro-usuarios/filtro-usuarios.page';
import { AlertasService } from '../../services/alertas.service';

@Component({
  selector: 'app-buscar-jugadores',
  templateUrl: './buscar-jugadores.page.html',
  styleUrls: ['./buscar-jugadores.page.scss'],
})
export class BuscarJugadoresPage implements OnInit {
  filtro ={
    Cod_Provincia: null,
    Cod_Canton: null,
    Cod_Distrito:null
  }
  textoBuscar = '';
  stadiumProfile =  'assets/main/game-match.svg';
  solicitud:Solicitudes = {

    Cod_Solicitud : null,
    Cod_Usuario : null,
    Cod_Equipo :this.equiposService.equipo.equipo.Cod_Equipo,
    Confirmacion_Usuario:false,
    Confirmacion_Equipo:true,
    Estado:true
  }
    constructor(
      public modalCtrl: ModalController,
      public equiposService: EquiposService,
      public usuariosService:UsuariosService,
      public actionSheetCtrl: ActionSheetController,
      public solicitudesService:SolicitudesService,
      public alertasService: AlertasService
    ) { }
  
    ngOnInit() {
      this.alertasService.presentaLoading('Cargando lista de jugadores...')
  this.usuariosService.syncListaUsuariosToPromise(this.usuariosService.usuarioActual.usuario.Cod_Usuario).then(usuarios=>{
    this.usuariosService.usuarios = usuarios;
    this.alertasService.loadingDissmiss();


  }, error =>{
    this.alertasService.loadingDissmiss();
    this.alertasService.message('FUTPLAY','Lo sentimos algo salio mal!..')
  })

 
    }
    jugadorEquipoSolicitud(usuario: PerfilUsuario){
      this.solicitud.Cod_Usuario = usuario.usuario.Cod_Usuario
  
     this.solicitudesService.generarSolicitud(this.solicitud).then(resp =>{

      this.alertasService.message('FUTPLAY', 'Solicitud Enviada')
     })
    }
  
    regresar(){
  
      this.modalCtrl.dismiss();
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
  
  
    async onOpenMenu(jugador){
      console.log(jugador)
      
          const normalBtns : ActionSheetButton[] = [
            {   
               text: 'Detalle Jugador',
               icon:'person-outline',
               handler: () =>{
       this.perfilJugador(jugador);
               }
              
              },
        
              {   
                text: 'Enviar Solicitud',
                icon:'paper-plane-outline',
                handler: () =>{
                 // this.videoScreen(3);
                 this.jugadorEquipoSolicitud(jugador)
                }
               
               },
              
               {   
                text: 'Cancelar',
                icon:'close-outline',
               role:'cancel',
               
               }
            
              ]
        
        
        
        
          const actionSheet = await this.actionSheetCtrl.create({
            header:'Opciones',
            cssClass: 'left-align-buttons',
            buttons:normalBtns,
            mode:'ios'
          });
        
        
        
        
        
        await actionSheet.present();
        
        
          }

          async videoScreen(id){
            const modal = await this.modalCtrl.create({
              component:VideoScreenPage,
              id:'video-screen-modal',
              cssClass:'modal-view',
              mode:'ios',
              backdropDismiss:false,
              componentProps:{
                index:id
              }
            });

            return await modal.present();
          }


          onSearchChange(event){

            this.textoBuscar = event.detail.value;
              }
              
          async filtroUbicacion(){

  
     
            const modal  = await this.modalCtrl.create({
             component: FiltroUsuariosPage,
             breakpoints: [0, 0.3, 0.5, 0.8],
             initialBreakpoint: 0.5,
             componentProps : {
              'Cod_Provincia': this.filtro.Cod_Provincia,
              'Cod_Canton': this.filtro.Cod_Canton,
              'Cod_Distrito': this.filtro.Cod_Distrito
             },
             cssClass: 'my-custom-class',
             id:'my-modal-id'
           });
           await modal .present();

           const { data } = await modal.onWillDismiss();
         console.log(data)
           if(data !== undefined ){
        
            this.filtro.Cod_Provincia = data.Cod_Provincia;
            this.filtro.Cod_Canton = data.Cod_Canton;
            this.filtro.Cod_Distrito = data.Cod_Distrito;
        
           }
         }

      

    async filtroJugador(){
  
    
       
      const modal  = await this.modalCtrl.create({
       component: FiltroUsuariosPage,
       cssClass: 'my-custom-class',
       id:'my-modal-id'
     });
     await modal .present();
   }


}