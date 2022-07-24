import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { RecuperarContrasenaPage } from '../recuperar-contrasena/recuperar-contrasena.page';
import { AlertasService } from 'src/app/services/alertas.service';
import { VideoScreenPage } from '../video-screen/video-screen.page';
import { GoogleAdsService } from 'src/app/services/google-ads.service';
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

showPass = false;
lock = false;
loginUser:login;

  constructor(
public usuariosServicio: UsuariosService,
public modalCtrl: ModalController,
public alertasService: AlertasService,
public googleAddService: GoogleAdsService


  ) { }



  ionViewWillEnter(){
  //  this.googleAddService.showBanner();
    this.limpiarDatos()
  } 

  limpiarDatos(){

    this.lock = false;
    this.loginUser = {
      email: "",
      password: ""
      
      }
      this.showPass = false;

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


}
