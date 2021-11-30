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

import { EquipoSolicitudPage } from '../../pages/equipo-solicitud/equipo-solicitud.page';
import { OpcionesComponent } from '../opciones/opciones.component';
import { OpcionesService } from 'src/app/services/opciones.service';

@Component({
  selector: 'app-join-club-component',
  templateUrl: './join-club-component.html',
  styleUrls: ['./join-club-component.scss'],
})
export class JoinClubComponent implements OnInit {
  textoBuscar = '';
  constructor( public modalCtrl: ModalController, public clubs: ClubService, public solicitudes: SolicitudesService, public user: UserService, public alertCtrl: AlertController, public provincias: ProvinciasService,public cantones: CantonesService, public distritos: DistritosService, public retos:RetosService, public currentUser: UserService, public popOverCtrl:PopoverController, public opcionesService: OpcionesService) {  }


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


 cerrarModal(){
  this.modalCtrl.dismiss();
}








}
