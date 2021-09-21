import { Injectable } from '@angular/core';
import { Posicion } from '../models/posicion';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PosicionesService {
  posiciones:  Posicion[]=[];
  constructor( private http: HttpClient) { }

  getPosiciones(){
    this.http.get<Posicion[]>('/assets/json/posiciones.json').subscribe(resp=>{
    if(resp){
     this.posiciones = resp;
    }else{
      console.log('Error cargando posiciones');
    }
   });
 }
}
