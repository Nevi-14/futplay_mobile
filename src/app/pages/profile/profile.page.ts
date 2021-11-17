import { Component, OnInit, Input } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';
import { SettingInfoComponent } from '../../components/setting-info/setting-info.component';
import { UserService } from '../../services/user.service';
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { JugadoresPosicionesService } from 'src/app/services/jugador-posiciones.service';
import { JugadorClubes } from 'src/app/models/jugadorClubes';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  @Input() userInfo: JugadorClubes;
  afuConfig = {
    uploadAPI: {
      url:"http://localhost:8101/..assets/photos"
    }
};

  constructor(public popoverCtrl: PopoverController,public userService: UserService, public modalCtrl: ModalController, public jugadorPosiciones: JugadoresPosicionesService) { }

  ngOnInit() {
  }

  uploadPicture(){

  }
  async presentPopover(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: SettingInfoComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
      backdropDismiss: true
    });
    await popover.present();

    const { data } = await popover.onWillDismiss();
    console.log(data);
  }



}
