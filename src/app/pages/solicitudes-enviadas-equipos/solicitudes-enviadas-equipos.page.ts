import { Component, OnInit } from '@angular/core';
import { ActionSheetButton, ActionSheetController } from '@ionic/angular';
import { AlertasService } from 'src/app/services/alertas.service';
import { EquiposService } from 'src/app/services/equipos.service';
import { SolicitudesService } from 'src/app/services/solicitudes.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-solicitudes-enviadas-equipos',
  templateUrl: './solicitudes-enviadas-equipos.page.html',
  styleUrls: ['./solicitudes-enviadas-equipos.page.scss'],
})
export class SolicitudesEnviadasEquiposPage  {

  constructor(
public solicitudesService:SolicitudesService,
public usuariosService:UsuariosService,
public alertasService:AlertasService,
public equiposService:EquiposService,
public actionSheetCtrl:ActionSheetController

  ) { }

  ionViewWillEnter() {
    this.solicitudesService.syncGetSolicitudesEnviadasUsuarioToPromise(this.usuariosService.usuarioActual.usuario.Cod_Usuario).then(solicitudes =>{
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
  
        this.alertasService.message('FUTPLAY','Solicitud cancelada')
      }, error =>{
        this.alertasService.message('FUTPLAY','Lo sentimos algo salio mal')
      })
  
      this.solicitudesService.syncPutSolicitudToProimise(solicitudActualizar).then(resp =>{
        
        this.solicitudesService.syncGetSolicitudesEnviadasUsuarioToPromise(this.usuariosService.usuarioActual.usuario.Cod_Usuario).then(resp=>{
          this.solicitudesService.solicitudesJugadoresArray = resp;
        })
     
  
      }, error =>{
  
        alert('Lo sentimos algo salio mal')
      })
    
  
    }
  

}
