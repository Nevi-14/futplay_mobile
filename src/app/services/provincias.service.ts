import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Provincias } from '../models/provincias';

@Injectable({
  providedIn: 'root'
})
export class ProvinciasService {

  provincias:  Provincias[]=[];
  constructor( private http: HttpClient) { }

  getProvincias(){
    this.http.get<Provincias[]>('/assets/json/provincias.json').subscribe(resp=>{
    if(resp){
     this.provincias = resp;
    }else{
      console.log('Error cargando provincias');
    }
   });
 }
}
