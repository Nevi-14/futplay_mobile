import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Posiciones } from '../models/posiciones';

@Injectable({
  providedIn: 'root'
})
export class PosicionesService {
  posiciones:  Posiciones[]=[];
  constructor( private http: HttpClient) { }

  getPosiciones(){
    this.http.get<Posiciones[]>('/assets/json/posiciones.json').subscribe(resp=>{
    if(resp){
     this.posiciones = resp;
    }else{
      console.log('Error cargando posiciones');
    }
   });
 }
}
