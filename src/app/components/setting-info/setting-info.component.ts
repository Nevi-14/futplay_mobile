import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-setting-info',
  templateUrl: './setting-info.component.html',
  styleUrls: ['./setting-info.component.scss'],
})
export class SettingInfoComponent implements OnInit {

  constructor(public userService: UsuariosService, public modalCtrl: ModalController) { }

  ngOnInit() {}
  cerrarModal(){
    this.modalCtrl.dismiss();
  }

}
