import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Email } from '../models/email';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(
    
    private http: HttpClient
    
    
    ) { }

  getURL( api:string ){
    let test: string = ''
    if ( !environment.prdMode ) {
      test = environment.TestURL;
    }

    const URL = environment.preURL  + test +  environment.postURL + api;

    return URL;
  }


      // POST CANCHA

      private postEmail (bloqueo){
        const URL = this.getURL( environment.apiCorreoURL);
        const options = {
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Access-Control-Allow-Origin': '*'
          }
        };
       
        return this.http.post( URL, JSON.stringify(bloqueo), options );
      }
    
      syncPostEmail(email:Email){


      return   this.postEmail(email).toPromise();
      }



}
