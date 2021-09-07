
import { Injectable } from '@angular/core';
import { Provincia } from '../models/provincia';
import { Canton } from '../models/canton';
import { Distrito } from '../models/distrito';
import { HttpClient } from '@angular/common/http';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  roles: Role[]=[];
  provincias: Provincia[] =[];
  cantones: Canton[] =[];
  distritos: Distrito[] =[];
  constructor( private http: HttpClient) { }

  getRoles(){
    this.http.get<Role[]>('/assets/json/roles.json').subscribe(resp=>{
    if(resp){
     this.roles = resp;
    }else{
      console.log('Error cargando roles');
    }
   });
 }

  getProvincias(){
     this.http.get<Provincia[]>('/assets/json/provincias.json').subscribe(resp=>{
     if(resp){
      this.provincias = resp;
     }else{
       console.log('Error cargando provincias');
     }
    });
  }

  getCantones(){
    return this.http.get<Canton[]>('/assets/json/cantones.json').subscribe(resp=>{
      if(resp){
        this.cantones = resp;
       }else{
         console.log('Error cargando cantones');
       }
     });
  }

  getDistritos(){
    return this.http.get<Distrito[]>('/assets/json/distritos.json').subscribe(resp=>{
      if(resp){
        this.distritos = resp;
       }else{
         console.log('Error cargando distritos');
       }
     });;
  }



}
