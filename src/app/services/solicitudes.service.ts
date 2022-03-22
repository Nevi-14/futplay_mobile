import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { iif } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SolicitudesJugadoresEquipos } from '../models/solicitudesJugadoresEquipos';
import { options } from 'preact';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {
  solicitudesJugadoresArray:SolicitudesJugadoresEquipos[]=[]
solicitudesEquiposArray:SolicitudesJugadoresEquipos[]=[]
  constructor(
private http: HttpClient

  ) { }


getURL(api:string){

  let test : string = '';

  if(!environment.prdMode){

     test = environment.TestURL;
  }

  const URL = environment.preURL + test + environment.postURL + api

  console.log(URL)

  return URL;

}

private getSolicitudesJugadores(Cod_Usuario){

  let URL = this.getURL(environment.SolicitudesJugadoresURL);

  URL = URL + environment.codEquipoParam + Cod_Usuario

  return this.http.get<SolicitudesJugadoresEquipos[]>(URL);


}
private getSolicitudesEquipos(Cod_Equipo){
  let URL = this.getURL(environment.SolicitudesEquiposURL);

  URL = URL + environment.codEquipoParam + Cod_Equipo
  return this.http.get<SolicitudesJugadoresEquipos[]>(URL);

}

syncGetSolicitudesJugadores(Cod_Usuario){

  this.solicitudesJugadoresArray = [];

  this.getSolicitudesJugadores(Cod_Usuario).subscribe(
    resp =>{
this.solicitudesJugadoresArray = resp.splice(0);

console.log(this.solicitudesJugadoresArray, 'this.solicitudesJugadoresArray')
    }, error =>{

      console.log(error, 'this.solicitudesJugadoresArray')
    }
  )

}
syncGetSolicitudesEquipos(Cod_Equipo){

  this.solicitudesEquiposArray = [];

  this.getSolicitudesEquipos(Cod_Equipo).subscribe(

    resp =>{

this.solicitudesEquiposArray = resp.splice(0);

console.log(this.solicitudesEquiposArray, 'this.solicitudesEquiposArray')

    }, error =>{

      console.log(error, 'this.solicitudesEquiposArray')


    }
  )
  
}


private postSolicitud(solicitud){
  let URL = this.getURL(environment.SolicitudesJugadoresEquiposPutURL);

  const options = {

    headers: {
      'Content-Type':'application/json',
      'Accept':'application/json',
      'Access-Control-Allow-Origin':'*'
    }
  };

  return this.http.post(URL, JSON.stringify(solicitud),options);


}
private postJugadorEquipo(JugadorEquipo){
  let URL = this.getURL(environment.jugadoresEquiposPostURL);

  const options = {

    headers: {
      'Content-Type':'application/json',
      'Accept':'application/json',
      'Access-Control-Allow-Origin':'*'
    }
  };

  return this.http.post(URL, JSON.stringify(JugadorEquipo),options);


}
generarSolicitud(solicitud){


this.postSolicitud(solicitud).subscribe(

  resp =>{

    console.log(resp, 'post solicitud completed', solicitud)


  }, error =>{
    console.log(error, 'post solicitud error', solicitud)




  }
)

}
generarJugadorEquipo(JugadorEquipo){


  this.postJugadorEquipo(JugadorEquipo).subscribe(
  
    resp =>{
  
      console.log(resp, 'post JugadorEquipo completed', JugadorEquipo)
  
  
    }, error =>{
      console.log(error, 'post JugadorEquipo error', JugadorEquipo)
  
  
  
  
    }
  )
  
  }

private putSolicitud(Solicitud,Cod_Solicitud, Cod_Usuario){

let URL = this.getURL(environment.SolicitudesJugadoresEquiposPutURL);

URL = URL + environment.codSolicitudParam + Cod_Solicitud + environment.codUsuarioParam + Cod_Usuario;

const options = {

  headers: {

    'Content-Type':'application/json',
    'Accept':'application/json',
    'Access-Control-Allow-Origin':'*'
  }

  
};

return this.http.put(URL, JSON.stringify(Solicitud),options)

}


actualizarSolicitud(Solicitud,Cod_Solicitud,Cod_Usuario){

  this.putSolicitud(Solicitud,Cod_Solicitud,Cod_Usuario).subscribe(

    resp =>{
console.log(resp, 'solicitud actualizada', Solicitud)

    }, error => {

      console.log(error, 'solicitud actualizada error', Solicitud)

    }
  )

}


private deleteSolicitudes(Cod_Solicitud, Cod_Usuario){

let URL = this.getURL(environment.SolicitudesJugadoresEquiposDeleteURL);

URL = URL + environment.codSolicitudParam + Cod_Solicitud  + environment.codUsuarioSecondParam + Cod_Usuario;

const options = {

  headers:{

    'Content-Type':'application/json',
    'Accept':'application/json',
    'Access-Control-Allow-Origin':'*'
  }
}

return this.http.delete(URL,options);

}

deleteSolicitud(Cod_Solicitud,Cod_Usuario){

  this.deleteSolicitudes(Cod_Solicitud,Cod_Usuario).subscribe(

    resp =>{
      console.log('reservacion eliminada', resp)

    }, error =>{
      console.log('reservacion no eliminada error', error)

    }
  )


}

}
