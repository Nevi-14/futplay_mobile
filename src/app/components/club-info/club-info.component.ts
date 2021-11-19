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
import { ClubService } from 'src/app/services/club.service';
import { Camera } from '@ionic-native/camera/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
@Component({
  selector: 'app-club-info',
  templateUrl: './club-info.component.html',
  styleUrls: ['./club-info.component.scss'],
})
export class ClubInfoComponent implements OnInit {
  @Input() club: Club;
  @Input() menu: false;
  currentYear = new Date().toLocaleString();
  constructor(public modalCtrl: ModalController,public popoverCtrl: PopoverController, public jugadores: JugadoresService, public solicitudes: SolicitudesService, public usuario: UserService, public jugadoresClubes: JugadoresClubesService, public clubs: ClubService,public camera: Camera, public socialSharing: SocialSharing) { }

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

       socialMedia() {
        this.socialSharing.share(
          'FUTPLAY', // message
          this.club.nombre  , // subject
           '',   // file
          'url'
        );

      }

      
      
}
