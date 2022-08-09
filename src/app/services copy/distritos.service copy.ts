import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Distritos } from '../models/distritos';

@Injectable({
  providedIn: 'root'
})
export class DistritosService {
  distritos:  Distritos[]=[];
  constructor( private http: HttpClient) { }

  getDistritos(){
    this.http.get<Distritos[]>('/assets/json/distritos.json').subscribe(resp=>{
    if(resp){
     this.distritos = resp;
    }else{
      console.log('Error distritos');
    }
   });
 }
}
