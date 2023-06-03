import { Component, ViewChild } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { NgForm } from '@angular/forms';
import { IonSlides, ModalController } from '@ionic/angular';
import { ProvinciasService } from '../../services/provincias.service';
import { CantonesService } from '../../services/cantones.service';
import { DistritosService } from '../../services/distritos.service';
import { RecuperarContrasenaPage } from '../recuperar-contrasena/recuperar-contrasena.page';
@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage   {
  @ViewChild('slidePrincipal') slides: IonSlides;
  @ViewChild('fLogin') loginForm: NgForm
showPass = false;
loginUser = {
email: '',
password: ''
}
  constructor(
public provinciasService: ProvinciasService,
public cantonesService: CantonesService,
public distritosService: DistritosService,
public usuariosServicio: UsuariosService,
public modalCtrl: ModalController,
  ) { }

  ionViewWillEnter(){  
    this.limpiarDatos()
}

  limpiarDatos(){
    this.loginUser.email =  null;
    this.loginUser.password = null;
  }

login(fLogin: NgForm){
 
 if(fLogin.invalid) {return;}
 this.loginUser.email = fLogin.value.email ;
 this.loginUser.password =  fLogin.value.password ;
 console.log(fLogin,'login', this.loginUser)
this.usuariosServicio.syncLogin(this.loginUser.email, this.loginUser.password);
}
login2(fLogin: NgForm){
console.log(fLogin,'login', this.loginUser)
}
async recuperarContrasena(){
const modal = await this.modalCtrl.create({
component:RecuperarContrasenaPage,
backdropDismiss:false,
cssClass:'alert-modal',
mode:'ios'
});
return await modal.present();
}

}
