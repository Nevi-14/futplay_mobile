import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuariosService } from '../services/usuarios.service';
import { EquiposService } from '../services/equipos.service';

@Injectable({
  providedIn: 'root'
})
export class PerfilEquipoGuard implements CanLoad {

  constructor(
    public usuariosService: UsuariosService,
    public equiposService: EquiposService,
  ) { }

  canLoad(): any {

    if(!this.usuariosService.usuarioActual) return
    this.equiposService.syncMisEquiposToPromise(this.usuariosService.usuarioActual.Cod_Usuario).then( (equipos) => {
      this.equiposService.misEquipos = equipos;
      if (this.equiposService.misEquipos.length > 0) {
        this.equiposService.equipo = this.equiposService.misEquipos[0];

      }

    })
  }

}
