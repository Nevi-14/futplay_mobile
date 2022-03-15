import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Provincias } from '../models/provincias';
import { AlertasService } from './alertas.service';
@Injectable({
  providedIn: 'root'
})
export class ProvinciasService {
  provincias: Provincias[]=[];


  constructor(
    
    private http: HttpClient,
    public aslertasService:AlertasService
    
    
    ) { }

  getURL( api: string,id: string ){
    let test: string = ''
    if ( !environment.prdMode ) {
      test = environment.TestURL;
    }

    const URL = environment.preURL  + test +  environment.postURL + api + id;
console.log(URL);
    return URL;
  }
  private getProvincias( ){
    const URL = this.getURL( environment.provinciasURL,'');
    return this.http.get<Provincias[]>( URL );
  }

  syncProvincias(){


    this.getProvincias().subscribe(
      resp =>{

        console.log(resp)
        this.provincias = resp.slice(0);

      }, error =>{

        if(error){

          this.aslertasService.message('FUTPLAY', 'Error cargando provincias');

        }
      }

    );
  }
}
