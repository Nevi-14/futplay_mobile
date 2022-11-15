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
    const URL = this.getURL( environment.getProvinciasURL,'');
    return this.http.get<Provincias[]>( URL );
  }

  syncProvincias(){
console.log('prinvicias')

    this.getProvincias().subscribe(
      resp =>{

        console.log(resp,'prinvicias')
        this.provincias = resp.slice(0);
       

      }, error =>{

        if(error){
          this.aslertasService.loadingDissmiss();
      

        }
      }

    );
  }

  async syncProvinciasPromise(){
    
    
    return    this.getProvincias().toPromise();
      }
}
