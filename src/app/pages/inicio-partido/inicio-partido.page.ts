import { Component, OnInit, Input } from '@angular/core';
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
import { GestionRetosService } from '../../services/gestion-retos.service';
import { GestionReservacionesService } from '../../services/gestion-reservaciones.service';
import { AlertasService } from 'src/app/services/alertas.service';

@Component({
  selector: 'app-inicio-partido',
  templateUrl: './inicio-partido.page.html',
  styleUrls: ['./inicio-partido.page.scss'],
})
export class InicioPartidoPage implements OnInit {
  stadiumProfile =  'assets/main/stadium-profile.svg';
  soccer= 'assets/icon/soccer.svg';
  @Input() reto: GestionRetos
  @Input() cancha : ListaCanchas
  @Input() retador: vistaEquipos
  @Input() rival:vistaEquipos;
  retadorPopUp: vistaEquipos
  @Input() equipo : vistaEquipos
  @Input() partido : HistorialPartido
  Historia_Partido :HistorialPartido = null;
  Historia_PartidosRival :HistorialPartido = null;
   Historia_PartidosRetador :HistorialPartido = null;
  constructor(
public modalCtrl: ModalController,
public usuariosSerice:UsuariosService,
public historialPartidoService: HistorialPartidoService,
public equiposService: EquiposService,
public puntajeService: PuntajePartidoService,
public gestionRestosService: GestionRetosService,
public  gestionReservacionesService: GestionReservacionesService,
public alertasService: AlertasService


  ) { }

  ngOnInit() {
    
    if(this.partido[0].Cod_Equipo == this.rival.Cod_Equipo){
       this.Historia_PartidosRival = this.partido[0];
       this.Historia_PartidosRetador = this.partido[1];

       if(this.rival.Cod_Usuario === this.usuariosSerice.usuarioActual.Cod_Usuario){
        this.Historia_Partido = this.partido[0];
       }else{
        this.Historia_Partido = this.partido[1];

       }

    }else {

      this.Historia_PartidosRival = this.partido[1];
      this.Historia_PartidosRetador = this.partido[0];
      if(this.retador.Cod_Usuario === this.usuariosSerice.usuarioActual.Cod_Usuario){
        this.Historia_Partido = this.partido[1];
       }else{
        this.Historia_Partido = this.partido[0];

       }
    }

    console.log('modificar', this.Historia_Partido)
    console.log(this.partido,'this.partido', this.Historia_PartidosRetador, this.Historia_PartidosRival)
  
  //  this.historialPartidoService.startTimer( );
   if( this.retador.Cod_Usuario == this.usuariosSerice.usuarioActual.Cod_Usuario){
     this.retadorPopUp = this.rival;
   }else{
    this.retadorPopUp = this.retador;
   }

    console.log('equipo', this.equipo)
    
  }
  cerrarModal(){
    this.modalCtrl.dismiss();
  }

sumarMarcadorRival(){
this.Historia_Partido.Goles_Rival += 1;
console.log(this.Historia_Partido, 'put')
this.historialPartidoService.actualizarPartido(this.Historia_Partido, this.Historia_Partido.Cod_Reservacion)
}
restarMarcadorRival(){

  if( this.Historia_Partido.Goles_Rival == 0){
this.Historia_Partido.Goles_Rival  = 0;

    return
  }else{
    this.Historia_Partido.Goles_Rival -= 1;
  }
  console.log(this.Historia_Partido, 'put')
  this.historialPartidoService.actualizarPartido(this.Historia_Partido, this.Historia_Partido.Cod_Reservacion)
  }


  
sumarMarcadorRetador(){
  this.Historia_Partido.Goles_Retador += 1;
  console.log(this.Historia_Partido, 'put')

  this.historialPartidoService.actualizarPartido(this.Historia_Partido, this.Historia_Partido.Cod_Reservacion)
  }
  restarMarcadorRetador(){
  
    if( this.Historia_Partido.Goles_Retador == 0){
  this.Historia_Partido.Goles_Retador  = 0;
      return
    }else{
      this.Historia_Partido.Goles_Retador -= 1;
    }
    console.log(this.Historia_Partido, 'put')
    this.historialPartidoService.actualizarPartido(this.Historia_Partido, this.Historia_Partido.Cod_Reservacion)
    }


  sumarMarcador(){


    if(this.reto.Cod_Usuario_Rival == this.usuariosSerice.usuarioActual.Cod_Usuario){

    this.partido.Goles_Rival += 1;
    this.historialPartidoService.actualizarPartido(this.partido, this.partido.Cod_Reservacion);
    }else{

      this.partido.Goles_Retador += 1;
      this.historialPartidoService.actualizarPartido(this.partido, this.partido.Cod_Reservacion);

    }

    console.log(this.partido,'this.partido sumarMarcador')
  }
  restarMarcador(){


    if(this.reto.Cod_Usuario_Rival == this.usuariosSerice.usuarioActual.Cod_Usuario){

    this.partido.Goles_Rival -= 1;

    this.historialPartidoService.actualizarPartido(this.partido, this.partido.Cod_Reservacion);

    }else{

      this.partido.Goles_Retador -= 1;
      this.historialPartidoService.actualizarPartido(this.partido, this.partido.Cod_Reservacion);

    }
    console.log(this.partido,'this.partido restarMarcador')
  }

  evaluacionIndividual(){
    console.log('partido', this.Historia_Partido)
    // reatdor
    this.Historia_Partido.Estado = true;
    this.historialPartidoService.actualizarPartido(this.Historia_Partido, this.Historia_Partido.Cod_Reservacion);
    this.gestionReservacionesService.syncPutReservacion(this.reto.Cod_Reservacion, 6).then(resp =>{

      console.log('reservaciones actualizada', resp)
      if(this.reto.Cod_Usuario_Rival == this.usuariosSerice.usuarioActual.Cod_Usuario){

        this.equiposService.SyncJugadoresEquipos(this.reto.Cod_Retador).then( jugadores =>{
   
         this.evaluacion(jugadores, this.retador, this.partido);
   
         
       })
   
   
      
   
       }else{
   
   
       // rival
   
       this.equiposService.SyncJugadoresEquipos(this.reto.Cod_Rival).then( jugadores =>{
   
         this.evaluacion(jugadores, this.rival, this.partido);
       })
   
       }
    });
   // this.puntajeService.increasePoints(this.Historia_Partido.);




  }


  async evaluacion(jugadores,equipo,partido){

    this.modalCtrl.dismiss();
    
    const modal = await this.modalCtrl.create({
      component:EvaluacionJugadorPage,
      cssClass:'my-custom-class',
      componentProps:{
        jugadores:jugadores,
        equipo:equipo,
        partido:partido
      }

    })

    return await modal.present();
  }


  verificarPuntos(){
    this.gestionRestosService.syncGetReservacionToPromise(this.reto.Cod_Reservacion).then(resp =>{

      console.log('reto', resp)
    })
    this.historialPartidoService.syncPartidoActual(this.reto.Cod_Reservacion).then(
      resp =>{
let partido:HistorialPartido[] = resp;

let i = partido.findIndex(p => p.Cod_Equipo != this.Historia_Partido.Cod_Equipo);
if(partido[i].Goles_Retador == this.Historia_Partido.Goles_Retador  &&
   partido[i].Estado  &&   this.Historia_Partido.Estado 
   ){
    this.alertasService.message('FUTPLAY', 'Partido Finalizado')
 let winner:vistaEquipos = null;
 let loser:vistaEquipos = null;
    if(this.reto.Cod_Retador == partido[i].Cod_Equipo && partido[i].Goles_Retador > partido[i].Goles_Rival  ){
   winner =  this.retador;
   loser =  this.rival;
    }else{
 winner = this.rival;
 loser =  this.retador;
    }
    this.puntajeService.increasePoints(winner, loser, this.puntajeService.win).then(resp =>{

    });
  this.gestionReservacionesService.syncPutReservacion(this.reto.Cod_Reservacion, 7).then(resp =>{

    console.log('reservaciones actualizada', resp)
  })
   }else{
this.alertasService.message('FUTPLAY', 'Verificación pendiente')
   }

console.log('partido', resp)

      })
  }

}