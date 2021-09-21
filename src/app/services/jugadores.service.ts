import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Jugador } from '../models/jugadores';

@Injectable({
  providedIn: 'root'
})
export class JugadoresService {

  jugadores:  Jugador[]=[];
  constructor( private http: HttpClient) { }

  getJugadores(){
    this.http.get<Jugador[]>('/assets/json/jugadores.json').subscribe(resp=>{
    if(resp){
     this.jugadores = resp;
     console.log(resp)
    }else{
      console.log('Error clubes roles');
    }
   });
 }

 add(usuarioID: number, clubID: number, posicionID: number, apodo: string){
  this.jugadores.push(new Jugador(this.jugadores.length+1, usuarioID,clubID,posicionID,apodo));
 }
}
