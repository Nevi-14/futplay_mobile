import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-setting-info',
  templateUrl: './setting-info.component.html',
  styleUrls: ['./setting-info.component.scss'],
})
export class SettingInfoComponent implements OnInit {

  constructor(public userService: UserService, public modalCtrl: ModalController) { }

  ngOnInit() {}
  cerrarModal(){
    this.modalCtrl.dismiss();
  }

}
