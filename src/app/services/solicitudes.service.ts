import { Injectable } from '@angular/core';
import { Solicitud } from '../models/solicitudes';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {

  solicitudes:  Solicitud[]=[];
  constructor( private http: HttpClient) { }

  getSolicitudes(){
    this.http.get<Solicitud[]>('/assets/json/solicitudes.json').subscribe(resp=>{
    if(resp){
     this.solicitudes = resp;
    }else{
      console.log('Error clubes roles');
    }
   });
 }

 delete(solicitudID: number){

  for( let index = 0; index < this.solicitudes.length ; index++){   
  if(this.solicitudes[index].solicitudID === solicitudID){
    this.solicitudes.splice(index,1)
   }
      }
    }

}
