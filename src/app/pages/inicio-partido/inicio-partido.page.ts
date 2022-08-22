import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { vistaEquipos } from 'src/app/models/vistaEquipos';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { GestionRetos } from '../../models/gestionRetos';
import { ListaCanchas } from '../../models/listaCanchas';
import { HistorialPartidoService } from '../../services/historial-partido.service';
import { EvaluacionJugadorPage } from '../evaluacion-jugador/evaluacion-jugador.page';
import { HistorialPartido } from 'src/app/models/historialPartido';
import { EquiposService } from 'src/app/services/equipos.service';
import { PuntajePartidoService } from 'src/app/services/puntaje-partido.service';
import { GestionReservacionesService } from '../../services/gestion-reservaciones.service';
import { AlertasService } from 'src/app/services/alertas.service';
import { GoogleAdsService } from 'src/app/services/google-ads.service';
import { VideoScreenPage } from '../video-screen/video-screen.page';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-inicio-partido',
  templateUrl: './inicio-partido.page.html',
  styleUrls: ['./inicio-partido.page.scss'],
})
export class InicioPartidoPage implements OnInit {
  stadiumProfile =  'assets/main/stadium-profile.svg';
  soccer= 'assets/icon/soccer.svg';
  @Input() reto: GestionRetos
  @Input() equipo : vistaEquipos
  @Input() partido : HistorialPartido[]

  index = 0;
  index2 = 0;
  constructor(
public modalCtrl: ModalController,
public usuariosSerice:UsuariosService,
public historialPartidoService: HistorialPartidoService,
public equiposService: EquiposService,
public puntajeService: PuntajePartidoService,
public  gestionReservacionesService: GestionReservacionesService,
public alertasService: AlertasService,
private cd: ChangeDetectorRef,
public googleAdsService: GoogleAdsService,
public http: HttpClient


  ) { }

  ngOnInit() {
console.log(this.reto)
this.index = this.partido.findIndex(p => p.Cod_Equipo == this.equipo.Cod_Equipo );
this.index2= this.partido.findIndex(p => p.Cod_Equipo != this.equipo.Cod_Equipo );
    this.puntajeService.Historia_Partido = this.partido[this.index];
    this.puntajeService.Historia_Partido2 = this.partido[this.index2];


   this.videoScreen(5);

   
    
  }


   consultarequipo(){
    let equipo = null;
   return   this.equiposService.syncEquipo(this.equipo.Cod_Equipo).then(resp =>{
     return resp[0]
    });
  }
  cerrarModal(){
    this.modalCtrl.dismiss();
  }




  checkURL(cod_equipo){


    this.equiposService.syncEquipo(cod_equipo).then(resp =>{
      let url = 'https://futplaycompany.com/FUTPLAY_APIS_HOST/PerfilEquipoUploads/';
      let asset = 'assets/soccer-shields-svg/';

      console.log(resp,'resp')
  /**
   *    if( resp.Avatar ){
      return asset+resp.Foto; 
     }else{

      return url+resp.Foto;
     }
   */
    })
  


}
  


sumarMarcadorRival(){
this.puntajeService.Historia_Partido.Goles_Rival += 1;
console.log(this.puntajeService.Historia_Partido, 'put')
this.historialPartidoService.actualizarPartidotoPromise(this.puntajeService.Historia_Partido, this.puntajeService.Historia_Partido.Cod_Reservacion).then(resp =>{
  this.actualizarMarcaor();
})

}

async actualizarMarcaor(){

  this.historialPartidoService.syncPartidoActual(this.reto.Cod_Reservacion).then(resp =>{

    this.partido = resp;
    this.index = this.partido.findIndex(p => p.Cod_Equipo == this.equipo.Cod_Equipo );
  this.index2= this.partido.findIndex(p => p.Cod_Equipo != this.equipo.Cod_Equipo );
      this.puntajeService.Historia_Partido = this.partido[this.index];
      this.puntajeService.Historia_Partido2 = this.partido[this.index2];
  })
}
restarMarcadorRival(){

  if( this.puntajeService.Historia_Partido.Goles_Rival == 0){
this.puntajeService.Historia_Partido.Goles_Rival  = 0;

    return
  }else{
    this.puntajeService.Historia_Partido.Goles_Rival -= 1;
  }
  console.log(this.puntajeService.Historia_Partido, 'put')
  this.historialPartidoService.actualizarPartidotoPromise(this.puntajeService.Historia_Partido, this.puntajeService.Historia_Partido.Cod_Reservacion).then(resp =>{
    this.actualizarMarcaor();
  })
  }


  
sumarMarcadorRetador(){
  this.puntajeService.Historia_Partido.Goles_Retador += 1;
  console.log(this.puntajeService.Historia_Partido, 'put')

  this.historialPartidoService.actualizarPartidotoPromise(this.puntajeService.Historia_Partido, this.puntajeService.Historia_Partido.Cod_Reservacion).then(resp =>{
    this.actualizarMarcaor();
  })
  }
  restarMarcadorRetador(){
  
    if( this.puntajeService.Historia_Partido.Goles_Retador == 0){
  this.puntajeService.Historia_Partido.Goles_Retador  = 0;
      return
    }else{
      this.puntajeService.Historia_Partido.Goles_Retador -= 1;
    }
    console.log(this.puntajeService.Historia_Partido, 'put')
    this.historialPartidoService.actualizarPartidotoPromise(this.puntajeService.Historia_Partido, this.puntajeService.Historia_Partido.Cod_Reservacion).then(resp =>{
      this.actualizarMarcaor();
    })
    }




  evaluacionIndividual(){
    console.log('partido', this.puntajeService.Historia_Partido)
    // reatdor
   
    this.historialPartidoService.actualizarPartidotoPromise(this.puntajeService.Historia_Partido, this.puntajeService.Historia_Partido.Cod_Reservacion);
    this.gestionReservacionesService.syncPutReservacion(this.reto.Cod_Reservacion, 6).then(resp =>{

      console.log('reservaciones actualizada', resp)
      if(this.reto.Cod_Usuario_Rival == this.usuariosSerice.usuarioActual.Cod_Usuario){

        this.equiposService.SyncJugadoresEquipos(this.reto.Cod_Retador).then( jugadores =>{
          this.equiposService.syncEquipo(this.reto.Cod_Retador).then(equipo =>{
            this.evaluacion(jugadores, equipo[0]);
          });
   
        
   
         
       })
   
   
      
   
       }else{
   
   
       // rival
   
       this.equiposService.SyncJugadoresEquipos(this.reto.Cod_Rival).then( jugadores =>{
        this.equiposService.syncEquipo(this.reto.Cod_Rival).then(equipo =>{
         this.evaluacion(jugadores, equipo[0]);
        });
       })
   
       }
    });
   // this.puntajeService.increasePoints(this.puntajeService.Historia_Partido.);




  }
  async videoScreen(id){
    const modal = await this.modalCtrl.create({
      component:VideoScreenPage,
      cssClass:'modal-view',
      id:'video-screen-modal',
      mode:'ios',
      backdropDismiss:false,
      componentProps:{
        index:id
      }
    });
    return await modal.present();
    
      }

  async evaluacion(jugadores,equipo){

    this.modalCtrl.dismiss();
    
    const modal = await this.modalCtrl.create({
      component:EvaluacionJugadorPage,
      cssClass:'my-custom-class',
      componentProps:{
        jugadores:jugadores,
        equipo:equipo,
        partido:this.puntajeService.Historia_Partido
      }

    })

    return await modal.present();
  }


  verificarPuntos(){
   

    if(!this.puntajeService.Historia_Partido.Estado){
     
        this.actualizarMarcaor().then(resp =>{
        
          this.puntajeService.puntaje(this.reto, this.puntajeService.Historia_Partido);
        })
   
  

    }
    

  }

}