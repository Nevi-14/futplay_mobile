import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UsuariosService } from '../../services/usuarios.service';
import { EquiposService } from '../../services/equipos.service';
import { SolicitudesService } from '../../services/solicitudes.service';
import { vistaEquipos } from '../../models/vistaEquipos';
import { SolicitudesJugadoresEquipos } from '../../models/solicitudesJugadoresEquipos';
import { PerfilUsuario } from '../../models/perfilUsuario';

@Component({
  selector: 'app-buscar-jugadores',
  templateUrl: './buscar-jugadores.page.html',
  styleUrls: ['./buscar-jugadores.page.scss'],
})
export class BuscarJugadoresPage implements OnInit {

  stadiumProfile =  'assets/main/game-match.svg';
  solicitudJugadorEquipo:SolicitudesJugadoresEquipos = {

    Cod_Solicitud : null,
    Cod_Usuario : null,
    Cod_Equipo :this.equiposService.perfilEquipo.Cod_Equipo,
    Confirmacion_Usuario:false,
    Confirmacion_Equipo:true,
    Fecha: new Date(),
    Estado: true,
    Usuarios: null,
    Equipos: null
  
  }
    constructor(
      public modalCtrl: ModalController,
      public equiposService: EquiposService,
      public usuariosService:UsuariosService,
      public solicitudesService:SolicitudesService
    ) { }
  
    ngOnInit() {
  this.usuariosService.syncUsusarios(this.usuariosService.usuarioActual.Cod_Usuario);
      this.equiposService.SyncEquipos(this.usuariosService.usuarioActual.Cod_Usuario);
    }
    jugadorEquipoSolicitud(usuario: PerfilUsuario){
      this.solicitudJugadorEquipo.Cod_Usuario = usuario.Cod_Usuario
  
      this.solicitudesService.generarSolicitud(this.solicitudJugadorEquipo);

      this.modalCtrl.dismiss({
        'dismissed': true
      });
    }
  
    cerrarModal(){
  
      this.modalCtrl.dismiss();
    }
}
