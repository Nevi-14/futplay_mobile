import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { AlertasService } from '../../services/alertas.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(
    public modalCtrl: ModalController,
    public alertasService: AlertasService,
    public usuariosService:UsuariosService,
    public router:Router ) { }

  ngOnInit() {
  }

  regresar(){
    this.modalCtrl.dismiss();
  }

  


 

  verificarCodigos(fRecuperarContrasena: NgForm) {
    
    let data = fRecuperarContrasena.value;
    //this.Codigo = data.Codigo
    if(!this.Codigo) return this.alertasService.message('FUTPLAY','Todos los campos son obligatorios!');
    this.alertasService.presentaLoading('Validando información..')
    this.usuariosService.syncPostTokenVerification({
      token: this.Codigo,
      email: this.correo
    }).then((resp: any) => {
      console.log(this.Codigo)
      console.log(resp.passwordReset.token)
      this.alertasService.loadingDissmiss();
      if (resp.passwordReset.token == this.Codigo) {
        this.usuariosService.CorreoVerificacion = this.correo;
        this.regresar();
        this.router.navigateByUrl('/cambiar-contrasena', { replaceUrl: true })
      } else {
        this.alertasService.loadingDissmiss();
        this.alertasService.message('Futplay', 'Codigo incorrecto.');
        return;
      }
    })
  }

  obtenerCodigoDeSeguridad(fRecuperarContrasena: NgForm) {
    let data = fRecuperarContrasena.value;
    if (this.verificarCodigo)   {
      this.Codigo = data.Codigo; 
      return this.verificarCodigos(fRecuperarContrasena);
    }

  
   // this.correo = data.Correo;
    
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
