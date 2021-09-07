import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { SettingInfoComponent } from '../../components/setting-info/setting-info.component';
import { UserService } from '../../services/users/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private popoverCtrl: PopoverController,private userService: UserService) { }

  ngOnInit() {
  //  alert('hello');
  console.log(this.userService.user.length)
  for(let i = 0; i < this.userService.user.length; i++){
    console.log(this.userService.user[i].nombre);
  }
    //console.log(this.userService.user);
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
