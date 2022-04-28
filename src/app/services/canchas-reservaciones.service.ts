import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Canchas } from '../models/canchas';
import { CanchasService } from './canchas.service';
import { ReservacionesService } from 'src/app/services/reservaciones.service';

@Injectable({
  providedIn: 'root'
})
export class CanchasReservacionesService {
  canchaActual:Canchas
  
  //  DATOS RESERVACIONES POR CANCHA




  constructor(private http: HttpClient, public router: Router, public canchasService: CanchasService, public reservacionesService: ReservacionesService) { }
  getURL( api: string,id: string ){
    let test: string = ''
    if ( !environment.prdMode ) {
      test = environment.TestURL;
    }
    const URL = environment.preURL  + test +  environment.postURL + api + environment.codCanchaParam + id;
console.log(URL);
    return URL;
  }


  deleteURL( api: string,id: string ){
    let test: string = ''
    if ( !environment.prdMode ) {
      test = environment.TestURL;
    }
    const URL = environment.preURL  + test +  environment.postURL + api + environment.codReservacion + id;
console.log(URL);
    return URL;
  }


  


  getURLPUT( api: string , Cod_Usuario : number, Cod_Reservacion : number){
    let test: string = ''
    if ( !environment.prdMode ) {
      test = environment.TestURL;
    }
 // PUT: api/reservaciones/?Cod_Usuario= 2&Cod_Reservacion=1   ACTUALIZAR RESERVACION

    const URL = environment.preURL  + test +  environment.postURL + api + environment.codUsuarioParam + Cod_Usuario + environment.codReservacionParam + Cod_Reservacion;
console.log(URL, 'put');
    return URL;
    
  }





    //
    private   putReservaciones( reservacion, Cod_Usuario, Cod_Reservacion ){
      const URL = this.getURLPUT( environment.reservacionesUrl, Cod_Usuario, Cod_Reservacion);
      const options = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
      };
     
   
      return this.http.put( URL, JSON.stringify(reservacion), options );
    }

     actualizarReservacion(reservacion, Cod_Usuario, Cod_Reservacion  ){
      this.putReservaciones( reservacion, Cod_Usuario, Cod_Reservacion ).subscribe(
        resp => {
              
          this.reservacionesService.syncReservacionesCanchaActual(reservacion.Cod_Cancha)
       
         console.log('completed')
        }, error => {
          console.log('error')
        }
      )
    }
   




    private   deleteReservaciones(Cod_Reservacion ){
  

      const URL = this.deleteURL( environment.reservacionesUrl, Cod_Reservacion);
      const options = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }

        
      };
     
   
      return this.http.delete( URL, options );
    }
    
    
    
    deleteReservacion(Cod_Reservacion  ){
      this.deleteReservaciones( Cod_Reservacion ).subscribe(
        resp => {
              
          this.reservacionesService.syncReservacionesCanchaActual(Cod_Reservacion)
       
         console.log('deleted')
        }, error => {
          console.log('error')
        }
      )
    }
   



}
