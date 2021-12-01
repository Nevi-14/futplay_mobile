import { Component, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { JugadoresPosicionesService } from '../../services/jugador-posiciones.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-profile-component',
  templateUrl: './profile-component.html',
  styleUrls: ['./profile-component.scss'],
})

export class ProfileComponent  {

  @Input() menu : boolean;
  @Input() modalMenu : boolean;
  constructor(public userService: UserService, public jugadorPosiciones: JugadoresPosicionesService, public modalCtrl: ModalController) { }

cerrarModal(){

  this.modalCtrl.dismiss();
}


}
