import { Injectable } from '@angular/core';
import { Retos } from '../models/retos';

@Injectable({
  providedIn: 'root'
})
export class RetosService {
retos: Retos[]=[];
  constructor() { }



  addReto(retoID,usuarioID,clubID1,clubID2,confirmacion1,confirmacion2){
    this.retos.push(new Retos(retoID,usuarioID,clubID1,clubID2,confirmacion1,confirmacion2));
  }


}
