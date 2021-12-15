import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalController, PopoverController } from '@ionic/angular';
import { SolicitudesService } from './solicitudes.service';
import { ClubInfoComponent } from '../components/club-info/club-info.component';
import { EquipoSolicitudPage } from '../pages/equipo-solicitud/equipo-solicitud.page';
import { Equipos } from '../models/equipos';

import { ReservacionesService } from './reservaciones.service';
import { UsuariosService } from './usuarios.service';
import { JugadoresEquiposService } from './jugadoresEquipos.service';

@Injectable({
  providedIn: 'root'
})
export class EquiposService {
  new = false
  clubPlayer = false;
  clubAdmin = false;
  club: Equipos[] = [];
  userclubs: Equipos[] = [];
  playerClubs: Equipos[] = [];
  switchClub: Equipos;
  constructor(private http: HttpClient, private popOverCtrl: PopoverController, private userService: UsuariosService, private solicitudes: SolicitudesService, private jugadores: JugadoresEquiposService, private modalCtrl: ModalController , public retosService: ReservacionesService) { }

  getClubs() {
    this.http.get<Equipos[]>('/assets/json/clubs.json').subscribe(resp => {
      if (resp) {
        this.club = resp;
      } else {
        console.log('Error clubes roles');
      }
    });
  }
  swapClub(equipoID: number) {
   

    for (let i = 0; i < this.club.length; i++) {
    //  console.log([equipoID, this.club[i]])
      if (this.club[i].equipoID === equipoID) {
        this.switchClub = this.club[i];
        this.clubCount(equipoID);
        this.modalCtrl.dismiss();
      }

    }
    this.clubOwner(equipoID);
  


  }


  

    
  async verClub(club){

  
    this.solicitudes.mostrarSolicitudesClubes(club.equipoID);
    const modal  = await this.modalCtrl.create({
     component: ClubInfoComponent,
     cssClass: 'my-custom-class',
     componentProps:{
      club:club,
      menu: false,
      modalMenu: true


     }
   });
   await modal .present();
 }


 agregarClub(equipoID: number){
 // this.solicitudes.solicitudes.push(new Solicitudes(this.solicitudes.solicitudes.length+1,equipoID,this.userService.currentUser.usuarioID,true,false));
  console.log(this.solicitudes.solicitudes);
  alert('completed')

    }



    async enviarRetoClub(club){

      const modal = await this.modalCtrl.create({
        component: EquipoSolicitudPage,
        cssClass: 'bottom-modal',
        componentProps: {
          usuarioID: this.userService.currentUser.usuarioID
        }
      });

    
       await modal.present();
    
      
      const { data } = await modal.onDidDismiss();
      if(data!== undefined){
        this.retosService.addReto(this.retosService.retos.length+1,this.userService.currentUser.usuarioID,data.equipo.equipoID, club.equipoID, true, false);
        alert('hello')
      }

    }


  editClub(id: number, club){

    for( let i = 0; i < this.club.length ; i++){  
      if(this.club[i].equipoID ===id ){
        this.club[i].nombre = club.nombre;
        this.club[i].foto = club.foto;
        this.club[i].abreviacion = club.abreviacion;
        this.club[i].provinciaID = club.provinciaID;
        this.club[i].cantonID = club.cantonID;
        this.club[i].distritoID = club.distritoID;
      } 

    }

  }

  sendClubRequest(equipoID: number) {
 //   this.solicitudes.solicitudes.push(new Solicitud(this.solicitudes.solicitudes.length + 1, equipoID, this.userService.currentUser.usuarioID, true,false));
    console.log(this.solicitudes.solicitudes);
  }

  checkIfHasClub() {
    this.userclubs = [];
    this.playerClubs = [];
    this.new = false;
    // VALIDACION DE  PROPIETARIO DE CLUB

    const userClub = this.club.findIndex(d => d.usuarioID === this.userService.currentUser.usuarioID);

    const playerClub = this.jugadores.jugadoresClubes.findIndex(d => d.jugadorEquipoID === this.userService.currentUser.usuarioID);


    if (playerClub >= 0) {
      for (let i = 0; i < this.club.length; i++) {
        for (let j = 0; j < this.jugadores.jugadoresClubes.length; j++) {
          if (this.jugadores.jugadoresClubes[j].equipoID === this.club[i].equipoID   ) {
            this.playerClubs.push(this.club[i]);
            this.switchClub = this.playerClubs[0];
           

           
          }
        }
      
      }
      this.clubOwner(this.playerClubs[0].equipoID);
      this.new = true;
    }

    if (userClub >= 0) {

      for (let i = 0; i < this.club.length; i++) {
        if (this.userService.currentUser.usuarioID === this.club[i].usuarioID ) {
          this.userclubs.push(this.club[i]);
          this.switchClub = this.userclubs[0];
          

        }
       
      }
      this.clubOwner(this.userclubs[0].equipoID);
      this.clubCount(this.club[0].equipoID);
      this.new = true;
    
    }
  

  }

  clubOwner(equipoID){
    const playerClub = this.jugadores.jugadoresClubes.findIndex(d => d.jugadorEquipoID === this.userService.currentUser.usuarioID);


    for (let i = 0; i < this.club.length; i++) {

      if(this.club[i].equipoID === equipoID){
        if ( playerClub >= 0  ? this.userService.currentUser.usuarioID === this.club[i].usuarioID || this.jugadores.jugadoresClubes[playerClub].administrador === true : this.userService.currentUser.usuarioID === this.club[i].usuarioID ) {

          this.clubAdmin = true;
  
        }else{
          this.clubAdmin = false;
  
        }
      }
   
    
     
    }
    console.log('club admin' ,  this.clubAdmin )
  }

  clubCount(equipoID){
    this.solicitudes.conteoClub = 0;
    for( let i = 0; i < this.solicitudes.solicitudes.length; i++){
      if(this.solicitudes.solicitudes[i].equipoID === equipoID){
      
       this.solicitudes.conteoClub++;
   
      }
      
  }
  console.log(   this.solicitudes.conteoClub,'weg')
  }



/***
 *   makeAdmin(jugadorID){

    let  i = this.jugadoresClubes.jugadoresClubes.findIndex( jugadores => jugadores.jugadorID === jugadorID);
   
    if(i >= 0 ){
   
      if(!this.jugadoresClubes.jugadoresClubes[i].admin){
       this.jugadoresClubes.jugadoresClubes[i].admin = true;
       this.jugadoresClubes.presentAlert('El usuario se establecio como jugador administrador')
   
      }else{
       this.jugadoresClubes.jugadoresClubes[i].admin = false;
       this.jugadoresClubes.presentAlert('El usuario se establecio como jugador regular')
      }
   
      console.log(this.jugadoresClubes.jugadoresClubes[i], 'admin request')
      this.clubOwner(this.jugadoresClubes.jugadoresClubes[i].equipoID)
   
    }
   }
 */
   


}
