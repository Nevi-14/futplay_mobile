import { Injectable } from '@angular/core';
import { Provincia } from '../models/provincia';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProvinciasService {

  provincias:  Provincia[]=[];
  constructor( private http: HttpClient) { }

  getProvincias(){
    this.http.get<Provincia[]>('/assets/json/provincias.json').subscribe(resp=>{
    if(resp){
     this.provincias = resp;
    }else{
      console.log('Error cargando provincias');
    }
   });
 }
}
