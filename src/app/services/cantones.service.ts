import { Injectable } from '@angular/core';
import { Canton } from '../models/canton';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CantonesService {

  cantones:  Canton[]=[];
  constructor( private http: HttpClient) { }

  getCantones(){
    this.http.get<Canton[]>('/assets/json/cantones.json').subscribe(resp=>{
    if(resp){
     this.cantones = resp;
    }else{
      console.log('Error cantones');
    }
   });
 }
}
