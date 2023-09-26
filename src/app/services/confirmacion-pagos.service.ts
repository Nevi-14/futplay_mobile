import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ConfirmacionPagos } from '../models/confirmacionPagos';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfirmacionPagosService {

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


  private postVerificacionPago(pago:ConfirmacionPagos){

    let URL = this.getURL(environment.postVerificacionPagoURL);
    const options   = {
      headers: {
        'enctype': 'multipart/form-data;',
        'Accept': 'plain/text',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
        'Access-Control-Allow-Headers': 'Authorization, Origin, Content-Type, X-CSRF-Token',
        
      }
    };
    return this.http.post(URL,pago, options);
  }
  private getConfirmacionPago( Cod_Reservacion:number){
    let URL = this.getURL( environment.getVerificacionPagoURL);
        URL = URL + Cod_Reservacion

        console.log(URL, 'URL ')
    return this.http.get<ConfirmacionPagos[]>( URL );
  }
 
 getConfirmacionPagoToPromise(Cod_Reservacion:number){
return   this.getConfirmacionPago(Cod_Reservacion).toPromise();
 }
  postVerificacionPagoToPromise(pago:ConfirmacionPagos){
    return this.postVerificacionPago(pago).toPromise();
  }

  private putVerificacionPago(pago:ConfirmacionPagos){

    let URL = this.getURL(environment.putVerificacionPagoURL);
    URL = URL + pago.Cod_Equipo + '/' + pago.Cod_Reservacion
    const options   = {
      headers: {
        'enctype': 'multipart/form-data;',
        'Accept': 'plain/text',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
        'Access-Control-Allow-Headers': 'Authorization, Origin, Content-Type, X-CSRF-Token',
        
      }
    };
    return this.http.put(URL,JSON.stringify(pago), options);
  }
 
  putVerificacionPagoToPromise(pago:ConfirmacionPagos){
    return this.putVerificacionPago(pago).toPromise();
  }


}
