import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EquiposService } from 'src/app/services/equipos.service';
import { SolicitudesService } from 'src/app/services/solicitudes.service';
import { BuscarJugadoresPage } from '../buscar-jugadores/buscar-jugadores.page';

@Component({
  selector: 'app-solicitudes-equipos',
  templateUrl: './solicitudes-equipos.page.html',
  styleUrls: ['./solicitudes-equipos.page.scss'],
})
export class SolicitudesEquiposPage implements OnInit {
  stadiumProfile =  'assets/main/game-match.svg';
  public tipos : string[]=['recibidos','enviados'];
  public selectedType: string = this.tipos[0];
  constructor(
    public modalCtrl:ModalController,
    public solicitudesService:SolicitudesService,
    public equiposService: EquiposService
  ) { }

  ngOnInit() {
    this.solicitudesService.syncGetSolicitudesEquipos(this.equiposService.perfilEquipo.Cod_Equipo, true,false, true)

  }
  segmentChanged(event:any){
    console.log(event)
    

    this.selectedType = event.detail.value;
    console.log(event.detail.value)
  
        //    SOLICITUDES ENVIADAS
   // Cod_Equipo ,  CONFIRMACION_USUARIO = false, CONFIRMACION_EQUIPO = true, ESTADO = TRUE
    // SOLICITUDES RECIVIDAS
   // Cod_Equipo ,  CONFIRMACION_USUARIO = True, CONFIRMACION_EQUIPO = false, ESTADO = TRUE

   if(this.selectedType == 'recibidos'){
    this.solicitudesService.syncGetSolicitudesEquipos(this.equiposService.perfilEquipo.Cod_Equipo, true,false, true)
    
       }else{
    
        this.solicitudesService.syncGetSolicitudesEquipos(this.equiposService.perfilEquipo.Cod_Equipo, false,true, true)
       }

  }

  cerrarModal(){

    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
  async buscarJugadores(){

    const modal = await this.modalCtrl.create({
      component:BuscarJugadoresPage,
      cssClass:'my-cutom-class'
    });

     await modal.present();

     const { data } = await modal.onWillDismiss();
     if( data == undefined || data != undefined){
      this.solicitudesService.syncGetSolicitudesEquipos(this.equiposService.perfilEquipo.Cod_Equipo, false,true, true)
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
  this.solicitudesService.syncGetSolicitudesEquipos(this.equiposService.perfilEquipo.Cod_Equipo, true,false, true)
  this.selectedType = this.tipos[0]


  
}

rechazar(solicitud){

  const solicitudActualizar = {

    Cod_Solicitud : solicitud.Cod_Solicitud,
    Cod_Usuario : solicitud.Cod_Usuario,
    Cod_Equipo :solicitud.Cod_Equipo,
    Confirmacion_Usuario:true,
    Confirmacion_Equipo:false,
    Fecha: solicitud.Fecha,
    Estado: false,
    Usuarios: null,
    Equipos: null
  
  };

  this.solicitudesService.actualizarSolicitud(solicitudActualizar,solicitud.Cod_Solicitud,solicitud.Cod_Usuario);
  this.selectedType = this.tipos[0]
}

}
