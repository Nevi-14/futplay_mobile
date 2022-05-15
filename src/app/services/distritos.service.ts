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

  getURL( api: string, provincia: string, canton: string ){
    let test: string = ''
    if ( !environment.prdMode ) {
      test = environment.TestURL;
    }

    const URL = environment.preURL  + test +  environment.postURL + api + environment.Cod_Provincia + provincia+ environment.Cod_Canton_Param + canton
console.log(URL);
    return URL;
  }
  private getDistritos(provincia,canton ){
    const URL = this.getURL( environment.distritosURL,provincia,canton);
    return this.http.get<Distritos[]>( URL );
  }

  syncDistritos(provincia,canton){

    return this.getDistritos(provincia,canton).toPromise();
  }
}
