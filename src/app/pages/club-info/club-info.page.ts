import { Component, Input, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { TransferenciasPage } from '../transferencias/transferencias.page';
import { ClubProfileInfoPage } from '../club-profile-info/club-profile-info.page';
import { MyClubsPageModule } from '../my-clubs/my-clubs.module';
import { MyClubsPage } from '../my-clubs/my-clubs.page';
import { Club } from '../../models/club';
import { JugadoresService } from '../../services/jugadores.service';
import { SolicitudesService } from 'src/app/services/solicitudes.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-club-info',
  templateUrl: './club-info.page.html',
  styleUrls: ['./club-info.page.scss'],
})
export class ClubInfoPage implements OnInit {
@Input() clubItem: Club;

  constructor(private modalCtrl: ModalController,private popoverCtrl: PopoverController, private jugadores: JugadoresService, private solicitudes: SolicitudesService, private usuario: UserService) { }

  ngOnInit() {
   
  }

  add(solicitud){

this.jugadores.add(solicitud.usuarioID,solicitud.clubID,1,'');
this.solicitudes.delete(solicitud.solicitudID);
  }
  delete(solicitudId: number){
    console.log(solicitudId);
    this.solicitudes.delete(solicitudId);
    console.log(this.solicitudes.solicitudes);
  }
  async listaTransferencia() {
    const modal = await this.modalCtrl.create({
      component: TransferenciasPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
  async clubinfo(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: ClubProfileInfoPage,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
      backdropDismiss: true
    });
    await popover.present();

    const { data } = await popover.onWillDismiss();
    console.log(data);
  }
  async myclubs(ev: any) {
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

  cerrarModal(){
    this.modalCtrl.dismiss();
  }

}
