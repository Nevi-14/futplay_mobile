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

    return URL;
  }

  getURL2( api: string){
    let test: string = ''
    if ( !environment.prdMode ) {
      test = environment.TestURL;
    }
    const URL = environment.preURL  + test +  environment.postURL + api

    return URL;
  }
  private getRetosEnviados(Cod_Usuario){
    var today = new Date();

    const Fecha_Inicio = today.getFullYear()+'-'+(today.getMonth() +1) +'-'+today.getDate();
    let URL = this.getURL( environment.reservacionesEnviadasUrl,Cod_Usuario);
        URL = URL + environment.Fecha_Inicio +Fecha_Inicio
        console.log(URL);
    return this.http.get<GestionRetos[]>( URL );
  }

  private getRetosRecibidos( Cod_Usuario){
    var today = new Date();

    const Fecha_Inicio = today.getFullYear()+'-'+(today.getMonth() +1) +'-'+today.getDate();
    let URL = this.getURL( environment.reservacionesRecibidasUrl,Cod_Usuario);
    URL = URL + environment.Fecha_Inicio +Fecha_Inicio
    console.log(URL);
    return this.http.get<GestionRetos[]>( URL );
  }
  private getRetosConfirmadas( Cod_Usuario){
    var today = new Date();

    const Fecha_Inicio = today.getFullYear()+'-'+(today.getMonth() +1) +'-'+today.getDate();

    let URL = this.getURL( environment.reservacionesConfirmadasUrl,Cod_Usuario);
    URL = URL + environment.Fecha_Inicio +Fecha_Inicio
    console.log(URL);
    return this.http.get<GestionRetos[]>( URL );
  }

  private getRetosHistorial( Cod_Usuario){
    var today = new Date();

    const Fecha_Inicio = today.getFullYear()+'-'+(today.getMonth() +1) +'-'+today.getDate();

    let URL = this.getURL( environment.reservacionesHistorialUrl,Cod_Usuario);
    URL = URL + environment.Fecha_Inicio +Fecha_Inicio
    console.log(URL);
    return this.http.get<GestionRetos[]>( URL );
  }

  private GetReservacion(Cod_Reservacion){

    let URL =  this.getURL2(environment.reservacionURL);
        URL = URL + environment.codReservacion + Cod_Reservacion;
        return this.http.get<GestionRetos>( URL );
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

      syncGetReservacionToPromise(Cod_Reservacion){

  return this.GetReservacion(Cod_Reservacion).toPromise();
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

            
  syncRetosHistorial(Cod_Usuario){

    this.aslertasService.presentaLoading('Cargando lista de retos')
    this.retos = [];
    
        this.getRetosHistorial(Cod_Usuario).subscribe(
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

      private   deleteReservacion(Cod_Reservacion ){
  

        let URL = this.getURL( environment.reservacionesUrl,'');
            URL = URL + environment.codReservacion + Cod_Reservacion;
    
    
        const options = {
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Access-Control-Allow-Origin': '*'
          }
    
          
        };
     
        return this.http.delete( URL, options );
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
      deleteReservacionToPromise(reservacion  ){
        return this.deleteReservaciones( reservacion.Cod_Reservacion ).toPromise();
      }
      private   deleteConfirmacionReservacion(Cod_Reservacion ){
  

        let URL = this.getURL2( environment.confirmacionReservacionesURL);
            URL = URL + environment.codReservacion + Cod_Reservacion;
    
    
        const options = {
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Access-Control-Allow-Origin': '*'
          }
    
          
        };
     
        return this.http.delete( URL, options );
      }
      syncDeleteConfirmacionReservacion(reservacion  ){
        return this.deleteConfirmacionReservacion( reservacion.Cod_Reservacion ).toPromise();
      }
}
