import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-buscar-jugadores',
  templateUrl: './buscar-jugadores.page.html',
  styleUrls: ['./buscar-jugadores.page.scss'],
})
export class BuscarJugadoresPage implements OnInit {

  stadiumProfile =  'assets/main/game-match.svg';
  constructor(
    public modalCtrl: ModalController,
    public usuariosService: UsuariosService
  ) { }

  ngOnInit() {
    this.usuariosService.syncUsusarios();

  }

  cerrarModal(){

    this.modalCtrl.dismiss();
  }

}
