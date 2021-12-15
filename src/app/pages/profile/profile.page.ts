import { Component, OnInit, Input } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';
import { SettingInfoComponent } from '../../components/setting-info/setting-info.component';
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { JugadoresEquipos } from '../../models/jugadoresEquipos';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  @Input() userInfo: JugadoresEquipos;
  afuConfig = {
    uploadAPI: {
      url:"http://localhost:8101/..assets/photos"
    }
};

  constructor(public popoverCtrl: PopoverController,public userService: UsuariosService, public modalCtrl: ModalController) {
    

    
  }

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
