import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';

import { AlertasService } from 'src/app/services/alertas.service';
import { GoogleAdsService } from 'src/app/services/google-ads.service';
import { RecuperarContrasenaPage } from '../recuperar-contrasena/recuperar-contrasena.page';
import { CambiarContrasenaPage } from '../cambiar-contrasena/cambiar-contrasena.page';
import { Email } from 'src/app/models/email';
import { EmailService } from 'src/app/services/email.service';

import { CodigoSeguridadPage } from '../codigo-seguridad/codigo-seguridad.page';
import { AuthenticationService } from '../../services/autenticacion.service';

interface login{
  email: string,
password: string
}
@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage implements OnInit {
cod_usuario = null;
contrasena = null;
codigo = null;
showPass = false;
lock = false;
loginUser:login;
email:Email = 
{
  ToEmail:'',
  Subject:'Recuperar Contraseña',
  Body:'Código de verificarión : '
}
  constructor(
public usuariosServicio: UsuariosService,
public modalCtrl: ModalController,
public alertasService: AlertasService,
public googleAddService: GoogleAdsService,
public emailService: EmailService,
public autenticacionservice: AuthenticationService


  ) { }



  ionViewWillEnter(){
    this.limpiarDatos()
  } 

  limpiarDatos(){
    this.cod_usuario = null;
    this.lock = false;
    this.loginUser = {
      email: "",
      password: ""
      
      }
      this.showPass = false;
      this.email = 
      {
        ToEmail:'',
        Subject:'Recuperar Contraseña',
        Body:'Código de verificarión : '
      }
  }
  loginDetails(){

    this.lock = !this.lock

    if(this.lock){
      this.loginUser.email = 'workemailnelson@gmail.com';
      this.loginUser.password = 'W3lcomeAb0ard!'
    }else{
      this.loginUser.email = '';
    this.loginUser.password = ''
    }

    
  }

  ngOnInit() {

    this.loginUser = {
      email: '',
      password: ''
      
      }

  }

  async send(){
    const modal = await this.modalCtrl.create({
      component:RecuperarContrasenaPage,
      cssClass:'modal-view',
      mode:'ios'
    });
    return await modal.present();
    
      }


login(fLogin: NgForm){
  console.log('fLogin', fLogin)

  if(fLogin.invalid) {return;}

if(this.loginUser.email == '' || this.loginUser.password == ''){
this.alertasService.message('FUTPLAY', 'Todos los campos son obligatorios')
return
}else{
  this.usuariosServicio.syncLogin(this.loginUser.email, this.loginUser.password);
}



}
async cambiarContrasena() {
  const modal = await this.modalCtrl.create({
    component: RecuperarContrasenaPage,
    breakpoints: [0, 0.5, 0.5, 0.8],
    initialBreakpoint: 0.5
  });
  await modal.present();

  const {data } = await modal.onDidDismiss();

  if(data != undefined){
  this.cod_usuario = data.usuario.Cod_Usuario;
  this.email.ToEmail = data.usuario.Correo;
    this.ingresarContrasena();

  }

}
async ingresarContrasena() {
  const modal = await this.modalCtrl.create({
    component: CambiarContrasenaPage,
    breakpoints: [0, 0.5, 0.5, 0.8],
    initialBreakpoint: 0.5
  });
  await modal.present();

  const {data } = await modal.onDidDismiss();

  if(data != undefined){


     this.contrasena = data.contrasena;

    let codigo = String(new Date().getHours()) + String(new Date().getMinutes()) +String(new Date().getMilliseconds());
    this.email.Body =  this.email.Body + codigo;
    this.alertasService.presentaLoading('Validando datos');

    this.emailService.syncToPromiseSendEmail(this.email).then(resp =>{
    this.alertasService.loadingDissmiss();
  /**
   *   this.autenticacionservice.actulizarTokenPromise(this.cod_usuario, codigo, new Date().getHours()).then(resp =>{
    this.securityCode();
    
    })
   */
    
    
      
    }, error =>{
      this.alertasService.loadingDissmiss();
      this.alertasService.message('Futplay','Lo sentimos algo salio mal!');
    
    })
 
    

  }

}
async securityCode() {
  const modal = await this.modalCtrl.create({
    component: CodigoSeguridadPage,
    breakpoints: [0, 0.5, 0.5, 0.8],
    initialBreakpoint: 0.5
  });
  await modal.present();

  const {data } = await modal.onDidDismiss();

  if(data != undefined){

    this.codigo = data.codigo;
    /**
     * this.autenticacionservice.actualizarContrasenaPromise(data.codigo, this.usuariosServicio.hashPassword(this.contrasena)).then(resp =>{
      this.codigo = '';
      this.contrasena = '';

      console.log('passwrd change', resp)

    this.alertasService.message('FUTPLAY', 'La contraseña se cambio con exito!.')
    
    
      })
     */


  }

}

}
