import { Injectable } from '@angular/core';
import { Club } from '../models/club';
import { HttpClient } from '@angular/common/http';
import { PopoverController } from '@ionic/angular';
import { UserService } from './user.service';
import { SolicitudesService } from './solicitudes.service';
import { Solicitud } from '../models/solicitudes';
import { Jugador } from '../models/jugadores';
import { JugadoresService } from './jugadores.service';
import { JugadoresClubesService } from './jugador-clubes.service';

@Injectable({
  providedIn: 'root'
})
export class ClubService {
  new = false
  clubPlayer = false;
  clubOwner = false;
  club: Club[] = [];
  userclubs: Club[] = [];
  playerClubs: Club[] = [];
  switchClub: Club;
  constructor(private http: HttpClient, private popOverCtrl: PopoverController, private user: UserService, private solicitudes: SolicitudesService, private jugadores: JugadoresService, private jugadoresClubes: JugadoresClubesService) { }

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
        this.popOverCtrl.dismiss();
      }

    }


  }
  sendClubRequest(clubID: number) {
    this.solicitudes.solicitudes.push(new Solicitud(this.solicitudes.solicitudes.length + 1, clubID, this.user.currentUser.usuarioID, false));
    console.log(this.solicitudes.solicitudes);
  }


  checkIfHasClub() {
    this.userclubs = [];
    this.playerClubs = [];
    this.new = false;
    // VALIDACION DE  PROPIETARIO DE CLUB

    const userClub = this.club.findIndex(d => d.usuarioID === this.user.currentUser.usuarioID);

    const playerClub = this.jugadoresClubes.jugadoresClubes.findIndex(d => d.jugadorID === this.user.currentUser.usuarioID);


    if (playerClub >= 0) {
      for (let i = 0; i < this.club.length; i++) {
        for (let j = 0; j < this.jugadoresClubes.jugadoresClubes.length; j++) {
          if (this.jugadoresClubes.jugadoresClubes[j].clubID === this.club[i].clubID) {
            this.playerClubs.push(this.club[i]);
            this.switchClub = this.playerClubs[0];
          }
        }
      }
      this.new = true;
    }

    if (userClub >= 0) {
      for (let i = 0; i < this.club.length; i++) {
        if (this.user.currentUser.usuarioID === this.club[i].usuarioID) {
          this.userclubs.push(this.club[i]);
          this.switchClub = this.userclubs[0];
        }
      }
      this.new = true;
    }

  }

}
