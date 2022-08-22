import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FacturaDetaleReservaciones } from '../models/facturaDetalleReservaciones';
import { AlertasService } from './alertas.service';

@Injectable({
  providedIn: 'root'
})
export class FacturacionService {
  
  constructor(private http: HttpClient, public alertasService:AlertasService) { }

  getURL( api: string ){
    let test: string = ''
    if ( !environment.prdMode ) {
   test = environment.TestURL;
    }
  const URL = environment.preURL  + test +  environment.postURL + api 
 
    return URL;
  }

  private facturaPost(factura:FacturaDetaleReservaciones){

    const URL = this.getURL(environment.generarFacturaURL);

    const options   = {
      headers: {
        'Content-type':'application/json',
        'Accept':'application/json',
        'Acess-Control-Allow-Origin':'*'
      }
    };
  
    return this.http.post(URL,JSON.stringify(factura), options);
  
  
  }
syncFacturaPost(factura:FacturaDetaleReservaciones){
 return  this.facturaPost(factura).toPromise();
}


private consultarFacturaGet( Cod_Reservacion ){

  let URL = this.getURL( environment.consultaeFacturaURL);
  let test: string = ''
  if ( !environment.prdMode ) {
    test = environment.TestURL;
  }
   URL = URL + environment.codReservacion + Cod_Reservacion
  console.log(URL,'URL')
  return this.http.get<FacturaDetaleReservaciones>( URL );
}

syncConsultarFacturaGet(Cod_Reservacion){


  return this.consultarFacturaGet(Cod_Reservacion).toPromise();

 }
}
