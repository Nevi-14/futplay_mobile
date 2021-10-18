import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { MyReservationsPage } from 'src/app/pages/my-reservations/my-reservations.page';
import { SettingInfoComponent } from '../setting-info/setting-info.component';
import { MyClubsPage } from '../../pages/my-clubs/my-clubs.page';
import { JoinClubPage } from '../../pages/join-club/join-club.page';
import { CreateClubPage } from '../../pages/create-club/create-club.page';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() titulo = '';
  @Input() menu1 = false;
  @Input() menu2 = false;
  @Input() findClubMenu = false;
  @Input() searchbar = false;
  @Input() menu4 = false;
  @Input() sideMenu = false;
  @Input() newClubmenu = false;
  url: string;
  invalidURL = ['/home/clubs','/test '];
  valid = false;

  constructor(private popoverCtrl: PopoverController, private route: Router, private modalCtrl: ModalController) { }


  ngOnInit() {
  }
  async findClub() {
    const modal = await this.modalCtrl.create({
      component:JoinClubPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
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
 async clubsMenu(ev: any){
  const popover = await this.popoverCtrl.create({
    component: MyClubsPage,
    cssClass: 'my-custom-class',
    event: ev,
    translucent: true,
    backdropDismiss: true
  });
  await popover.present();

  const { data } = await popover.onWillDismiss();
  console.log(data);
 }

  async presentModal() {
  
    const modal = await this.modalCtrl.create({
      component: MyReservationsPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
  logOut(){
    this.route.navigate([ '/inicio/login']);
  }

  async newClub() {
    const modal = await this.modalCtrl.create({
      component:CreateClubPage,
      cssClass: 'my-custom-class'
    });

    return await modal.present();
  }
}

