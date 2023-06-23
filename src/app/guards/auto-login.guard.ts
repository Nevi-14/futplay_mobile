import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';
import { AuthenticationService } from '../services/autenticacion.service';
import { StorageService } from '../services/storage-service';
import { AlertasService } from '../services/alertas.service';


@Injectable({
  providedIn: 'root'
})
export class AutoLoginGuard implements CanLoad {
  constructor(
    public usuariosService: UsuariosService,
    public authenticationService: AuthenticationService,
    public router: Router,
    public storageService: StorageService,
    public alertasService: AlertasService

  ) { }
  canLoad(): any {


    if (!this.usuariosService.usuarioActual) {
      this.storageService.get('usuario').then(usuario => {
        this.usuariosService.usuarioActual = usuario;
        if (this.usuariosService.usuarioActual) {
          this.alertasService.pagina = 'reservaciones'
          return this.router.navigateByUrl('/futplay/reservaciones', { replaceUrl: true });
        }
      });

    }

    return true;
  }
}