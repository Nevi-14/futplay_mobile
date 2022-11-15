import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Distritos } from '../models/distritos';
import { AlertasService } from './alertas.service';


@Injectable({
  providedIn: 'root'
})
export class DistritosService {

  distritos: Distritos[]=[];
  constructor(
    private http: HttpClient,
    public aslertasService: AlertasService
    
    ) { }

  getURL( api: string ){
    let test: string = ''
    if ( !environment.prdMode ) {
      test = environment.TestURL;
    }

    const URL = environment.preURL  + test +  environment.postURL + api 

    return URL;
  }
  private getDistritos(canton ){
    let URL = this.getURL( environment.getDistritosURL);
    URL = URL + canton;
    console.log(URL, 'URL')
    return this.http.get<Distritos[]>( URL );
  }

  syncDistritos(canton){

    return this.getDistritos(canton).toPromise();
  }
}
