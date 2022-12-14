import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { AlertasService } from '../../services/alertas.service';
import * as bcrypt from 'bcryptjs';  // npm install bcryptjs --save  &&  npm install @types/bcrypt --save-dev
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
  correo = this.usuariosService.usuarioActual.usuario.Correo;
  codigo = '';

  constructor(
    public modalCtrl: ModalController,
    public alertasService: AlertasService,
    public usuariosService:UsuariosService ) { }

  ngOnInit() {
  }

  cerrarModal(){
    this.modalCtrl.dismiss();
  }

  
  confirmar(){

    if(!this.correo ){
      this.alertasService.message('ALERTA','Todos los campos son obligatorios!.');
      return
    }

    this.modalCtrl.dismiss({correo:this.correo})
  }

  verificar(){
    this.verificarCodigo!=this.verificarCodigo;
 
  }

  cambiarContra(){


    if(this.confirmarContrasena != this.contrasena){

      this.alertasService.message('FUTPLAY','Las contraseñas deben de coincidir');
    }else{

      
      let userInfo = {
        email:this.correo,
        password: bcrypt.hashSync(this.contrasena, 10)
      }
      this.usuariosService.syncPutUserPasswordToPromise(userInfo).then((resp:any) =>{
        this.alertasService.message('app', resp.message)
        this.cerrarModal();
        console.log(resp)
      }, error =>{
        this.alertasService.message('app', 'Lo sentimos algo salio mal')
      })
    }
  }

  verificarCodigos(){

    this.alertasService.presentaLoading('Validando información..')
    this.usuariosService.syncPostTokenVerification( {
      token:this.codigo,
      email:this.correo
    }).then((resp:any) =>{
    
      console.log('resp', resp)
    this.alertasService.loadingDissmiss();
      if(resp.passwordReset.token == this.codigo){
      //  this.changePassword(data.email);
    this.cambiarContrasena = true;
      }else{
        this.alertasService.loadingDissmiss();
        this.alertasService.message('Mi Enfermera','Codigo incorrecto.');
        return;
      }
    })
  }

  recuperar(){

    let token = String(new Date().getHours()) + String(new Date().getMinutes()) +String(new Date().getMilliseconds());
    let item = {
      "body": {
              "email":this.correo,
              "token":token
              }
         
    }
    this.alertasService.presentaLoading('Verificando informacion.')
          this.usuariosService.syncPostForgotPassword(item).then((resp:any) =>{
    console.log(resp,'res')
    this.verificarCodigo = true;
    this.alertasService.loadingDissmiss();
    if(!resp.error){

     // this.securityCode(data.correo)
    }
    
            this.alertasService.message('app', resp.message)
          }, error =>{
            this.alertasService.loadingDissmiss();
            this.alertasService.message('App','Lo sentimos algo salio mal.')
          })
  }

}
