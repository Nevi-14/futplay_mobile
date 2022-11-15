import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { NgForm } from '@angular/forms';
import { IonSlides, ModalController } from '@ionic/angular';
import { ProvinciasService } from '../../services/provincias.service';
import { CantonesService } from '../../services/cantones.service';
import { DistritosService } from '../../services/distritos.service';

import { format, parseISO } from 'date-fns';
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
public router: Router,
public usuariosServicio: UsuariosService,
public modalCtrl: ModalController,


  ) { }

  formatDate(value: string) {
    return format(parseISO(value), 'MMM dd yyyy');
  }

  

 
  ionViewWillEnter() {

    this.loginUser = {
      email: '',
      password: ''
      
      }



  }


login(fLogin: NgForm){

  if(fLogin.invalid) {return;}
console.log(fLogin.valid);

this.usuariosServicio.syncLogin(this.loginUser.email, this.loginUser.password);


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
