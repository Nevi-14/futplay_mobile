import { Injectable } from '@angular/core';
import { vistaEquipos } from '../models/vistaEquipos';
import { AlertasService } from './alertas.service';
import { EquiposService } from './equipos.service';

@Injectable({
  providedIn: 'root'
})
export class PuntajePartidoService {
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
  public equiposService: EquiposService  
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


}
