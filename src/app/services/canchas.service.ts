import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Canchas } from '../models/canchas';
import { ListaCanchas } from '../models/listaCanchas';
import { AlertasService } from './alertas.service';

@Injectable({
  providedIn: 'root'
})
export class CanchasService {
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

      console.log(URL,'canchasss')
      return this.http.get<ListaCanchas[]>( URL );
    }

    syncCanchas(){

      this.canchas = [];
  
     // this.alertasService.presentaLoading('Cargando lista de canchas')
      this.getCanchas().subscribe(
        resp =>{
       //   this.alertasService.loadingDissmiss();
  
          this.canchas = resp.slice(0);
  
          console.log(this.canchas, 'canchas')
  
  
        }, error =>{
          this.alertasService.message('FUTPLAY', 'Error cargando canchas..')
         // this.alertasService.loadingDissmiss();
        }
  
      );
    }
  

    private filtrarCanchas( Cod_Provincia: number, Cod_Canton:number,Cod_Distrito:number,Cod_Categoria:number){

      let URL = this.getURL( environment.fitrarCanchas);
     let params = environment.Cod_Provincia+ Cod_Provincia + environment.Cod_Canton_Param+ Cod_Canton +
                  environment.Cod_Distrito_Param+ Cod_Distrito + environment.Cod_Categoria_Param+ Cod_Categoria
      URL = URL+ params
  
      console.log(URL,'filtro Usuarios ')
  
      return this.http.get<ListaCanchas[]>( URL );
    }
  
     syncfiltrarCanchas( Cod_Provincia: number, Cod_Canton:number,Cod_Distrito:number,Cod_Categoria:number){
   
  this.filtrarCanchas(Cod_Provincia,Cod_Canton,Cod_Distrito,Cod_Categoria).subscribe(
  
    resp =>{
  this.canchas = [];
      this.canchas = resp.slice(0);
  
      console.log(this.canchas,'canchas')
  
  
    }
  
  );
    }


}
