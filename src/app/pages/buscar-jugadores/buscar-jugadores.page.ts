import { Component, OnInit } from '@angular/core';
import { ActionSheetButton, ModalController, ActionSheetController, InfiniteScrollCustomEvent } from '@ionic/angular';
import { UsuariosService } from '../../services/usuarios.service';
import { EquiposService } from '../../services/equipos.service';
 

import { PerfilUsuario } from '../../models/perfilUsuario';
import { PerfilJugadorPage } from '../perfil-jugador/perfil-jugador.page';
import { Solicitudes } from '../../models/solicitudes';
import { SolicitudesService } from '../../services/solicitudes.service';
import { FiltroUsuariosPage } from '../filtro-usuarios/filtro-usuarios.page';
import { AlertasService } from '../../services/alertas.service';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-buscar-jugadores',
  templateUrl: './buscar-jugadores.page.html',
  styleUrls: ['./buscar-jugadores.page.scss'],
})
export class BuscarJugadoresPage  {
  filtro ={
    Codigo_Pais: null,
    Codigo_Estado: null,
    Codigo_Ciudad:null,
    Codigo_Posicion:null
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
  items = [];
  url  = environment.archivosURL;
    constructor(
      public modalCtrl: ModalController,
      public equiposService: EquiposService,
      public usuariosService:UsuariosService,
      public actionSheetCtrl: ActionSheetController,
      public solicitudesService:SolicitudesService,
      public alertasService: AlertasService,
      public translateService:TranslateService
    ) { }
  
    ionViewWillEnter() {
      this.alertasService.presentaLoading(this.translateService.instant('LOADING'));
  this.usuariosService.syncListaUsuariosToPromise(this.usuariosService.usuarioActual.Cod_Usuario).then(usuarios=>{
    this.usuariosService.usuarios = usuarios;
    this.alertasService.loadingDissmiss();
    this.generateItems();

  }, error =>{
    this.alertasService.loadingDissmiss();
    this.alertasService.message('FUTPLAY', this.translateService.instant('SOMETHING_WENT_WRONG'))
  })

 
    }

    
  private generateItems() {
    const count = this.usuariosService.usuarios.length + 1;
    for (let i = 0; i < 100; i++) {
      this.items.push(this.usuariosService.usuarios[i]);
    }
  }

  onIonInfinite(ev) {
    this.generateItems();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
    jugadorEquipoSolicitud(usuario: PerfilUsuario){
      this.alertasService.presentaLoading(this.translateService.instant('LOADING'));
      this.solicitud.Cod_Usuario = usuario.usuario.Cod_Usuario
  
     this.solicitudesService.generarSolicitud(this.solicitud).then(resp =>{
this.alertasService.loadingDissmiss();
      this.alertasService.message('FUTPLAY', this.translateService.instant('REQUEST_SENT'))
     }, error =>{
      this.alertasService.loadingDissmiss();
      this.alertasService.message('FUTPLAY', this.translateService.instant('SOMETHING_WENT_WRONG'))
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
              text: this.translateService.instant('VIEW_PROFILE'),
               icon:'person-outline',
               handler: () =>{
       this.perfilJugador(jugador);
               }
              
              },
        
              {   
                text: this.translateService.instant('SEND_REQUEST'),
                icon:'paper-plane-outline',
                handler: () =>{
                 // this.videoScreen(3);
                 this.jugadorEquipoSolicitud(jugador)
                }
               
               },
              
               {   
                text: this.translateService.instant('CANCEL'),
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



          onSearchChange(event){

            this.textoBuscar = event.detail.value;
              }
              
          async filtroUbicacion(){

            
            const modal  = await this.modalCtrl.create({
             component: FiltroUsuariosPage,
             breakpoints: [0, 0.3, 0.5, 0.8],
             initialBreakpoint: 0.5,
             componentProps : {
              'Codigo_Pais': this.filtro.Codigo_Pais,
              'Codigo_Estado': this.filtro.Codigo_Estado,
              'Codigo_Ciudad': this.filtro.Codigo_Ciudad,
              'Codigo_Posicion': this.filtro.Codigo_Posicion
             },
             cssClass: 'my-custom-class',
             id:'my-modal-id'
           });
           await modal .present();

           const { data } = await modal.onWillDismiss();

           if(data !== undefined ){ 
            this.filtro.Codigo_Pais = data.Codigo_Pais;
            this.filtro.Codigo_Estado = data.Codigo_Estado;
            this.filtro.Codigo_Ciudad = data.Codigo_Ciudad;
            this.filtro.Codigo_Posicion = data.Codigo_Posicion
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