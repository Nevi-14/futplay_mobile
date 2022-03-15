import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { HistorialPartido } from '../models/historialPartido';

@Injectable({
  providedIn: 'root'
})
export class HistorialPartidoService {

partidoActual : HistorialPartido
  constructor(public http: HttpClient) { }



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

    return this.http.get<HistorialPartido>( URL );


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
   URL = URL  + environment.codReservacionParam + Cod_Reservacion

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


  this.putPartidoActual( partido, Cod_Reservacion  ).subscribe(
    resp => {

     console.log('partido actualizada', resp)
    }, error => {
      console.log('error', error)
    }
  )
}




private   putPartidoActualQR( partido, Cod_Reservacion ){

  let  URL = this.getURL( environment.actualizarQrURL);
   URL = URL  + environment.codReservacion + Cod_Reservacion

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

      this.partidoActual = resp[0];
     console.log('partido actualizada', resp)
    }, error => {
      console.log('error', error)
    }
  )
}






}
