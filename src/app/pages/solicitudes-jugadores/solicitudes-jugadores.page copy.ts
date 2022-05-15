import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EquiposService } from 'src/app/services/equipos.service';
import { SolicitudesService } from 'src/app/services/solicitudes.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { BuscarEquiposPage } from '../buscar-equipos/buscar-equipos.page';

@Component({
  selector: 'app-solicitudes-jugadores',
  templateUrl: './solicitudes-jugadores.page.html',
  styleUrls: ['./solicitudes-jugadores.page.scss'],
})
export class SolicitudesJugadoresPage implements OnInit {
  img =  'assets/main/game-match.svg';
  public tipos : string[]=['recibidos','enviados'];
  public selectedType: string = this.tipos[0];
  constructor(
    public modalCtrl:ModalController,
    public solicitudesService:SolicitudesService,
    public equiposService: EquiposService,
    public usuariosService:UsuariosService
  ) { }

  ngOnInit() {
    this.solicitudesService.syncGetSolicitudesJugadores(this.usuariosService.usuarioActual.Cod_Usuario, false,true, true)
  
  }
  segmentChanged(event:any){
    console.log(event)
    

    this.selectedType = event.detail.value;
    console.log(event.detail.value)


    //    SOLICITUDES ENVIADAS
   // COD_USUARIO ,  CONFIRMACION_USUARIO = TRUE, CONFIRMACION_EQUIPO = NULL, ESTADO = TRUE
    // SOLICITUDES RECIVIDAS
   // COD_USUARIO ,  CONFIRMACION_USUARIO = NULL, CONFIRMACION_EQUIPO = TRYE, ESTADO = TRUE

   if(this.selectedType == 'recibidos'){
this.solicitudesService.syncGetSolicitudesJugadores(this.usuariosService.usuarioActual.Cod_Usuario, false,true, true)

   }else{

    this.solicitudesService.syncGetSolicitudesJugadores(this.usuariosService.usuarioActual.Cod_Usuario, true,false, true)
   }
  }

  cerrarModal(){

    this.modalCtrl.dismiss();
  }
  async buscarJugadores(){

    const modal = await this.modalCtrl.create({
      component:BuscarEquiposPage,
      cssClass:'my-cutom-class'
    });

     await modal.present();

     const { data } = await modal.onWillDismiss();
if(data != undefined){
  this.solicitudesService.syncGetSolicitudesJugadores(this.usuariosService.usuarioActual.Cod_Usuario, true,false, true)
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

    this.selectedType = this.tipos[0]
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
  
    this.solicitudesService.actualizarSolicitud(solicitudActualizar,solicitud.Cod_Solicitud,solicitud.Cod_Usuario);

    this.selectedType = this.tipos[0]
  }
}
