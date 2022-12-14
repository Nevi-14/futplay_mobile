import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(
    public http: HttpClient
  ) { }


  getURL( api: string ){

    let test : string = '';

  if(!environment.prdMode){

     test = environment.TestURL;
  }

  const URL = environment.preURL + test + environment.postURL + api

 

  return URL;
  }
  private postReservacionEmail(data) {

    const URL = this.getURL(environment.postReservacionCorreo);

    const options = {
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Acess-Control-Allow-Origin': '*'
      }
    };

    console.log('post url', URL);
    console.log('post user', data)

    return this.http.post(URL, JSON.stringify(data), options);
  }
  

  
  syncPostReservacionEmail(data) {

    return this.postReservacionEmail(data).toPromise();
  }

async enviarCorreoReservaciones($index, $email , $fecha, $hora,$cancha, $rival, $retador){

let body:any = null;
  switch($index){
   
    case  1 :
// NUEVA RESERVACION
     body = {body: {
        email: $email,
      body: "Se ha recibido una reto para el día " +  $fecha +" en  la cancha " +  $cancha +  " hora "+  this.tConvert($hora.split(" ")[1]) + ". Los equipos que disputarán este reto son " +  $rival +" y " +  $retador +" . Si desea Aceptar el reto,  dirigite a la aplicación FUTPLAY busca en retos recibidos y decide aceptar o cancelar el reto.",
        footer: "¡Hay un reto esperándote!"
    }}





    break;
// RESERVACION CONFIRMADA
    case 2: 
    body = {body: {
        email:  $email,
        body: "Se ha confirmado un reto para el día " +  $fecha +" en  la cancha " +  $cancha +  this.tConvert($hora.split(" ")[1]) + ". Los equipos que disputarán este reto son " +  $rival +" y " +  $retador + ".",
        footer: "¡Hay un reto esperándote!"
    }

  }
    break;

// RESERVACION CANCELADA  CUANDO SE ELIMINA LA RESERVACION
    case 3:
      body = {body: {
        email: $email,
        body: "Se ha cancelado el reto  del día " +  $fecha +" en  la cancha " +  $cancha + " " + this.tConvert($hora.split(" ")[1]) + ".",
        footer: "Lamentamos lo sucedido,"
    }
  }
    break;

    default:

    return false
  }
 return await this.syncPostReservacionEmail(body);
}

tConvert (timeString) {
  const [hourString, minute] = timeString.split(":");
  const hour = +hourString % 24;
  return (hour % 12 || 12) + ":" + minute + (hour < 12 ? "AM" : "PM");

}

}
