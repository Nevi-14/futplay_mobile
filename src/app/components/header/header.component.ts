import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { MisReservacionesPage } from '../../pages/mis-reservaciones/mis-reservaciones.page';
import { ReservacionesService } from '../../services/reservaciones.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() titulo = '';
  @Input() menu1 : boolean;
  @Input() menu2 : boolean;
  @Input() findClubMenu : boolean;
  @Input() searchbar : boolean;
  @Input() menu4 : boolean;
  @Input() menu3: boolean;
  @Input() sideMenu : boolean;
  @Input() newClubmenu : boolean;
  url: string;
  invalidURL = ['/home/clubs','/test '];
  valid : boolean;

  constructor(public popoverCtrl: PopoverController, public route: Router, public modalCtrl: ModalController, public router: Router,

    public usuariosService: UsuariosService,
    public reservacionesService:ReservacionesService
    ) { }


  ngOnInit() {

  
  }




  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: MisReservacionesPage,
      cssClass: 'full-screen-modal'
    });
    return await modal.present();
  }
  


}

