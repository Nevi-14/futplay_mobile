import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ModalController } from '@ionic/angular';
import { CreateClubPage } from '../../pages/create-club/create-club.page';
import { JugadoresPosicionesService } from 'src/app/services/jugador-posiciones.service';
import { PictureUploadPage } from '../../pages/picture-upload/picture-upload.page';
import { SettingInfoComponent } from '../setting-info/setting-info.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  save= 'assets/search/add-user.svg';
  constructor(private userService: UserService, private modalCtrl : ModalController, private jugadorPosiciones: JugadoresPosicionesService) { }

  ngOnInit() {
    console.log('swap result', this.userService.userProfile);
  }



  async pictureUpload() {
    const modal = await this.modalCtrl.create({
      component: PictureUploadPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }


}
