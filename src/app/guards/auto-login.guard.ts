import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';
import { AuthenticationService } from '../services/autenticacion.service';
import { StorageService } from '../services/storage-service';
import { AlertasService } from '../services/alertas.service';
import { TranslateService } from '@ngx-translate/core';


@Injectable({
  providedIn: 'root'
})
export class AutoLoginGuard implements CanLoad {
  idioma = 'Us';
  file = 'Ingles';
  constructor(
    public usuariosService: UsuariosService,
    public authenticationService: AuthenticationService,
    public router: Router,
    public storageService: StorageService,
    public alertasService: AlertasService,
    private translateService: TranslateService

  ) { }
  canLoad(): any {


    if (!this.usuariosService.usuarioActual) {
      this.storageService.get('usuario').then(usuario => {
        this.usuariosService.usuarioActual = usuario;
        if (this.usuariosService.usuarioActual) {
          this.alertasService.pagina = 'reservaciones'
          this.translateService.setDefaultLang(this.file);
          return this.router.navigateByUrl('/futplay/reservaciones', { replaceUrl: true });
        }
      });

    }

    return true;
  }
}