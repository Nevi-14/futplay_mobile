import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SolicitudesJugadoresEquipos } from 'src/app/models/solicitudesJugadoresEquipos';
import { vistaEquipos } from 'src/app/models/vistaEquipos';
import { EquiposService } from 'src/app/services/equipos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { SolicitudesService } from '../../services/solicitudes.service';

@Component({
  selector: 'app-buscar-equipos',
  templateUrl: './buscar-equipos.page.html',
  styleUrls: ['./buscar-equipos.page.scss'],
})
export class BuscarEquiposPage implements OnInit {
solicitudJugadorEquipo:SolicitudesJugadoresEquipos = {

  Cod_Solicitud : null,
  Cod_Usuario : this.usuariosService.usuarioActual.Cod_Usuario,
  Cod_Equipo :null,
  Confirmacion_Usuario:true,
  Confirmacion_Equipo:false,
  Fecha: new Date(),
  Estado: true,
  Usuarios: null,
  Equipos: null

};
  stadiumProfile =  'assets/main/game-match.svg';
  constructor(
    public modalCtrl: ModalController,
    public equiposService: EquiposService,
    public usuariosService:UsuariosService,
    public solicitudesService:SolicitudesService
  ) { }

  ngOnInit() {

    this.equiposService.SyncEquipos(this.usuariosService.usuarioActual.Cod_Usuario);
  }
  jugadorEquipoSolicitud(equipo:vistaEquipos){
    this.solicitudJugadorEquipo.Cod_Equipo = equipo.Cod_Equipo

    this.solicitudesService.generarSolicitud(this.solicitudJugadorEquipo);

    this.modalCtrl.dismiss({
      'dismissed': true
    });

  }

  cerrarModal(){

    this.modalCtrl.dismiss();
  }

}
