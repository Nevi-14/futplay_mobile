import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';

import { CantonesService } from 'src/app/services/cantones.service';

import { DistritosService } from 'src/app/services/distritos.service';
import { ProvinciasService } from 'src/app/services/provincias.service';
import { SolicitudesService } from 'src/app/services/solicitudes.service';

import { ClubInfoComponent } from '../club-info/club-info.component';


import { EquipoSolicitudPage } from '../../pages/equipo-solicitud/equipo-solicitud.page';
import { OpcionesComponent } from '../opciones/opciones.component';
import { OpcionesService } from 'src/app/services/opciones.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ReservacionesService } from '../../services/reservaciones.service';
import { EquiposService } from '../../services/equipos.service';
import { FilterPage } from '../../pages/filter/filter.page';

@Component({
  selector: 'app-join-club-component',
  templateUrl: './join-club-component.html',
  styleUrls: ['./join-club-component.scss'],
})
export class JoinClubComponent implements OnInit {
  @Input() header: boolean;
  @Input() titulo: string;
  @Input() equipo: number
  @Input() equiposMenu: boolean
  @Input() clasificacionMenu: boolean;
  textoBuscar = '';
  constructor( public modalCtrl: ModalController, public clubs: EquiposService, public solicitudes: SolicitudesService, public alertCtrl: AlertController, public provincias: ProvinciasService,public cantones: CantonesService, public distritos: DistritosService, public retos:ReservacionesService, public currentUser: UsuariosService, public popOverCtrl:PopoverController, public opcionesService: OpcionesService) {  }


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


async filtrar(){
  const modal = await this.modalCtrl.create({
   component: FilterPage,
   cssClass: 'dynamic-modal'
 });
 console.log('hello')
 return await modal.present();
 
}





}
