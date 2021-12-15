import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';



import { ModalController } from '@ionic/angular';
import { SolicitudClubes } from '../models/solicitudesClubes';
import { JugadoresEquiposService } from './jugadoresEquipos.service';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {

  solicitudes:  SolicitudClubes[]=[];
  conteoClub = 0;
  constructor( private http: HttpClient, private jugadoresClubes: JugadoresEquiposService, public modalCtrl: ModalController) { }



  addClubPlayer(solicitud){
    this.jugadoresClubes.add(solicitud.usuarioID,solicitud.clubID,new Date, false);
    this.delete(solicitud.solicitudID);
      }

  getSolicitudes(){
    this.http.get<SolicitudClubes[]>('/assets/json/solicitudes.json').subscribe(resp=>{
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
    this.solicitudes.splice(index,1);
   }
      }
      this.conteoClub = 0 ? 0 : this.conteoClub -1;
    }






        eliminarSolicitud(solicitudId: number){
          console.log(solicitudId);
          this.delete(solicitudId);
          console.log(this.solicitudes);
         
          
        }
  
  
        agregarUsuarioSolitud(solicitud){
 
          //    this.jugadoresClubesService.add(solicitud.usuarioID,solicitud.clubID, new Date(), true);
            //  console.log(this.jugadoresClubesService.jugadoresClubes)
              //this.delete(solicitud.solicitudID);
           //   this.clubsService.clubCount(solicitud.solicitudID);
     
                }
          

  mostrarSolicitudesClubes(clubID){
this.conteoClub = 0;
this.solicitudes.forEach( solicitud => {

  if(clubID === solicitud.equipoID){

    this.conteoClub ++
  }
})


                }

}
