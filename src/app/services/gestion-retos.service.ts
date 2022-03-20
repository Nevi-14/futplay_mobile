import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { GestionRetos } from '../models/gestionRetos';
import { AlertasService } from './alertas.service';

@Injectable({
  providedIn: 'root'
})
export class GestionRetosService {
retos :GestionRetos[] = [];


  constructor(
    public http: HttpClient,
    public aslertasService: AlertasService
  ) { }

  getURL( api: string,id: string ){
    let test: string = ''
    if ( !environment.prdMode ) {
      test = environment.TestURL;
    }
    const URL = environment.preURL  + test +  environment.postURL + api + environment.codUsuarioParam + id;
console.log(URL);
    return URL;
  }
  private getRetosEnviados(Cod_Usuario){
    const URL = this.getURL( environment.reservacionesEnviadasUrl,Cod_Usuario);
    return this.http.get<GestionRetos[]>( URL );
  }

  private getRetosRecibidos( Cod_Usuario){
    const URL = this.getURL( environment.reservacionesRecibidasUrl,Cod_Usuario);
    return this.http.get<GestionRetos[]>( URL );
  }
  private getRetosConfirmadas( Cod_Usuario){
    const URL = this.getURL( environment.reservacionesConfirmadasUrl,Cod_Usuario);
    return this.http.get<GestionRetos[]>( URL );
  }

  syncRetosEnviados(Cod_Usuario){
this.retos = [];

this.aslertasService.presentaLoading('Cargando lista de retos')
    this.getRetosEnviados(Cod_Usuario).subscribe(
      resp =>{

        console.log(resp)
        this.retos = resp.slice(0);
this.aslertasService.loadingDissmiss();
      }, error =>{

        if(error){
          this.aslertasService.loadingDissmiss();
          this.aslertasService.message('FUTPLAY', 'Error cargando retos');

        }
      }

    );
  }

  syncRetosRecibidos(Cod_Usuario){
    this.retos = [];
    this.aslertasService.presentaLoading('Cargando lista de retos')
        this.getRetosRecibidos(Cod_Usuario).subscribe(
          resp =>{
    
            console.log(resp)
            this.retos = resp.slice(0);
    this.aslertasService.loadingDissmiss();
          }, error =>{
    
            if(error){
              this.aslertasService.loadingDissmiss();
              this.aslertasService.message('FUTPLAY', 'Error cargando retos');
    
            }
          }
    
        );
      }


      
  syncRetosConfirmados(Cod_Usuario){

    this.aslertasService.presentaLoading('Cargando lista de retos')
    this.retos = [];
    
        this.getRetosConfirmadas(Cod_Usuario).subscribe(
          resp =>{
    
            console.log(resp)
            this.retos = resp.slice(0);
    this.aslertasService.loadingDissmiss();
          }, error =>{
    
            if(error){
              this.aslertasService.loadingDissmiss();
              this.aslertasService.message('FUTPLAY', 'Error cargando provincias');
    
            }
          }
    
        );
      }
}
