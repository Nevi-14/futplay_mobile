import { Injectable } from '@angular/core';
import { Equipos } from '../models/equipos';
import { Reservaciones } from '../models/reservaciones';


interface ListaDeTetos {

  
}
@Injectable({
  providedIn: 'root'
})
export class ReservacionesService {

event = {
    title: '',
    desc:'',
    startTime:null,
    endTime:null,
    allDay: false,
    date: new Date()
  }

retos: Reservaciones[]=[];
rival1: Equipos
rival2: Equipos
cancha = '';
eventos=[];
guardar = false;
  constructor() { }



  addReto(retoID,usuarioID,clubID1,clubID2,confirmacion1,confirmacion2){
    //this.retos.push(new Reservaciones(retoID,usuarioID,clubID1,clubID2,confirmacion1,confirmacion2));
  }


}
