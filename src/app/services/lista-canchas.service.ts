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

    getURL( api: string ){
      let test: string = ''
      if ( !environment.prdMode ) {
        test = environment.TestURL;
      }
      const URL = environment.preURL  + test +  environment.postURL + api 
      console.log(URL)
      return URL;
    }
  
    private getCanchas(){
      const URL = this.getURL( environment.canchasURL);
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


    private filtrarCanchas( Cod_Provincia: number, Cod_Canton:number,Cod_Distrito:number,Precio_Hora:number){

      let URL = this.getURL( environment.fitrarCanchas);
     let params = environment.Cod_Provincia+ Cod_Provincia + environment.Cod_Canton_Param+ Cod_Canton +
                  environment.Cod_Distrito_Param+ Cod_Distrito + environment.Precio_Hora_Param+ Precio_Hora
      URL = URL+ params
  
      console.log(URL,'filtro Usuarios ')
  
      return this.http.get<ListaCanchas[]>( URL );
    }
  
     syncfiltrarCanchas( Cod_Provincia: number, Cod_Canton:number,Cod_Distrito:number,Precio_Hora:number){
   
  this.filtrarCanchas(Cod_Provincia,Cod_Canton,Cod_Distrito,Precio_Hora).subscribe(
  
    resp =>{
  this.canchas = [];
      this.canchas = resp.slice(0);
  
      console.log(this.canchas,'canchas')
  
  
    }
  
  );
    }
  
}
