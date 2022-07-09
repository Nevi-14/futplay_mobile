import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { HistorialPartido } from '../models/historialPartido';
import { GoogleAdsService } from './google-ads.service';

@Injectable({
  providedIn: 'root'
})
export class HistorialPartidoService {
  counter: { min: number, sec: number }
partidoActual : HistorialPartido
  constructor(public http: HttpClient, public googleAdsService: GoogleAdsService) { }



  getURL( api: string ){

    let test: string = ''
    if ( !environment.prdMode ) {

      test = environment.TestURL;

    } 

    const URL = environment.preURL  + test +  environment.postURL + api 

console.log(URL);

    return URL;

  }
  
  private getPartidoActual(Cod_Reservacion   ){


    let URL = this.getURL( environment.partidoActualURL);
    URL = URL + environment.codReservacion + Cod_Reservacion

    return this.http.get<HistorialPartido[]>( URL );


  }


  syncPartidoActual(Cod_Cancha){

   return  this.getPartidoActual(Cod_Cancha ).toPromise();

  }

  
private inicioPartidoPost(partido){


  const URL = this.getURL(environment.iniciarPartidoURL);

  const options   = {
    headers: {
      'Content-type':'application/json',
      'Accept':'application/json',
      'Acess-Control-Allow-Origin':'*'
    }
  };


  return this.http.post(URL,JSON.stringify(partido), options);


}
iniciarPartido(partido){
  console.log(partido, 'stored 1')

  this.inicioPartidoPost(partido).subscribe(
    resp =>{

      console.log(resp, 'resp partido iniciado')


    }, error =>{

    }
  )
}




private   putPartidoActual( partido, Cod_Reservacion ){

  let  URL = this.getURL( environment.actualizarPartidoURL);
  URL = URL  + environment.codPartido + partido.Cod_Partido

  console.log(URL,'URL', 'reser', Cod_Reservacion)

   const options = {

    headers: {

        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'

    }

  };
 

  return this.http.put( URL, JSON.stringify(partido), options );
}

actualizarPartido(partido, Cod_Reservacion  ){

  console.log('partido actualizado', partido , Cod_Reservacion)
  this.putPartidoActual( partido, Cod_Reservacion  ).subscribe(
    resp => {

     console.log('partido actualizado', resp)
    }, error => {
      console.log('error', error)
    }
  )
}


private evaluacionJugadorPost(evaluacion){


  const URL = this.getURL(environment.evaluacionJugador);

  const options   = {
    headers: {
      'Content-type':'application/json',
      'Accept':'application/json',
      'Acess-Control-Allow-Origin':'*'
    }
  };


  return this.http.post(URL,JSON.stringify(evaluacion), options);


}
private evaluacionEquipoPost(evaluacion){


  const URL = this.getURL(environment.evaluacionEquipo);

  const options   = {
    headers: {
      'Content-type':'application/json',
      'Accept':'application/json',
      'Acess-Control-Allow-Origin':'*'
    }
  };


  return this.http.post(URL,JSON.stringify(evaluacion), options);


}
evaluacionEquipo(evaluacion){
  console.log(evaluacion, 'stored 1')

  this.evaluacionEquipoPost(evaluacion).subscribe(
    resp =>{

      console.log(resp, 'resp eva ugardada')


    }, error =>{

    }
  )
}
evaluacionJugador(evaluacion){
  console.log(evaluacion, 'stored 1')

  this.evaluacionJugadorPost(evaluacion).subscribe(
    resp =>{

      console.log(resp, 'resp eva ugardada')


    }, error =>{

    }
  )
}
private   putPartidoActualQR( partido, Cod_Reservacion ){

  let  URL = this.getURL( environment.actualizarQrURL);
   URL = URL  + environment.codPartido + partido.Cod_Partido

  console.log(URL,'URL', 'reser', Cod_Reservacion)

   const options = {

    headers: {

        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'

    }

  };
 

  return this.http.put( URL, JSON.stringify(partido), options );
}

actualizarPartidoQR(partido, Cod_Reservacion  ){


  this.putPartidoActualQR( partido, Cod_Reservacion  ).subscribe(
    resp => {
      alert('actualizado')

      this.partidoActual = resp[0];
     console.log('partido actualizada', resp)
     this.googleAdsService.showInterstitial();




   
    }, error => {
      console.log('error', error)
    }
  )
}


startTimer() {
  this.counter = { min: 60, sec: 0 } // choose whatever you want
  let intervalId = setInterval(() => {
    if (this.counter.sec - 1 == -1) {
      this.counter.min -= 1;
      this.counter.sec = 59
      
 
    } 
    else this.counter.sec -= 1
    if (this.counter.min === 0 && this.counter.sec == 0) clearInterval(intervalId)


    
  console.log('this.counter', this.counter)


  }, 1000)


}



}
