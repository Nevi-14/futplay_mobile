import { Component, OnInit } from '@angular/core';
import { ActionSheetButton, ActionSheetController, ModalController } from '@ionic/angular';
import { Solicitudes } from 'src/app/models/solicitudes';
import { AlertasService } from 'src/app/services/alertas.service';
import { EquiposService } from 'src/app/services/equipos.service';
import { JugadoresService } from 'src/app/services/jugadores.service';
import { SolicitudesService } from 'src/app/services/solicitudes.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { PerfilJugadorPage } from '../perfil-jugador/perfil-jugador.page';
import { PerfilSolicitud } from 'src/app/models/perfilSolicitud';

@Component({
  selector: 'app-solicitudes-enviadas-jugadores',
  templateUrl: './solicitudes-enviadas-jugadores.page.html',
  styleUrls: ['./solicitudes-enviadas-jugadores.page.scss'],
})
export class SolicitudesEnviadasJugadoresPage implements OnInit {

  constructor(
    public solicitudesService:SolicitudesService,
    public equiposService:EquiposService,
    public alertasService:AlertasService,
    public actionSheetCtrl:ActionSheetController,
    public usuariosService:UsuariosService,
    public jugadoresService:JugadoresService,
    public modalCtrl:ModalController
    
      ) { }
    
      ngOnInit() {
        
      }
    ionViewWillEnter(){
   
      this.cargarSolicitudes();
    }

    async perfilJugador(solicitud:PerfilSolicitud) {
      let jugador = await this.usuariosService.syncGetUsuario(solicitud.usuario.Cod_Usuario);
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
console.log(solicitud,'soli')
      let equipo  = null;
      console.log('solicitud',solicitud)
      this.equiposService.equipos = [];
      const normalBtns : ActionSheetButton[] = [
        {  
         
       
          //   text: canchaFavoritos ? 'Remover Favorito' : 'Favorito',
            // icon: canchaFavoritos ? 'heart' : 'heart-outline',
            text: 'Detalle jugador',
            icon:'eye-outline',
             handler: () =>{
       this.perfilJugador(solicitud)
             }
            
            },
   
        
                {   
                 text: 'Cancelar Solicitud',
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
  
      rechazar(solicitud:PerfilSolicitud){
      
        
        const solicitudActualizar:Solicitudes  = {
      
          Cod_Solicitud : solicitud.solicitud.Cod_Solicitud,
          Cod_Usuario : solicitud.solicitud.Cod_Usuario,
          Cod_Equipo :solicitud.solicitud.Cod_Equipo,
          Confirmacion_Usuario:false,
          Confirmacion_Equipo:false,
          Estado: false,   
        };
      
 
        this.solicitudesService.syncPutSolicitudToProimise(solicitudActualizar).then(resp =>{
          this.alertasService.message('FUTPLAY','Solicitud Cancelada!.')
         this.cargarSolicitudes();
    
        }, error =>{
    
          this.alertasService.message('FUTPLAY', 'Lo sentimos algo salio mal!..')
        })
      
    
      }

      cargarSolicitudes(){
        this.solicitudesService.syncGetSolicitudesEnviadasEquipoToPromise(this.equiposService.equipo.equipo.Cod_Equipo).then(solicitudes =>{
    
          this.solicitudesService.solicitudesEquiposArray = solicitudes;
        })
      }
}
