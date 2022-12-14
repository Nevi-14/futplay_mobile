import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { partidos } from '../models/partidos';

@Injectable({
  providedIn: 'root'
})
export class PartidoService {

  constructor(
public http: HttpClient

  ) { }


  getURL( api: string ){
    let test: string = ''
    if ( !environment.prdMode ) {
   test = environment.TestURL;
    }
  const URL = environment.preURL  + test +  environment.postURL + api 
 
    return URL;
  }
  
   getPartidoReservacion(Cod_Reservacion ){
    let URL = this.getURL( environment.getPartidoURL);
    URL = URL +Cod_Reservacion
    console.log(URL,'URL')
    return this.http.get<partidos[]>( URL );
  }
  private    putPartidoCodigoQR(partido:partidos){

    let URL = this.getURL( environment.putPartidoCodigoQR);
     URL = URL +partido.Cod_Reservacion  ;
    const options = {
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*'
      }
    };
   
 
    return this.http.put( URL, partido, options );
  }
  private    putPartido(partido:partidos){

    let URL = this.getURL( environment.putPartidoURL);
     URL = URL +partido.Cod_Reservacion  ;
    const options = {
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*'
      }
    };
   
 
    return this.http.put( URL, partido, options );
  }

  private    putFinalizarPartido(partido:partidos){

    let URL = this.getURL( environment.finalizarPartidoURL);
     URL = URL +partido.Cod_Reservacion  ;
    const options = {
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*'
      }
    };
   
 console.log('URL', URL)
 console.log('partido', partido)
    return this.http.put( URL, partido, options );
  }
  syncGetPartidoReservacion(Cod_Reservacion){

    return this.getPartidoReservacion(Cod_Reservacion).toPromise();
  }

  syncPutFinalizarPartido(partido:partidos){

    return this.putFinalizarPartido(partido).toPromise();
  }
  syncPutPartidoCodigoQR(partido:partidos){

    return this.putPartidoCodigoQR(partido).toPromise();
  }

  syncPutPartido(partido:partidos){

    return this.putPartido(partido).toPromise();
  }
}
