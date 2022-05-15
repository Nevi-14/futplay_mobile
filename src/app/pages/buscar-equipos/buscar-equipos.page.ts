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

@Component({
  selector: 'app-buscar-equipos',
  templateUrl: './buscar-equipos.page.html',
  styleUrls: ['./buscar-equipos.page.scss'],
})
export class BuscarEquiposPage implements OnInit {
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
     cssClass: 'my-custom-class',
     id:'my-modal-id'
   });
   await modal .present();
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
      this.jugadorEquipoSolicitud(equipo)
    
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



}
