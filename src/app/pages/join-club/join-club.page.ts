import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ClubService } from 'src/app/services/club.service';
import { ClubInfoPage } from '../club-info/club-info.page';
import { SolicitudesService } from '../../services/solicitudes.service';
import { Solicitud } from 'src/app/models/solicitudes';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-join-club',
  templateUrl: './join-club.page.html',
  styleUrls: ['./join-club.page.scss'],
})
export class JoinClubPage implements OnInit {
  
 
  constructor( private modalCtrl: ModalController) {  }



  ngOnInit() {
 
   
  }
  cerrarModal(){
    this.modalCtrl.dismiss();
  }
  

}
