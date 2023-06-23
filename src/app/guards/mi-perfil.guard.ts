import { Injectable } from '@angular/core';
import { CanLoad} from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';
import { AlertasService } from '../services/alertas.service';
import { ReservacionesService } from '../services/reservaciones.service';
import { SolicitudesService } from '../services/solicitudes.service';
import { EquiposService } from '../services/equipos.service';

@Injectable({
  providedIn: 'root'
})
export class MiPerfilGuard implements CanLoad {

  constructor(
    public usuariosService:UsuariosService,
    public alertasService:AlertasService,
    public reservacionesService:ReservacionesService,
    public solicitudesService:SolicitudesService,
    public equiposService:EquiposService
  ){}
 
  canLoad(): any {
    this.solicitudesService.syncGetSolicitudesRecibidasUsuarioToPromise(this.usuariosService.usuarioActual.usuario.Cod_Usuario).then(solicitudes =>{
 
          this.solicitudesService.solicitudesJugadoresArray = solicitudes;
        })
        return true;
  }
}
