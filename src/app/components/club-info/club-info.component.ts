import { Component, OnInit, Input } from '@angular/core';
import { Club } from 'src/app/models/club';
import { UserService } from '../../services/user.service';
import { SolicitudesService } from '../../services/solicitudes.service';
import { ModalController, PopoverController } from '@ionic/angular';
import { JugadoresService } from '../../services/jugadores.service';
import { TransferenciasPage } from '../../pages/transferencias/transferencias.page';

@Component({
  selector: 'app-club-info',
  templateUrl: './club-info.component.html',
  styleUrls: ['./club-info.component.scss'],
})
export class ClubInfoComponent implements OnInit {
  @Input() club: Club;
  currentYear = new Date().toLocaleString();
  constructor(private modalCtrl: ModalController,private popoverCtrl: PopoverController, private jugadores: JugadoresService, private solicitudes: SolicitudesService, private usuario: UserService) { }

  ngOnInit() {
 
    if(this.usuario.currentUser.usuarioID === this.club.usuarioID){
      console.log(this.club)
    }
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

}
