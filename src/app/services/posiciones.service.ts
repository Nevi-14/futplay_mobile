import { Injectable } from '@angular/core';
import { Posicion } from '../models/posicion';

@Injectable({
  providedIn: 'root'
})
export class PosicionesService {
  posiciones:  Posicion[]=[];
  constructor() { }

  constructor( private http: HttpClient) { }

  getClubs(){
    this.http.get<Posicion[]>('/assets/json/posiciones.json').subscribe(resp=>{
    if(resp){
     this.posiciones = resp;
    }else{
      console.log('Error cargando posiciones');
    }
   });
 }
}
