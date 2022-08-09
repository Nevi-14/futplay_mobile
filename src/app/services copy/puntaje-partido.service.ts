import { Injectable } from '@angular/core';
import { HistorialPartido } from '../models/historialPartido';
import { vistaEquipos } from '../models/vistaEquipos';
import { AlertasService } from './alertas.service';
import { EquiposService } from './equipos.service';
import { GestionReservacionesService } from './gestion-reservaciones.service';
import { GestionRetosService } from './gestion-retos.service';
import { HistorialPartidoService } from './historial-partido.service';
import { AlertController, ModalController } from '@ionic/angular';
import { GoogleAdsService } from './google-ads.service';
import { VideoScreenPage } from '../pages/video-screen/video-screen.page';
import { UsuariosService } from './usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class PuntajePartidoService {
  Historia_Partido: HistorialPartido = null;
  Historia_Partido2: HistorialPartido = null;

  partido: HistorialPartido[] = null;
  rival: vistaEquipos = null;
  retador: vistaEquipos = null;



  // Puntaje de Calidad x equipo (Puntos x estrellas x 10)
  // Points
  win = 3;
  draw = 1;
  lose = 0;
  // Stars
  min = 1;
  max = 5;
  multiplier = 10;

  constructor(
    public alertasService: AlertasService,
    public equiposService: EquiposService,
    public gestionRestosService: GestionRetosService,
    public historialPartidoService: HistorialPartidoService,
    public gestionReservacionesService: GestionReservacionesService,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public googleAdsService: GoogleAdsService,
    public usuariosService:UsuariosService
  ) { }

  async increasePoints(winner: vistaEquipos, loser: vistaEquipos, stars, partido: HistorialPartido) {


    // ESTRELLAS ACTUALES

    let winnerStars = winner.EstrellasAnteriores == 0 ? 1 : winner.EstrellasAnteriores;
    let loserStars = loser.EstrellasAnteriores == 0 ? 1 : loser.EstrellasAnteriores;
    // ESTRELLAS ACTUALES

    // NUEVAS ESTRELLAS

    let newTotalStarsWinner = winner.Estrellas + 1 > 5 ? 5 : winner.Estrellas + 1;
    let newTotalStarsLoser = loser.Estrellas - 1 == 0 ? 1 : loser.Estrellas - 1;


    // POINTS

    let winnerPoints = 0;
    let loserPoints = 0;


    if (stars == 3) {
      winner.Partidos_Ganados += 1;

      loser.Partidos_Perdidos += 1;
   
      winnerPoints = stars * (loserStars * this.multiplier)
      winner.Puntaje_Actual += winnerPoints;
      winner.Estrellas = newTotalStarsWinner;
      loser.Estrellas = newTotalStarsLoser;


      //return ['win']
    } else if (stars == 1) {


      winnerPoints = stars * (loserStars * this.multiplier)
      loserPoints = stars * (winnerStars * this.multiplier)
      winner.Puntaje_Actual += winnerPoints;
      loser.Puntaje_Actual += loserPoints;


    }

    if (this.rival.Cod_Equipo === winner.Cod_Equipo) {
      winner.Goles_Favor += this.Historia_Partido.Goles_Rival;

      let winnerHigher = Math.max(winner.Goles_Encontra, this.Historia_Partido.Goles_Rival);
      let winnerLess = Math.min(winner.Goles_Encontra, this.Historia_Partido.Goles_Rival);

      let loserHigher = Math.max(loser.Goles_Encontra, this.Historia_Partido.Goles_Rival);
      let loserLess = Math.min(loser.Goles_Encontra, this.Historia_Partido.Goles_Rival);

      let golesEncontraW =winnerHigher - winnerLess;
      let golesEncontraL = loserHigher - loserLess;
if(winner.Goles_Encontra > 0){
  winner.Goles_Encontra = golesEncontraW
}

      loser.Goles_Encontra = golesEncontraL
    } else {

      let winnerHigher = Math.max(winner.Goles_Encontra, this.Historia_Partido.Goles_Retador);
      let winnerLess = Math.min(winner.Goles_Encontra, this.Historia_Partido.Goles_Retador);

      let loserHigher = Math.max(loser.Goles_Encontra, this.Historia_Partido.Goles_Retador);
      let loserLess = Math.min(loser.Goles_Encontra, this.Historia_Partido.Goles_Retador);

      let golesEncontraW =winnerHigher - winnerLess;
      let golesEncontraL = loserHigher - loserLess;



      winner.Goles_Favor += this.Historia_Partido.Goles_Retador;
      if(winner.Goles_Encontra > 0){
        winner.Goles_Encontra = golesEncontraW
      }

      loser.Goles_Encontra = golesEncontraL;
    }



    winner.EstrellasAnteriores = winner.Estrellas;
    loser.EstrellasAnteriores = loser.Estrellas;

    this.alertasService.presentaLoading('Verificando Marcador');

    if (winner.Cod_Equipo === partido.Cod_Equipo) {

      this.equiposService.actualizarEquipoToPromise(winner, winner.Cod_Usuario).then(resp => {
        this.equiposService.syncGetEquiposPosicion().then(equipos => {

          let winnerPosicion = equipos.findIndex(equipo => equipo.Cod_Equipo == winner.Cod_Equipo);
          winner.Posicion_Actual = winnerPosicion + 1;

          this.equiposService.actualizarEquipoToPromise(winner, winner.Cod_Usuario).then(resp => {
            partido.Estado = true;
            this.historialPartidoService.actualizarPartidotoPromise(partido, partido.Cod_Reservacion).then((partido: HistorialPartido) => {

              this.Historia_Partido = partido;

              this.usuariosService.syncPartidosJugados(winner.Cod_Equipo).then(resp =>{

                if (stars == 3) {
                  this.alertasService.loadingDissmiss();
                  this.videoScreen(6);
                 // this.alert(winner.Nombre, winner.Foto)
                } else if (stars == 1) {
                  this.alertasService.loadingDissmiss();
                  this.videoScreen(6);
                  //this.alertasService.message('FUTPLAY', 'Empate')
                }

              })
         
            })
          })
        });

      })


    } else {
      this.equiposService.actualizarEquipoToPromise(loser, loser.Cod_Usuario).then(resp => {
        this.equiposService.syncGetEquiposPosicion().then(equipos => {
          let loserPosicion = equipos.findIndex(equipo => equipo.Cod_Equipo == loser.Cod_Equipo);
          loser.Posicion_Actual = loserPosicion + 1;
          this.equiposService.actualizarEquipoToPromise(loser, loser.Cod_Usuario).then(resp => {

            partido.Estado = true;
            this.historialPartidoService.actualizarPartidotoPromise(partido, partido.Cod_Reservacion).then((partido: HistorialPartido) => {

              this.Historia_Partido = partido;

              this.usuariosService.syncPartidosJugados(loser.Cod_Equipo).then(resp =>{

                if (stars == 3) {
                  this.alertasService.loadingDissmiss();
                //  this.alert(winner.Nombre, winner.Foto)
                this.videoScreen(6);
                } else if (stars == 1) {
                  this.alertasService.loadingDissmiss();
                 // this.alertasService.message('FUTPLAY', 'Empate')
                 this.videoScreen(6);
                }

              })
         
            })
          })

        })
      })


    }










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
  puntaje(reto, partidoActual: HistorialPartido) {


    this.equiposService.syncEquipo(reto.Cod_Rival).then(rival => {

      this.rival = rival[0];

      this.equiposService.syncEquipo(reto.Cod_Retador).then(retador => {

        this.retador = retador[0];


        this.historialPartidoService.syncPartidoActual(reto.Cod_Reservacion).then(

          partido => {

            this.partido = partido;

            console.log('partido', partido)

            if (
              this.partido[0].Goles_Retador > this.partido[0].Goles_Rival
              &&
              this.partido[1].Goles_Retador > this.partido[1].Goles_Rival

              &&
              this.partido[0].Goles_Rival < this.partido[0].Goles_Retador
              &&
              this.partido[1].Goles_Rival < this.partido[1].Goles_Retador
              &&
              this.partido[0].Goles_Rival == this.partido[1].Goles_Rival
              &&
              this.partido[0].Goles_Retador == this.partido[1].Goles_Retador
            ) {

              this.increasePoints(this.retador, this.rival, this.win, partidoActual);

            } else if (
              this.partido[0].Goles_Rival > this.partido[0].Goles_Retador
              &&
              this.partido[1].Goles_Rival > this.partido[1].Goles_Retador
              &&
              this.partido[0].Goles_Retador < this.partido[0].Goles_Rival
              &&
              this.partido[1].Goles_Retador < this.partido[1].Goles_Rival
              &&
              this.partido[0].Goles_Rival == this.partido[1].Goles_Rival
              &&
              this.partido[0].Goles_Retador == this.partido[1].Goles_Retador



            ) {


              this.increasePoints(this.rival, this.retador, this.win, partidoActual);


            } else if (



              this.partido[0].Goles_Rival == this.partido[1].Goles_Retador
              &&
              this.partido[0].Goles_Retador == this.partido[1].Goles_Rival
              &&
              this.partido[0].Goles_Rival == this.partido[1].Goles_Rival
              &&
              this.partido[0].Goles_Retador == this.partido[1].Goles_Retador

            ) {

              this.increasePoints(this.rival, this.retador, this.draw, partidoActual);
            } else {


              this.alertasService.message('FUTPLAY', 'Ambos marcadores deben de coincidir.')

            }


          });

      });


    });



  }



  async alert(name, imageUrl) {
    const alert = await this.alertCtrl.create({
      header: 'Equipo Ganador',
      subHeader: name,
      message: `<img src="assets/soccer-shields-svg/${imageUrl}" class="card-alert">`,

    })

    await alert.present();


    /**
     * setTimeout(() => {
      alert.dismiss();
      this.alertasService.presentaLoading('Cargando Evaluación')
      setTimeout(()=>{
    
        this.alertasService.loadingDissmiss();
      
      },3000)
      

    }, 5000);
     */
  }


}
