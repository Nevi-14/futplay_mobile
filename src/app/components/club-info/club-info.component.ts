import { Component, OnInit, Input } from '@angular/core';
import { Club } from 'src/app/models/club';
import { UserService } from '../../services/user.service';
import { SolicitudesService } from '../../services/solicitudes.service';
import { ModalController, PopoverController } from '@ionic/angular';
import { JugadoresService } from '../../services/jugadores.service';
import { TransferenciasPage } from '../../pages/transferencias/transferencias.page';
import { JugadoresClubesService } from '../../services/jugador-clubes.service';
import { JugadorClubes } from 'src/app/models/jugadorClubes';
import { ProfilePage } from '../../pages/profile/profile.page';

@Component({
  selector: 'app-club-info',
  templateUrl: './club-info.component.html',
  styleUrls: ['./club-info.component.scss'],
})
export class ClubInfoComponent implements OnInit {
  @Input() club: Club;
  currentYear = new Date().toLocaleString();
  constructor(private modalCtrl: ModalController,private popoverCtrl: PopoverController, private jugadores: JugadoresService, private solicitudes: SolicitudesService, private usuario: UserService, private jugadoresClubes: JugadoresClubesService) { }

  ngOnInit() {

  }

 

      async listaTransferencia(clubID) {
        const modal = await this.modalCtrl.create({
          component: TransferenciasPage,
          cssClass: 'my-custom-class',
          componentProps:{
            clubID:clubID
           }
        });
        return await modal.present();
      }

      
}
