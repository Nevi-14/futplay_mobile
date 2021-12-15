import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cantones } from '../models/cantones';

@Injectable({
  providedIn: 'root'
})
export class CantonesService {

  cantones:  Cantones[]=[];
  constructor( private http: HttpClient) { }

  getCantones(){
    this.http.get<Cantones[]>('/assets/json/cantones.json').subscribe(resp=>{
    if(resp){
     this.cantones = resp;
    }else{
      console.log('Error cantones');
    }
   });
 }
}
