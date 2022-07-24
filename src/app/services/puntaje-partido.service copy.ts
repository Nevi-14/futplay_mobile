import { Injectable } from '@angular/core';
import { HistorialPartido } from '../models/historialPartido';
import { vistaEquipos } from '../models/vistaEquipos';
import { AlertasService } from './alertas.service';
import { EquiposService } from './equipos.service';
import { GestionReservacionesService } from './gestion-reservaciones.service';
import { GestionRetosService } from './gestion-retos.service';
import { HistorialPartidoService } from './historial-partido.service';

@Injectable({
  providedIn: 'root'
})
export class PuntajePartidoService {

 partido:HistorialPartido[] = null;
 rival:vistaEquipos = null;
 retador:vistaEquipos  = null;



// Puntaje de Calidad x equipo (Puntos x estrellas x 10)
// Points
win = 3;
lose = 1;
draw = 0;
// Stars
min = 1;
max = 5;
multiplier = 10;

  constructor(
  public alertasService:AlertasService,
  public equiposService: EquiposService,
  public gestionRestosService:GestionRetosService,
  public historialPartidoService: HistorialPartidoService ,
  public gestionReservacionesService: GestionReservacionesService 
  ) { }

  async increasePoints(winner:vistaEquipos, loser:vistaEquipos, stars:number){

    console.log(winner, loser, stars)
    
   if(stars < this.min || stars > this.max){

     this.alertasService.message('FUTPLAY', 'No se puede completar la acción.')
      return

   }

   let points =  loser.Estrella  == null || loser.Estrella == undefined ? this.min :  loser.Estrella;
    let total  = points  *(stars * this.multiplier) 

   
    winner.Puntaje_Actual +=  total;
    this.equiposService.actualizarEquipo(winner, winner.Cod_Usuario);
    return total
    
  }



 puntaje(reto, Historia_Partido){


  this.equiposService.syncEquipo(reto.Cod_Rival).then(rival =>{

    this.rival = rival[0];

    this.equiposService.syncEquipo(reto.Cod_Retador).then(retador =>{

     this.retador = retador[0];


     this.historialPartidoService.syncPartidoActual(reto.Cod_Reservacion).then(

      partido =>{
  
       this.partido = partido
      
       if(
        this.partido[0].Goles_Retador > this.partido[0].Goles_Rival 
        &&
        this.partido[1].Goles_Retador > this.partido[1].Goles_Rival

        &&
        this.partido[0].Goles_Rival < this.partido[0].Goles_Retador 
        &&
        this.partido[1].Goles_Rival < this.partido[1].Goles_Retador
        ){

        alert(JSON.stringify(['winner retador', this.retador]))

       }else if (
        this.partido[0].Goles_Rival > this.partido[0].Goles_Retador 
        &&
        this.partido[1].Goles_Rival > this.partido[1].Goles_Retador
        &&
        this.partido[0].Goles_Retador < this.partido[0].Goles_Rival 
        &&
        this.partido[1].Goles_Retador < this.partido[1].Goles_Rival
        
        
        
        
        ){

        alert(JSON.stringify(['winner rival', this.rival]))
       }else if ( this.partido[0].Goles_Rival === this.partido[1].Goles_Rival 
        &&
        this.partido[0].Goles_Retador === this.partido[1].Goles_Retador){
          alert(JSON.stringify(['match', this.rival]))
        
       }else{

        alert(JSON.stringify(['pending', this.partido]))
       }
       
     
      });
   
   });
   
   
     });
  




/**
 *   this.gestionRestosService.syncGetReservacionToPromise(reto.Cod_Reservacion).then(resp =>{

    console.log('reto', resp)
  })

 */

  // CARGAMOS EL HISTORIAL DEL PARTIDO

  this.historialPartidoService.syncPartidoActual(reto.Cod_Reservacion).then(
    resp =>{

let partido:HistorialPartido[] = resp;

let i = partido.findIndex(p => p.Cod_Equipo != Historia_Partido.Cod_Equipo);



if(partido[i].Goles_Retador == Historia_Partido.Goles_Retador  &&
 partido[i].Estado  &&   Historia_Partido.Estado 
 ){
  this.alertasService.message('FUTPLAY', 'Partido Finalizado')
let winner:vistaEquipos = null;
let loser:vistaEquipos = null;
  if(reto.Cod_Retador == partido[i].Cod_Equipo && partido[i].Goles_Retador > partido[i].Goles_Rival  ){

  }else{

  }

  alert(partido[i])
alert(JSON.stringify([{'winner':winner},{'loser':loser}]))

  return;
  this.increasePoints(winner, loser, this.win).then(resp =>{

  });
this.gestionReservacionesService.syncPutReservacion(reto.Cod_Reservacion, 7).then(resp =>{

  console.log('reservaciones actualizada', resp)
})
 }else{
  let winner:vistaEquipos = null;
  let loser:vistaEquipos = null;
     if(reto.Cod_Retador == partido[i].Cod_Equipo && partido[i].Goles_Retador > partido[i].Goles_Rival  ){
   

     }else{

     }
   alert(JSON.stringify([{'winner':winner},{'loser':loser}]))
this.alertasService.message('FUTPLAY', 'Verificación pendiente')
 }

console.log('partido', resp)

    })
}





}
