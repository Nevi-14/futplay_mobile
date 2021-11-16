import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { Solicitud } from 'src/app/models/solicitudes';
import { CantonesService } from 'src/app/services/cantones.service';
import { ClubService } from 'src/app/services/club.service';
import { DistritosService } from 'src/app/services/distritos.service';
import { ProvinciasService } from 'src/app/services/provincias.service';
import { SolicitudesService } from 'src/app/services/solicitudes.service';
import { UserService } from 'src/app/services/user.service';
import { ClubInfoComponent } from '../club-info/club-info.component';
import { RetosService } from '../../services/retos.service';
import { MyClubsPage } from '../../pages/my-clubs/my-clubs.page';
import { EquipoSolicitudPage } from '../../pages/equipo-solicitud/equipo-solicitud.page';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-join-club-component',
  templateUrl: './join-club-component.component.html',
  styleUrls: ['./join-club-component.component.scss'],
})
export class JoinClubComponentComponent implements OnInit {
  textoBuscar = '';
  constructor( public modalCtrl: ModalController, public clubs: ClubService, public solicitudes: SolicitudesService, public user: UserService, public alertCtrl: AlertController, public provincias: ProvinciasService,public cantones: CantonesService, public distritos: DistritosService, public retos:RetosService, public currentUser: UserService, public popOverCtrl:PopoverController) {  }


  ngOnInit() {}

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
  delete(solicitudId: number){
    console.log(solicitudId);
    this.solicitudes.delete(solicitudId);
    console.log(this.solicitudes.solicitudes);
  }
  add(clubID: number){
    this.solicitudes.solicitudes.push(new Solicitud(this.solicitudes.solicitudes.length+1,clubID,this.user.currentUser.usuarioID,true,false));
    console.log(this.solicitudes.solicitudes);
    this.message('Solicitud enviada');
      }
  async send(club){
    const modal  = await this.modalCtrl.create({
     component: ClubInfoComponent,
     cssClass: 'my-custom-class',
     componentProps:{
      club:club
     }
   });
   await modal .present();
 }

 cerrarModal(){
  this.modalCtrl.dismiss();
}



async enviarReto(club){

  const popOver = await this.popOverCtrl.create({
    component: EquipoSolicitudPage,
    cssClass:'my-custom-class',
    componentProps:{
      usuarioID: this.currentUser.currentUser.usuarioID
    }
  });

   await popOver.present();

  
  const { data } = await popOver.onDidDismiss();
  if(data.equipo){
//  this.leerMarcador();
  }
this.retos.addReto(this.retos.retos.length+1,this.currentUser.currentUser.usuarioID,data.equipo.clubID, club.clubID, true, false);
console.log(this.retos.retos)
}
}
