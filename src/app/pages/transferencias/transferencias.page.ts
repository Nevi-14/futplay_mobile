import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SolicitudesService } from '../../services/solicitudes.service';

import { OpcionesService } from 'src/app/services/opciones.service';
import { JugadoresEquiposService } from '../../services/jugadoresEquipos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-transferencias',
  templateUrl: './transferencias.page.html',
  styleUrls: ['./transferencias.page.scss'],
})
export class TransferenciasPage implements OnInit {
  @Input() clubID: number;
  constructor( public modalCtrl: ModalController, public solicitudes: SolicitudesService, public jugadoresClubes: JugadoresEquiposService, public usuario: UsuariosService, public clubs: JugadoresEquiposService, public opcionesService: OpcionesService) { }

  ngOnInit() {
    console.log(this.jugadoresClubes.jugadoresClubes)
  }

  cerrarModal(){
    this.modalCtrl.dismiss();
  }

}
