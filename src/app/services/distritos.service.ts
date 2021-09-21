import { Injectable } from '@angular/core';
import { Distrito } from '../models/distrito';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DistritosService {
  distritos:  Distrito[]=[];
  constructor( private http: HttpClient) { }

  getDistritos(){
    this.http.get<Distrito[]>('/assets/json/distritos.json').subscribe(resp=>{
    if(resp){
     this.distritos = resp;
    }else{
      console.log('Error distritos');
    }
   });
 }
}
