import { Injectable } from '@angular/core';
import { Retos } from '../models/retos';
import { Club } from '../models/club';

@Injectable({
  providedIn: 'root'
})
export class RetosService {
retos: Retos[]=[];
rival1: Club
rival2: Club
cancha = '';
eventos=[];
guardar = false;
  constructor() { }



  addReto(retoID,usuarioID,clubID1,clubID2,confirmacion1,confirmacion2){
    this.retos.push(new Retos(retoID,usuarioID,clubID1,clubID2,confirmacion1,confirmacion2));
  }


}
