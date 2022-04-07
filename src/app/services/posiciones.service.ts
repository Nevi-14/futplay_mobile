import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Posiciones } from '../models/posiciones';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PosicionesService {
  posiciones:  Posiciones[]=[];
  constructor( private http: HttpClient) { }

  
  getURL( api: string ){

    let test: string = ''
    if ( !environment.prdMode ) {
      test = environment.TestURL;
    }
    const URL = environment.preURL  + test +  environment.postURL + api 
    return URL;

  }
  private getPosiciones( ){
    let URL = this.getURL( environment.posicionesURL);
  console.log(URL,'URL POS')
      return this.http.get<Posiciones[]>( URL );
    }
    syncPosiciones(){

      this.getPosiciones().subscribe(
        resp =>{
          this.posiciones = resp.slice(0);
       
  
        }
  
      );
    }
  


}
