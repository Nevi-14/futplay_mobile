import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertasService } from 'src/app/services/alertas.service';
import { UsuariosService } from '../../services/usuarios.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.page.html',
  styleUrls: ['./recuperar-contrasena.page.scss'],
})
export class RecuperarContrasenaPage {
  token = null;
  verificarCodigo = false;
  correo = '';
  codigo = '';

  constructor(
    public modalCtrl: ModalController,
    public alertasService: AlertasService,
    public usuariosService: UsuariosService,
    public router: Router

  ) { }

  ionViewWillEnter() {
    this.limpiarDatos()
  }
  limpiarDatos() {
    this.token = null;
    this.verificarCodigo = false;
    this.correo = '';
    this.codigo = '';

  }

  verificarCodigos(fRecuperarContrasena: NgForm) {
    
    let data = fRecuperarContrasena.value;
    this.codigo = data.codigo
    if(!this.codigo) return this.alertasService.message('FUTPLAY','Todos los campos son obligatorios!');
    this.alertasService.presentaLoading('Validando información..')
    this.usuariosService.syncPostTokenVerification({
      token: this.codigo,
      email: this.correo
    }).then((resp: any) => {
      console.log(this.codigo)
      console.log(resp.passwordReset.token)
      this.alertasService.loadingDissmiss();
      if (resp.passwordReset.token == this.codigo) {
        this.usuariosService.CorreoVerificacion = this.correo;
        this.router.navigateByUrl('/cambiar-contrasena', { replaceUrl: true })
      } else {
        this.alertasService.loadingDissmiss();
        this.alertasService.message('Futplay', 'Codigo incorrecto.');
        return;
      }
    })
  }

  obtenerCodigoDeSeguridad(fRecuperarContrasena: NgForm) {

    if (this.verificarCodigo) return this.verificarCodigos(fRecuperarContrasena);

    let data = fRecuperarContrasena.value;
    this.correo = data.Correo;
    
    if(!this.correo) return this.alertasService.message('FUTPLAY','Todos los campos son obligatorios!');
    let token = String(new Date().getHours()) + String(new Date().getMinutes()) + String(new Date().getMilliseconds());
    let item = {
        "body": {
        "email": this.correo,
        "token": token
      }
    }

    this.alertasService.presentaLoading('Verificando informacion.')
    this.usuariosService.syncPostForgotPassword(item).then((resp: any) => {
      this.alertasService.loadingDissmiss();
      if (resp != 500) {
        this.verificarCodigo = true;
        this.alertasService.message('FUTPLAY', resp.message)
        return
      }

      this.alertasService.message('FUTPLAY', 'Lo sentimos algo salio mal.')


    }, error => {
      this.verificarCodigo = false;
      this.alertasService.loadingDissmiss();
      this.alertasService.message('FUTPLAY', 'Lo sentimos algo salio mal.')

    })
  }



}
