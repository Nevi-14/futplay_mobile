import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetButton, ActionSheetController, ModalController } from '@ionic/angular';
import { BuscarJugadoresPage } from '../buscar-jugadores/buscar-jugadores.page';
import { SolicitudesService } from 'src/app/services/solicitudes.service';
import { EquiposService } from 'src/app/services/equipos.service';
import { PerfilSolicitud } from 'src/app/models/perfilSolicitud';
import { PerfilJugadorPage } from '../perfil-jugador/perfil-jugador.page';
import { Solicitudes } from 'src/app/models/solicitudes';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { AlertasService } from 'src/app/services/alertas.service';
@Component({
  selector: 'app-transferencias',
  templateUrl: './transferencias.page.html',
  styleUrls: ['./transferencias.page.scss'],
})
export class TransferenciasPage implements OnInit {
  solicitudes:PerfilSolicitud[] = [];
  segment = 'received';
  constructor(
public router:Router,
public modalCtrl:ModalController,
public solicitudesService:SolicitudesService,
public equiposService:EquiposService,
public actionSheetCtrl:ActionSheetController,
public usuariosService:UsuariosService,
public alertasService:AlertasService,
public cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
 this.received();
  }
  regresar(){

    this.modalCtrl.dismiss();
  }

  async buscarJugadores() {

    const modal = await this.modalCtrl.create({
      component: BuscarJugadoresPage,
      cssClass: 'my-custom-modal'
    });

    modal.present();
    const { data } = await modal.onWillDismiss();
    console.log(data)
  }

  segmentChanged($event){

    let value = $event.detail.value;
    switch(value){
        case 'received':
          this.segment = 'received'
         this.received();
        break;
        case 'sent':
          this.segment = 'sent'
        this.send()
          break;
    }
    this.cd.detectChanges();
  }

  received(){
    this.solicitudesService.syncGetSolicitudesRecibidasEquipoToPromise(this.equiposService.equipo.equipo.Cod_Equipo).then(solicitudes =>{
      this.solicitudes = solicitudes;
    })
  }

  send(){
    this.solicitudesService.syncGetSolicitudesEnviadasEquipoToPromise(this.equiposService.equipo.equipo.Cod_Equipo).then(solicitudes =>{
      this.solicitudes = solicitudes;
    })
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
   
 
      }, error =>{
  
        alert('Lo sentimos algo salio mal')
      })
    }, error =>{
      this.alertasService.message('FUTPLAY','Lo sentimos algo salio mal')
    })
  

  }
  async onOpenMenu(solicitud:PerfilSolicitud){

    if(this.segment == 'received'){

  

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
            this.solicitudesService.syncPutSolicitudToProimise(solicitudActualizar).then(resp =>{
              this.solicitudesService.syncGetSolicitudesRecibidasUsuarioToPromise(this.usuariosService.usuarioActual.Cod_Usuario).then(resp=>{
                this.solicitudesService.solicitudesJugadoresArray = resp;
              })
            
           this.alertasService.message('FUTPLAY', 'Solicitud aceptada')
            }, error =>{
        
              alert('Lo sentimos algo salio mal')
            })
             
        
          }, error =>{
      
            alert('error')
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

}