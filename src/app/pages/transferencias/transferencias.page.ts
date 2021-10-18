import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Solicitud } from 'src/app/models/solicitudes';
import { JugadoresClubesService } from 'src/app/services/jugador-clubes.service';
import { SolicitudesService } from '../../services/solicitudes.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-transferencias',
  templateUrl: './transferencias.page.html',
  styleUrls: ['./transferencias.page.scss'],
})
export class TransferenciasPage implements OnInit {
  @Input() clubID: number;
  constructor( private modalCtrl: ModalController, private solicitudes: SolicitudesService, private jugadoresClubes: JugadoresClubesService, private usuario: UserService) { }

  ngOnInit() {
  }

  cerrarModal(){
    this.modalCtrl.dismiss();
  }

  add(solicitud){

    this.jugadoresClubes.add(solicitud.usuarioID,solicitud.clubID, new Date(), true);
    console.log(this.jugadoresClubes.jugadoresClubes)
    this.solicitudes.delete(solicitud.solicitudID);
      }
      delete(solicitudId: number){
        console.log(solicitudId);
        this.solicitudes.delete(solicitudId);
        console.log(this.solicitudes.solicitudes);
      }
}
