import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CodigosDescuento } from '../models/codigoDescuento';

@Injectable({
  providedIn: 'root'
})
export class CodigosDescuentosService {

  constructor(
  public http:HttpClient  
  ) { }

  getURL( api: string ){

    let test: string = ''
    if ( !environment.prdMode ) {
      test = environment.TestURL;
      
    }
  const URL = environment.preURL  + test +  environment.postURL + api;
    return URL;
  }
  private getDescuento( Codigo_Descuento:string){
    let URL = this.getURL( environment.getCodigosDesciuentosURL);
        URL = URL + Codigo_Descuento

        console.log(URL, 'URL ')
    return this.http.get<CodigosDescuento[]>( URL );
  }
 
 getDescuentoToPromise(Codigo_Descuento:string){
return   this.getDescuento(Codigo_Descuento).toPromise();
 }
}
