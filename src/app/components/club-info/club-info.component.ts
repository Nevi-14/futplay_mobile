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
import { ClubPictureUploadPage } from '../../pages/club-picture-upload/club-picture-upload.page';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { SocialMediaPage } from '../../pages/social-media/social-media.page';

@Component({
  selector: 'app-club-info',
  templateUrl: './club-info.component.html',
  styleUrls: ['./club-info.component.scss'],
})
export class ClubInfoComponent implements OnInit {
  @Input() club: Club;
  currentYear = new Date().toLocaleString();
  constructor(private modalCtrl: ModalController,private popoverCtrl: PopoverController, private jugadores: JugadoresService, private solicitudes: SolicitudesService, private usuario: UserService, private jugadoresClubes: JugadoresClubesService, private clubs: ClubService,private camera: Camera) { }

  ngOnInit() {
    
  }

  async pictureUpload() {
    const modal = await this.modalCtrl.create({
      component: ClubPictureUploadPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
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

      async socialMedia() {
        const modal = await this.modalCtrl.create({
          component: SocialMediaPage,
          cssClass: 'social-media'
        });
        return await modal.present();
      }
      
}
