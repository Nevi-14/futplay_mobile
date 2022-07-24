import { Component, OnInit } from '@angular/core';
import { ActionSheetButton, ActionSheetController, ModalController } from '@ionic/angular';
import { SolicitudesJugadoresEquipos } from 'src/app/models/solicitudesJugadoresEquipos';
import { vistaEquipos } from 'src/app/models/vistaEquipos';
import { EquiposService } from 'src/app/services/equipos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { SolicitudesService } from '../../services/solicitudes.service';
import { FiltroUbicacionPage } from '../filtro-ubicacion/filtro-ubicacion.page';
import { EquipoDetalleModalPage } from '../equipo-detalle-modal/equipo-detalle-modal.page';
import { AlertasService } from 'src/app/services/alertas.service';
import { SolicitudesJugadoresPage } from '../solicitudes-jugadores/solicitudes-jugadores.page';

@Component({
  selector: 'app-buscar-equipos',
  templateUrl: './buscar-equipos.page.html',
  styleUrls: ['./buscar-equipos.page.scss'],
})
export class BuscarEquiposPage implements OnInit {
  filtro ={
    Cod_Provincia: null,
    Cod_Canton: null,
    Cod_Distrito:null,
  }
  textoBuscar = '';
solicitudJugadorEquipo:SolicitudesJugadoresEquipos = {
  Cod_Solicitud : null,
  Cod_Usuario : this.usuariosService.usuarioActual.Cod_Usuario,
  Cod_Equipo :null,
  Confirmacion_Usuario:true,
  Confirmacion_Equipo:false,
  Fecha: new Date(),
  Estado: true,
  Usuarios: null,
  Equipos: null

};
  stadiumProfile =  'assets/main/game-match.svg';
  constructor(
    public modalCtrl: ModalController,
    public equiposService: EquiposService,
    public usuariosService:UsuariosService,
    public solicitudesService:SolicitudesService,
    public actionSheetCtrl: ActionSheetController,
    public alertasService: AlertasService
  ) { }

  ngOnInit() {
    this.equiposService.equipos = [];
      this.alertasService.presentaLoading('Cargando datos...');
      this.equiposService.SyncEquipos(this.usuariosService.usuarioActual.Cod_Usuario).then(resp =>{
        this.equiposService.equipos = resp.slice(0);
        this.alertasService.loadingDissmiss();

      }, error =>{
        this.alertasService.loadingDissmiss();
        this.alertasService.message('FUTPLAY', 'Error cargando datos...')
      });
      console.log('equipos')
  }
  jugadorEquipoSolicitud(equipo:vistaEquipos){
    this.solicitudJugadorEquipo.Cod_Equipo = equipo.Cod_Equipo

    this.solicitudesService.generarSolicitud(this.solicitudJugadorEquipo);

    this.modalCtrl.dismiss({
      'dismissed': true
    });

  }
  onSearchChange(event){

    this.textoBuscar = event.detail.value;
      }

  
  async filtroUbicacion(){

  
     
    const modal  = await this.modalCtrl.create({
     component: FiltroUbicacionPage,
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
 async detalleEquipo(equipo){

  
     
  const modal  = await this.modalCtrl.create({
   component: EquipoDetalleModalPage,
   cssClass: 'my-custom-class',
  
   componentProps:{
    equipo:equipo
   }
 });
 await modal .present();
}
  cerrarModal(){

    this.modalCtrl.dismiss();
  }


  async onOpenMenu(equipo){


    const normalBtns : ActionSheetButton[] = [
      {   
         text: 'Detalle',
         icon:'eye-outline',
         handler: () =>{
           this.detalleEquipo(equipo)
          console.log(equipo,'solicitud')
         
         }
        
        },
 {   
 //   text: canchaFavoritos ? 'Remover Favorito' : 'Favorito',
   // icon: canchaFavoritos ? 'heart' : 'heart-outline',
   text: 'Enviar Solicitud',
   icon:'paper-plane-outline',
    handler: () =>{
      this.alertasService.presentaLoading('Enviando solicitud..')
      this.solicitudJugadorEquipo.Cod_Equipo = equipo.Cod_Equipo

     
      this.solicitudesService.generarSolicitud(this.solicitudJugadorEquipo).then(resp =>{

        this.cerrarModal();
this.alertasService.message('FUTPLAY','Solicitud Enviada')
this.alertasService.loadingDissmiss();
}, error =>{
  this.cerrarModal();

this.alertasService.message('FUTPLAY','Solicitud no enviada, verifica que no hayas enviando una solicitud o seas parte del equipo')
this.alertasService.loadingDissmiss();

    })
    
    }
   
   },
 
     
         {   
          text: 'Cancelar',
          icon:'close-outline',
         role:'cancel',
         
         }
      
        ]

  
    const actionSheet = await this.actionSheetCtrl.create({
      header:'Opciones Equipo'+ ' '+ equipo.Nombre,
      cssClass: 'left-align-buttons',
      buttons:normalBtns,
      mode:'ios'
    });
  
  
  
  
  
  await actionSheet.present();
  
  
    }

    async soliitudes(){


      const modal = await this.modalCtrl.create({
  
        component:SolicitudesJugadoresPage,
        cssClass:'my-custom-modal',
        componentProps:{
          showReceiveInput:false,
          showSendInput:true
        }
      });
  
  
      return await modal.present();
  
    }


}
