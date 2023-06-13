import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Cantones } from '../models/cantones';
import { AlertasService } from './alertas.service';

@Injectable({
  providedIn: 'root'
})
export class CantonesService {
  cantones: Cantones[]=[];

  constructor(
    private http: HttpClient,
    public aslertasService: AlertasService
    
    ) { }

  getURL( api: string  ){
    let test: string = ''
    if ( !environment.prdMode ) {
      test = environment.TestURL;
    }

    const URL = environment.preURL  + test +  environment.postURL + api ;

    return URL;
  }
  private getCantones( provincia){
    let URL = this.getURL( environment.getCantonesURL);
    URL = URL + provincia;
    console.log(URL, 'URL')
    return this.http.get<Cantones[]>( URL );
  }

  syncCantones(provincia){

    return this.getCantones(provincia).toPromise();
  }
  syncCantonesToPromise(provincia){

    return this.getCantones(provincia).toPromise();
  }
}
