import { Injectable } from '@angular/core';
import { Club } from '../models/club';
import { HttpClient } from '@angular/common/http';
import { ModalController, PopoverController } from '@ionic/angular';
import { UserService } from './user.service';
import { SolicitudesService } from './solicitudes.service';
import { Solicitud } from '../models/solicitudes';
import { Jugador } from '../models/jugadores';
import { JugadoresService } from './jugadores.service';
import { JugadoresClubesService } from './jugador-clubes.service';
import { ClubInfoComponent } from '../components/club-info/club-info.component';
import { EquipoSolicitudPage } from '../pages/equipo-solicitud/equipo-solicitud.page';
import { RetosService } from './retos.service';

@Injectable({
  providedIn: 'root'
})
export class ClubService {
  new = false
  clubPlayer = false;
  clubAdmin = false;
  club: Club[] = [];
  userclubs: Club[] = [];
  playerClubs: Club[] = [];
  switchClub: Club;
  constructor(private http: HttpClient, private popOverCtrl: PopoverController, private userService: UserService, private solicitudes: SolicitudesService, private jugadores: JugadoresService, private jugadoresClubes: JugadoresClubesService, private modalCtrl: ModalController , public retosService: RetosService) { }

  getClubs() {
    this.http.get<Club[]>('/assets/json/clubs.json').subscribe(resp => {
      if (resp) {
        this.club = resp;
      } else {
        console.log('Error clubes roles');
      }
    });
  }
  swapClub(clubId: number) {
   

    for (let i = 0; i < this.club.length; i++) {
      if (this.club[i].clubID === clubId) {
        this.switchClub = this.club[i];
        this.clubCount(clubId);
        this.modalCtrl.dismiss();
      }

    }
    this.clubOwner(clubId);
  


  }


  

    
  async verClub(club){

  
    this.solicitudes.mostrarSolicitudesClubes(club.clubID);
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


 agregarClub(clubID: number){
  this.solicitudes.solicitudes.push(new Solicitud(this.solicitudes.solicitudes.length+1,clubID,this.userService.currentUser.usuarioID,true,false));
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
        this.retosService.addReto(this.retosService.retos.length+1,this.userService.currentUser.usuarioID,data.equipo.clubID, club.clubID, true, false);
        alert('hello')
      }

    }


  editClub(id: number, club){

    for( let i = 0; i < this.club.length ; i++){  
      if(this.club[i].clubID ===id ){
        this.club[i].nombre = club.nombre;
        this.club[i].foto = club.foto;
        this.club[i].abreviacion = club.abreviacion;
        this.club[i].provinciaID = club.provinciaID;
        this.club[i].cantonID = club.cantonID;
        this.club[i].distritoID = club.distritoID;
      } 

    }

  }

  sendClubRequest(clubID: number) {
    this.solicitudes.solicitudes.push(new Solicitud(this.solicitudes.solicitudes.length + 1, clubID, this.userService.currentUser.usuarioID, true,false));
    console.log(this.solicitudes.solicitudes);
  }


  checkIfHasClub() {
    this.userclubs = [];
    this.playerClubs = [];
    this.new = false;
    // VALIDACION DE  PROPIETARIO DE CLUB

    const userClub = this.club.findIndex(d => d.usuarioID === this.userService.currentUser.usuarioID);

    const playerClub = this.jugadoresClubes.jugadoresClubes.findIndex(d => d.jugadorID === this.userService.currentUser.usuarioID);


    if (playerClub >= 0) {
      for (let i = 0; i < this.club.length; i++) {
        for (let j = 0; j < this.jugadoresClubes.jugadoresClubes.length; j++) {
          if (this.jugadoresClubes.jugadoresClubes[j].clubID === this.club[i].clubID   ) {
            this.playerClubs.push(this.club[i]);
            this.switchClub = this.playerClubs[0];
           

           
          }
        }
      
      }
      this.clubOwner(this.playerClubs[0].clubID);
      this.new = true;
    }

    if (userClub >= 0) {

      for (let i = 0; i < this.club.length; i++) {
        if (this.userService.currentUser.usuarioID === this.club[i].usuarioID ) {
          this.userclubs.push(this.club[i]);
          this.switchClub = this.userclubs[0];
          

        }
       
      }
      this.clubOwner(this.userclubs[0].clubID);
      this.clubCount(this.club[0].clubID);
      this.new = true;
    
    }
  

  }

  clubOwner(clubId){
    const playerClub = this.jugadoresClubes.jugadoresClubes.findIndex(d => d.jugadorID === this.userService.currentUser.usuarioID);


    for (let i = 0; i < this.club.length; i++) {

      if(this.club[i].clubID === clubId){
        if ( playerClub >= 0  ? this.userService.currentUser.usuarioID === this.club[i].usuarioID || this.jugadoresClubes.jugadoresClubes[playerClub].admin === true : this.userService.currentUser.usuarioID === this.club[i].usuarioID ) {

          this.clubAdmin = true;
  
        }else{
          this.clubAdmin = false;
  
        }
      }
   
    
     
    }
    console.log('club admin' ,  this.clubAdmin )
  }


  clubCount(clubId){
    this.solicitudes.conteoClub = 0;
    for( let i = 0; i < this.solicitudes.solicitudes.length; i++){
      if(this.solicitudes.solicitudes[i].clubID === clubId){
      
       this.solicitudes.conteoClub++;
   
      }
      
  }
  console.log(   this.solicitudes.conteoClub,'weg')
  }



  makeAdmin(jugadorID){

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
      this.clubOwner(this.jugadoresClubes.jugadoresClubes[i].clubID)
   
    }
   }
   


}
