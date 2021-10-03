import { Component, OnInit } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';
import { SettingInfoComponent } from '../../components/setting-info/setting-info.component';
import { UserService } from '../../services/user.service';
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { PictureUploadPage } from '../picture-upload/picture-upload.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  afuConfig = {
    uploadAPI: {
      url:"http://localhost:8101/..assets/photos"
    }
};
  constructor(private popoverCtrl: PopoverController,private userService: UserService, private modalCtrl: ModalController) { }

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

  async pictureUpload() {
    const modal = await this.modalCtrl.create({
      component: PictureUploadPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

}
