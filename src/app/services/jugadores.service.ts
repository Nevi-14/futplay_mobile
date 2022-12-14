import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Jugador } from '../models/jugador';
import { AlertasService } from './alertas.service';
import { PerfilJugador } from '../models/perfilJugador';

@Injectable({
  providedIn: 'root'
})
export class JugadoresService {
jugadores:PerfilJugador[]=[]
jugador:PerfilJugador;
  constructor(
    private http: HttpClient,
    private router: Router,
    public alertasService: AlertasService
  ) { }
  reload:boolean = false;
// GET  METHODS

  getURL( api: string ){

    let test: string = ''
    if ( !environment.prdMode ) {
      test = environment.TestURL;
      
    }
  const URL = environment.preURL  + test +  environment.postURL + api;


    return URL;
  }

  private getJugadoresEquipos( Cod_Equipo){
    let URL = this.getURL( environment.getJugadoresEquipoURL);
        URL = URL + Cod_Equipo

        console.log(URL, 'URL ')
    return this.http.get<PerfilJugador[]>( URL );
  }


 


  syncJugadoresEquipos(Cod_Equipo){

  return this.getJugadoresEquipos(Cod_Equipo).toPromise();

  
  }


 



// POST METHODS


private postJugador (jugador:Jugador){
  
  let URL = this.getURL( environment.postJugadoresEquiposURL );

  URL = URL +jugador.Cod_Equipo
  const options = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
  };
 console.log('post equipo URL', URL)
  return this.http.post( URL, JSON.stringify(jugador), options );
}

syncPostJugadorEquipoToPromise(jugador:Jugador){
console.log('jugador', jugador)
 return  this.postJugador(jugador).toPromise();

}



// PUT  METHODS

  private    putJugadorEquipo(jugador:Jugador){

    let URL = this.getURL( environment.putJugadoresEquiposURL);
     URL = URL +jugador.Cod_Equipo  ;
    const options = {
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*'
      }
    };
   
 
    return this.http.put( URL, jugador, options );
  }

  
  putJugadorToPromise(jugador:Jugador  ){


   
      
   return this.putJugadorEquipo( jugador ).toPromise();
  }

 

 


  // DELETE  METHODS

  private   deleteJugadorEquipo(Cod_Jugador ){

    let URL = this.getURL( environment.deleteJugadoresEquiposURL);
        URL = URL  + Cod_Jugador;
    const options = {
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*'
      } 
    };
 console.log('URL', URL)
    return this.http.delete( URL, options );
  }

  syncDeleteJugadorEquipo(Cod_Jugador){

    return this.deleteJugadorEquipo(Cod_Jugador).toPromise();

  }

}
