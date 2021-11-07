import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Usuario } from '../../models/usuario';
import { JugadoresPosicionesService } from '../../services/jugador-posiciones.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-profile-component',
  templateUrl: './profile-component.component.html',
  styleUrls: ['./profile-component.component.scss'],
})
export class ProfileComponentComponent implements OnInit {


  constructor(private userService: UserService, private jugadorPosiciones: JugadoresPosicionesService, private modalCtrl: ModalController) { }

  ngOnInit() {
 
  }


}
