import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { MyReservationsPage } from 'src/app/pages/my-reservations/my-reservations.page';
import { EquiposService } from '../../services/equipos.service';
import { GestionRetosService } from 'src/app/services/gestion-retos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';


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

  constructor(public popoverCtrl: PopoverController, public route: Router, public modalCtrl: ModalController, public clubs: EquiposService, public router: Router,
    
    public gestionRestosService: GestionRetosService,
    public usuariosService: UsuariosService
    ) { }


  ngOnInit() {

    this.gestionRestosService.syncRetosRecibidos(this.usuariosService.usuarioActual.Cod_Usuario)
  }




  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: MyReservationsPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
  


}

