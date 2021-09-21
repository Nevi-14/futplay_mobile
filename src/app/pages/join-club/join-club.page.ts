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
  textoBuscar = '';
  save= 'assets/search/save.svg';
  constructor( private modalCtrl: ModalController, private club: ClubService, private solicitudes: SolicitudesService, private user: UserService, private alertCtrl: AlertController) {  }



  ngOnInit() {
  }
  cerrarModal(){
    this.modalCtrl.dismiss();
  }
  onSearchChange(event){
    console.log(event.detail.value);
    this.textoBuscar = event.detail.value;
  }
  async message( text: string){
    const alert = await this.alertCtrl.create({
      header: 'Futplay',
      message: text,
    });
    alert.present();
  }

  add(clubID: number){
    this.solicitudes.solicitudes.push(new Solicitud(this.solicitudes.solicitudes.length+1,clubID,this.user.currentUser.usuarioID,false));
    console.log(this.solicitudes.solicitudes);
    this.message('Solicitud enviada');
      }
      
  async send(club){
    const modal = await this.modalCtrl.create({
     component: ClubInfoPage,
     cssClass: 'my-custom-class',
     componentProps:{
       club:club
     }
   });
   return await modal.present();
 }

}
