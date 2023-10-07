import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AlertasService } from './alertas.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

const TOKEN_KEY = 'my-token';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    null
  );
  token = '';

  constructor(
    private router: Router,
    public alertasService: AlertasService,
    public userService: UsuariosService,
    public modalCtrl: ModalController,
    public translateService: TranslateService
  ) {
    this.loadToken(false);
  }

  async loadToken(token) {
    if (token) {
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  login() {
    this.isAuthenticated.next(true);
  }

  logout() {
    this.isAuthenticated.next(false);
    this.router.navigateByUrl('/inicio-sesion');
  }

  async deleteAccount() {
    await this.userService.syncDeleteUserToPromise(
      this.userService.usuarioActual.Correo
    );
    this.userService.usuarioActual = null;
    this.modalCtrl.dismiss();
    this.alertasService.message(
      'FUTPLAY',
      this.translateService.instant('ACCOUNT_DELETED_SUCCESSFULLY')
    );
    this.router.navigateByUrl('/inicio-sesion');
    this.isAuthenticated.next(false);
    this.router.navigateByUrl('/inicio/inicio-sesion', { replaceUrl: true });
  }
}
