import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { iif } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SolicitudesJugadoresEquipos } from '../models/solicitudesJugadoresEquipos';
import { options } from 'preact';
import { SolicitudesJugadoresEquiposVista } from '../models/solicitudesJugadoresEquiposVista';
import { AlertasService } from './alertas.service';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {
  solicitudesJugadoresArray:SolicitudesJugadoresEquiposVista[]=[]
solicitudesEquiposArray:SolicitudesJugadoresEquiposVista[]=[]
  constructor(
private http: HttpClient,
public alertasService: AlertasService

  ) { }


getURL(api:string){

  let test : string = '';

  if(!environment.prdMode){

     test = environment.TestURL;
  }

  const URL = environment.preURL + test + environment.postURL + api

 

  return URL;

}

private getSolicitudesJugadores(Cod_Usuario, Confirmacion_Usuario,Confirmacion_Equipo,Estado){

  let URL = this.getURL(environment.SolicitudesJugadoresURL);

  URL = URL + environment.codUsuarioParam + Cod_Usuario + environment.codConfirmacionUsuarioParam + Confirmacion_Usuario + environment.codConfirmacionEquipoParam + Confirmacion_Equipo + environment.codEstadoParam + Estado
  console.log(URL)
  return this.http.get<SolicitudesJugadoresEquiposVista[]>(URL);


}
private getSolicitudesEquipos(Cod_Equipo, Confirmacion_Usuario,Confirmacion_Equipo,Estado){
  let URL = this.getURL(environment.SolicitudesEquiposURL);

  URL = URL + environment.codEquipoParam + Cod_Equipo + environment.codConfirmacionUsuarioParam + Confirmacion_Usuario + environment.codConfirmacionEquipoParam + Confirmacion_Equipo + environment.codEstadoParam + Estado

  console.log(URL)


  return this.http.get<SolicitudesJugadoresEquiposVista[]>(URL);

}

syncGetSolicitudesJugadores(Cod_Usuario, Confirmacion_Usuario,Confirmacion_Equipo,Estado){

  this.solicitudesJugadoresArray = [];

  this.getSolicitudesJugadores(Cod_Usuario, Confirmacion_Usuario,Confirmacion_Equipo,Estado).subscribe(
    resp =>{
this.solicitudesJugadoresArray = resp.splice(0);

console.log(this.solicitudesJugadoresArray, 'this.solicitudesJugadoresArray')
    }, error =>{

      console.log(error, 'this.solicitudesJugadoresArray')
    }
  )

}
syncGetSolicitudesEquipos(Cod_Equipo, Confirmacion_Usuario,Confirmacion_Equipo,Estado){

  this.solicitudesEquiposArray = [];

  this.getSolicitudesEquipos(Cod_Equipo, Confirmacion_Usuario,Confirmacion_Equipo,Estado).subscribe(

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
this.alertasService.message('FUTPLAY','Solicitud Enviada')
    console.log(resp, 'post solicitud completed', solicitud)
    //this.syncGetSolicitudesJugadores(solicitud.Cod_Usuario, Confirmacion_Usuario,Confirmacion_Equipo,Estado)
    //this.syncGetSolicitudesEquipos(solicitud.Cod_Equipo, Confirmacion_Usuario,Confirmacion_Equipo,Estado)

  }, error =>{
    console.log(error, 'post solicitud error', solicitud)




  }
)

}
generarJugadorEquipo(JugadorEquipo){


  this.postJugadorEquipo(JugadorEquipo).subscribe(
  
    resp =>{
    //  this.syncGetSolicitudesJugadores(JugadorEquipo.Cod_Usuario)
      //this.syncGetSolicitudesEquipos(JugadorEquipo.Cod_Equipo)
      this.alertasService.message('FUTPLAY',' solicitud aceptada')
      console.log(resp, 'post JugadorEquipo completed', JugadorEquipo)
      
  
    }, error =>{
      console.log(error, 'post JugadorEquipo error', JugadorEquipo)
  
  
  
  
    }
  )
  
  }

private putSolicitud(Solicitud,Cod_Solicitud, Cod_Usuario){

let URL = this.getURL(environment.SolicitudesJugadoresEquiposPutURL);

URL = URL + environment.codSolicitudParam + Cod_Solicitud + environment.codUsuarioSecondParam + Cod_Usuario;

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

      
    this.syncGetSolicitudesJugadores(Solicitud.Cod_Usuario, false,true, true)


    this.syncGetSolicitudesEquipos(Solicitud.Cod_Equipo, true,false, true)


      const jugador = {

        Cod_Jugador :null,
        Cod_Usuario: Solicitud.Cod_Usuario,
        Cod_Equipo: Solicitud.Cod_Equipo,
        Fecha: new Date(),
        Favorito: false,
        Administrador_Equipo: false

      }
      console.log(resp, 'solicitud actualizada', Solicitud)
  if(Solicitud.Confirmacion_Usuario && Solicitud.Confirmacion_Equipo && Solicitud.Estado){
    this.generarJugadorEquipo(jugador);
  } else{
    this.alertasService.message('FUTPLAY', 'Solicitud Rechazada')
  }


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
