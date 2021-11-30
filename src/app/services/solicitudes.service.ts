import { Injectable } from '@angular/core';
import { Solicitud } from '../models/solicitudes';
import { HttpClient } from '@angular/common/http';
import { JugadoresService } from './jugadores.service';
import { JugadoresClubesService } from './jugador-clubes.service';
import { ClubService } from './club.service';
import { ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {

  solicitudes:  Solicitud[]=[];
  conteoClub = 0;
  constructor( private http: HttpClient, private jugadoresClubes: JugadoresClubesService, public modalCtrl: ModalController, public jugadoresClubesService: JugadoresClubesService) { }



  addClubPlayer(solicitud){
    this.jugadoresClubes.add(solicitud.usuarioID,solicitud.clubID,new Date, false);
    this.delete(solicitud.solicitudID);
      }

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
 
              this.jugadoresClubesService.add(solicitud.usuarioID,solicitud.clubID, new Date(), true);
              console.log(this.jugadoresClubesService.jugadoresClubes)
              this.delete(solicitud.solicitudID);
           //   this.clubsService.clubCount(solicitud.solicitudID);
     
                }
          

}
