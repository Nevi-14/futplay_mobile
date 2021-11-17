import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Solicitud } from 'src/app/models/solicitudes';
import { JugadoresClubesService } from 'src/app/services/jugador-clubes.service';
import { SolicitudesService } from '../../services/solicitudes.service';
import { UserService } from '../../services/user.service';
import { ClubService } from '../../services/club.service';

@Component({
  selector: 'app-transferencias',
  templateUrl: './transferencias.page.html',
  styleUrls: ['./transferencias.page.scss'],
})
export class TransferenciasPage implements OnInit {
  @Input() clubID: number;
  constructor( public modalCtrl: ModalController, public solicitudes: SolicitudesService, public jugadoresClubes: JugadoresClubesService, public usuario: UserService, public clubs: ClubService) { }

  ngOnInit() {
    console.log(this.jugadoresClubes.jugadoresClubes)
  }

  cerrarModal(){
    this.modalCtrl.dismiss();
  }

  add(solicitud){

    this.jugadoresClubes.add(solicitud.usuarioID,solicitud.clubID, new Date(), true);
    console.log(this.jugadoresClubes.jugadoresClubes)
    this.solicitudes.delete(solicitud.solicitudID);
    this.clubs.clubCount(solicitud.solicitudID);
    this.modalCtrl.dismiss();
      }
      delete(solicitudId: number){
        console.log(solicitudId);
        this.solicitudes.delete(solicitudId);
        console.log(this.solicitudes.solicitudes);
        this.modalCtrl.dismiss();
        
      }
}
