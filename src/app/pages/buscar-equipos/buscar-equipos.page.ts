import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EquiposService } from 'src/app/services/equipos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-buscar-equipos',
  templateUrl: './buscar-equipos.page.html',
  styleUrls: ['./buscar-equipos.page.scss'],
})
export class BuscarEquiposPage implements OnInit {

  stadiumProfile =  'assets/main/game-match.svg';
  constructor(
    public modalCtrl: ModalController,
    public equiposService: EquiposService,
    public usuariosService:UsuariosService
  ) { }

  ngOnInit() {
    this.equiposService.SyncEquipos(this.usuariosService.usuarioActual.Cod_Usuario);
  }

  cerrarModal(){

    this.modalCtrl.dismiss();
  }

}
