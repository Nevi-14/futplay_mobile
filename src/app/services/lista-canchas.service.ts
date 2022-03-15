import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { ListaCanchas } from '../models/listaCanchas';
import { Canchas } from '../models/canchas';
import { HttpClient } from '@angular/common/http';
import { AlertasService } from './alertas.service';

@Injectable({
  providedIn: 'root'
})
export class ListaCanchasService {
  canchas: ListaCanchas[]=[];
  canchasFavoritas: Canchas[]=[];
  constructor(
    private http: HttpClient,
    public alertasService: AlertasService
    ) { }

    getURL( api: string,id: string ){
      let test: string = ''
      if ( !environment.prdMode ) {
        test = environment.TestURL;
      }
      const URL = environment.preURL  + test +  environment.postURL + api + id
      console.log(URL)
      return URL;
    }
  
    private getCanchas(){
      const URL = this.getURL( environment.canchasURL,'');
      return this.http.get<ListaCanchas[]>( URL );
    }

    syncCanchas(){

      this.canchas = [];
  
  this.alertasService.presentaLoading('Buscando canchas')
      this.getCanchas().subscribe(
        resp =>{
          
          this.alertasService.loadingDissmiss();
  
          this.canchas = resp.slice(0);
  
          console.log(this.canchas, 'canchas')
  
  
        }
  
      );
    }
  
}
