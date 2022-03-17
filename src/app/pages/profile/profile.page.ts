import { Component, OnInit, Input } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';

import { UsuariosService } from 'src/app/services/usuarios.service';

import { GlobalService } from 'src/app/services/global.service';
import { EquiposService } from 'src/app/services/equipos.service';

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

  constructor(public popoverCtrl: PopoverController,public userService: UsuariosService, public modalCtrl: ModalController, public globalService: GlobalService, public equiposService: EquiposService) {
    

    
  }

  ngOnInit() {
    this.equiposService.SyncMisEquipos(this.userService.usuarioActual.Cod_Usuario)
   // this.equiposService.checkIfHasClub();
  }

  uploadPicture(){

  }



}
