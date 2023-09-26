import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(
    public http: HttpClient,
    public translateService: TranslateService
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
 body = {
      email:  $email,
      header: 'FUTPLAY',
      subject: this.translateService.instant('NEW_CHALLENGE_RECEIVED'),
      message: this.translateService.instant('YOU_HAVE_RECEIVED_A_NEW_CHALLENGE_PLEASE_CHECK_YOUR_CHALLENGES_RECEIVED_SECTION_IN_THE_APP_AND_ACCEPT_OR_DECLINE_THE_CHALLENGE'),
    };

    break;
// RESERVACION CONFIRMADA
    case 2: 
    body = {
      email:  $email,
      header: 'FUTPLAY',
      subject: this.translateService.instant('CHALLENGE_CONFIRMED'),
      message:  this.translateService.instant('YOUR_CHALLENGE_HAS_BEEN_CONFIRMED_PLEASE_CHECK_YOUR_CHALLENGES_RECEIVED_SECTION_IN_THE_APP_AND_FINISH_THE_PAYMENT_TO_COMPLETE_THE_CHALLENGE'),
    };
    break;
// RESERVACION CANCELADA  CUANDO SE ELIMINA LA RESERVACION
    case 3:
      body = {
        email:  $email,
        header: 'FUTPLAY',
        subject: this.translateService.instant('CHALLENGE_CANCELED'),
        message: this.translateService.instant('YOUR_CHALLENGE_HAS_BEEN_CANCELED'),
      };
 
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
