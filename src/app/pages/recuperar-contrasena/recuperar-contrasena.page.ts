import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertasService } from 'src/app/services/alertas.service';
import { UsuariosService } from '../../services/usuarios.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailService } from 'src/app/services/email';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.page.html',
  styleUrls: ['./recuperar-contrasena.page.scss'],
})
export class RecuperarContrasenaPage {
  token = null;
  verificarCodigo = false;
  codigo = '';
  sendEmail = {
    email: null,
    header: null,
    subject: this.translateService.instant('PASSWORD_RECOVERY'),
    message: null,
  };
  constructor(
    public modalCtrl: ModalController,
    public alertasService: AlertasService,
    public usuariosService: UsuariosService,
    public router: Router,
    public emailService: EmailService,
    private translateService: TranslateService
  ) {}

  ionViewWillEnter() {
    this.limpiarDatos();
  }
  limpiarDatos() {
    this.token = null;
    this.verificarCodigo = false;
    this.codigo = '';
  }
  async verificarCodigos(fRecuperarContrasena: NgForm) {
    let data = fRecuperarContrasena.value;
    this.codigo = data.codigo;
    if (!this.codigo)
      return this.alertasService.message(
        'FUTPLAY',
        this.translateService.instant('ALL_FIIELD_ARE_REQUIRED')
      );
    if (this.token == this.codigo) {
      this.usuariosService.CorreoVerificacion = this.sendEmail.email;
      return this.router.navigateByUrl('/cambiar-contrasena', {
        replaceUrl: true,
      });
    } else {
      return this.alertasService.message(
        'FUTPLAY',
        this.translateService.instant('INCORRECT_CODE')
      );
    }
  }
  obtenerCodigoDeSeguridad(fRecuperarContrasena: NgForm) {
    let data = fRecuperarContrasena.value;
    this.sendEmail.email = data.email;
    if (!this.sendEmail.email)
      return this.alertasService.message(
        'FUTPLAY',
        this.translateService.instant('ALL_FIIELD_ARE_REQUIRED')
      );
    this.sendEmail.header = this.translateService.instant('PASSWORD_RECOVERY');

    if (this.verificarCodigo)
      return this.verificarCodigos(fRecuperarContrasena);
    this.alertasService.presentaLoading(
      this.translateService.instant('VALIDATING_DATA')
    );
    return this.usuariosService.syncValidarCuenta(this.sendEmail.email).then(
      (resp: any) => {
        if (resp == 403) {
          this.alertasService.loadingDissmiss();
          return this.alertasService.message(
            'FUTPLAY',
            this.translateService.instant('SOMETHING_WENT_WRONG')
          );
        }
        let token =
          String(new Date().getHours()) +
          String(new Date().getMinutes()) +
          String(new Date().getMilliseconds());
        this.token = token;
        this.sendEmail.message = `${this.translateService.instant(
          'USE_THIS_SECURITY_CODE'
        )} ${token}. ${this.translateService.instant(
          'DO_NOT_SHARE_THIS_CODE_WITH_ANYONE'
        )}.
`;
        let email = resp.Correo;
        this.sendEmail.email = email;
        return this.emailService.syncPostEmail(this.sendEmail).then(
          (resp: any) => {
            this.alertasService.loadingDissmiss();
            this.verificarCodigo = true;
            this.alertasService.message(
              'FUTPLAY',
              this.translateService.instant('SECURITY_CODE_MESSAGE')
            );
          },
          (error) => {
            this.alertasService.loadingDissmiss();
            this.alertasService.message(
              'FUTPLAY',
              this.translateService.instant('SOMETHING_WENT_WRONG')
            );
          }
        );
      },
      (error) => {
        this.alertasService.loadingDissmiss();
        this.alertasService.message(
          'FUTPLAY',
          this.translateService.instant('SOMETHING_WENT_WRONG')
        );
      }
    );
  }
}
