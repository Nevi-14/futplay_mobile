import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AlertasService } from '../../services/alertas.service';
import { EmailService } from 'src/app/services/email';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-gestor-contrasena',
  templateUrl: './gestor-contrasena.page.html',
  styleUrls: ['./gestor-contrasena.page.scss'],
})
export class GestorContrasenaPage implements OnInit {
  showPass = false;
  confirmPass = false;
  cambiarContrasena = false;
  contrasena = '';
  confirmarContrasena = '';
  verificarCodigo = false;
  correo = this.usuariosService.usuarioActual.Correo;
  Codigo = '';
  token = null;
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
    private translateService: TranslateService,
    public emailService: EmailService
  ) {}

  ngOnInit() {}

  regresar() {
    this.modalCtrl.dismiss();
  }

  async verificarCodigos(fRecuperarContrasena: NgForm) {
    let data = fRecuperarContrasena.value;
    this.codigo = data.Codigo;
    if (!this.codigo)
      return this.alertasService.message(
        'FUTPLAY',
        this.translateService.instant('ALL_FIELDS_REQUIRED')
      );
    if (this.token == this.codigo) {
      this.usuariosService.CorreoVerificacion = this.sendEmail.email;
      this.modalCtrl.dismiss();
      this.router.navigateByUrl('/cambiar-contrasena', { replaceUrl: true });
    } else {
      return this.alertasService.message(
        'FUTPLAY',
        this.translateService.instant('INCORRECT_CODE')
      );
    }
  }

  obtenerCodigoDeSeguridad(fRecuperarContrasena: NgForm) {
    let data = fRecuperarContrasena.value;
    this.sendEmail.email = this.usuariosService.usuarioActual.Correo;
    if (!this.sendEmail.email)
      return this.alertasService.message(
        'FUTPLAY',
        this.translateService.instant('ALL_FIELDS_REQUIRED')
      );
    this.sendEmail.header = this.translateService.instant('PASSWORD_RECOVERY');

    if (this.verificarCodigo)
      return this.verificarCodigos(fRecuperarContrasena);
    this.alertasService.presentaLoading(
      this.translateService.instant('VALIDATING_DATA')
    );
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
  }
}