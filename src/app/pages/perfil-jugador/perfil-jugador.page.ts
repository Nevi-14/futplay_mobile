import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PerfilUsuario } from 'src/app/models/perfilUsuario';

@Component({
  selector: 'app-perfil-jugador',
  templateUrl: './perfil-jugador.page.html',
  styleUrls: ['./perfil-jugador.page.scss'],
})
export class PerfilJugadorPage implements OnInit {
@Input() perfil;
  constructor(
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {
    console.log(this.perfil, 'perfil')
  }

  cerrarModal(){

    this.modalCtrl.dismiss();
  }
}
