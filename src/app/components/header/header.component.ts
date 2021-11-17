import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { MyReservationsPage } from 'src/app/pages/my-reservations/my-reservations.page';
import { SettingInfoComponent } from '../setting-info/setting-info.component';
import { MyClubsPage } from '../../pages/my-clubs/my-clubs.page';
import { CreateClubPage } from '../../pages/create-club/create-club.page';
import { ClubConfigPage } from '../../pages/club-config/club-config.page';
import { ClubService } from '../../services/club.service';
import { JoinClubComponentComponent } from '../join-club-component/join-club-component.component';

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
  @Input() menu3 = false;
  @Input() sideMenu = false;
  @Input() newClubmenu = false;
  url: string;
  invalidURL = ['/home/clubs','/test '];
  valid = false;

  constructor(public popoverCtrl: PopoverController, public route: Router, public modalCtrl: ModalController, public clubs: ClubService) { }


  ngOnInit() {
  }
  async findClub() {
    const modal = await this.modalCtrl.create({
      component:JoinClubComponentComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
  async  presentPopoverClub(){
    const modal = await this.modalCtrl.create({
      component:ClubConfigPage,
      cssClass: 'my-custom-class',
      componentProps:{
        club:this.clubs.switchClub
       }
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
  
  const modal = await this.modalCtrl.create({
    component: MyClubsPage,
    cssClass: 'modal-menu'
  });
  await modal.present();


 
 }

  async presentModal() {
  
    const modal = await this.modalCtrl.create({
      component: MyReservationsPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }


}

