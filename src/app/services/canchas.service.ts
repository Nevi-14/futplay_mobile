import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Canchas } from '../models/canchas';
import { ListaCanchas } from '../models/listaCanchas';

@Injectable({
  providedIn: 'root'
})
export class CanchasService {
  canchas: ListaCanchas[]=[];
  canchasFavoritas: Canchas[]=[];
  constructor(
    private http: HttpClient
    ) { }





    getURL( api: string ){
      let test: string = ''
      if ( !environment.prdMode ) {
        test = environment.TestURL;
      }
      const URL = environment.preURL  + test +  environment.postURL + api 
      console.log(URL)
      return URL;
    }
    private getCodCancha( Cod_Cancha ){

      let URL = this.getURL( environment.perfilCancha);
      let test: string = ''
      if ( !environment.prdMode ) {
        test = environment.TestURL;
      }
       URL = URL + environment.codCanchaParam + Cod_Cancha
      console.log(URL,'URL')
      return this.http.get<ListaCanchas[]>( URL );
    }

     syncCodCancha(Cod_Cancha){

  
 
      return this.getCodCancha(Cod_Cancha).toPromise();
 
     }
    async syncCodCancha2(Cod_Cancha){

     let cancha : ListaCanchas[];

      this.getCodCancha(Cod_Cancha).subscribe(
        resp =>{

          cancha = resp.slice(0);
          console.log(cancha,'cancha')
          return cancha
          
          
  
  
        }, error =>{

          cancha = null
          console.log(error)
          return cancha
        }

       
  
      );

      await cancha

    }


  
    private getCanchas(){
      const URL = this.getURL( environment.canchasURL);
      return this.http.get<ListaCanchas[]>( URL );
    }

    syncCanchas(){

      this.canchas = [];
  
  
      this.getCanchas().subscribe(
        resp =>{
          
  
          this.canchas = resp.slice(0);
  
          console.log(this.canchas, 'canchas')
  
  
        }
  
      );
    }
  



}
