import { Component, ViewChild } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { NgForm } from '@angular/forms';
import { IonSlides, ModalController } from '@ionic/angular';
import { ProvinciasService } from '../../services/provincias.service';
import { CantonesService } from '../../services/cantones.service';
import { DistritosService } from '../../services/distritos.service';
import { RecuperarContrasenaPage } from '../recuperar-contrasena/recuperar-contrasena.page';
import { AlertasService } from 'src/app/services/alertas.service';
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
public alertasService:AlertasService
  ) { }

  ionViewWillEnter(){  
    this.limpiarDatos()
}

  limpiarDatos(){
    this.loginUser.email =  null;
    this.loginUser.password = null;
  }

login(fLogin: NgForm){
 let login = fLogin.value;
 let continuar = true;
  Object.keys(login).forEach((key, index) => {
    let keyValue = login[key];
    console.log('keyValue',keyValue)
    if( index > 0 &&  keyValue === null || index > 0 &&   keyValue === undefined || index > 0 &&  keyValue === '') continuar = false;
  if(index == Object.keys(login).length -1){
    if (!continuar) {
      return this.alertasService.message('FUTPLAY','Todos los campos son obligatorios!');
    } 
    this.loginUser.email = fLogin.value.email ;
    this.loginUser.password =  fLogin.value.password ;
    console.log(fLogin,'login', this.loginUser)
   this.usuariosServicio.syncLogin(this.loginUser.email, this.loginUser.password);
  }

  
    })

 
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
