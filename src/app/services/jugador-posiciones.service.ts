import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JugadorPosiciones } from '../models/jugadorPosiciones';

@Injectable({
  providedIn: 'root'
})
export class JugadoresPosicionesService {

  jugadoresPosiciones:  JugadorPosiciones[]=[];
  jugadorCurrentPosicion = {
    jugadorID: null,
    usuarioID:null,
    posicionID:null,
    apodo:'',
  }
  constructor( private http: HttpClient) { }

  getJugadores(){
    this.http.get<JugadorPosiciones[]>('/assets/json/jugadores.json').subscribe(resp=>{
    if(resp){
     this.jugadoresPosiciones = resp;
     console.log(resp)
    }else{
      console.log('Error clubes roles');
    }
   });
 }

 jugadorCurrentP(usuarioID){
 const  i  = this.jugadoresPosiciones.findIndex( d => d.usuarioID === usuarioID );
 if ( i >= 0 ){
this.jugadorCurrentPosicion = this.jugadoresPosiciones[i];
} else {
console.log('no player profile');
}
 }
 add(usuarioID: number, posicionID: number, fecha: Date, apodo: string){
  this.jugadoresPosiciones.push(new JugadorPosiciones(this.jugadoresPosiciones.length+1, usuarioID,posicionID,apodo));
 }


 
 editJugadorPosiciones(id: number, jugadorPosicion){

  for( let i = 0; i < this.jugadoresPosiciones.length ; i++){  
    if(this.jugadoresPosiciones[i].usuarioID ===id ){
      this.jugadoresPosiciones[i].apodo = jugadorPosicion.apodo;
      this.jugadoresPosiciones[i].posicionID = jugadorPosicion.posicionID;
      console.log( this.jugadoresPosiciones[i]);


    } 

  }

}





}
