import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BrowserStack } from 'protractor/built/driverProviders';
import { GlobalService } from 'src/app/services/global.service';
import { OpcionesService } from 'src/app/services/opciones.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-profile-component',
  templateUrl: './profile-component.html',
  styleUrls: ['./profile-component.scss'],
})

export class ProfileComponent  {

  @Input() menu : boolean;
  @Input() modalMenu : boolean;

  darkMode: boolean;
  constructor(public userService: UsuariosService,public opcionesService: OpcionesService, public modalCtrl: ModalController, public globalService: GlobalService) { 
  
    if(!this.darkMode){
     // this.globalService.darkMode = !this.globalService.darkMode;
    }
  }

cerrarModal(){

  this.modalCtrl.dismiss();
}
cambio() {

  // const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  document.body.classList.toggle( 'dark' );
  const prefersDark = document.body.classList.contains('dark');
    this.darkMode =  !this.globalService.darkMode;
    this.userService.currentUser.customMode = !this.userService.currentUser.customMode;
if(!prefersDark){
  this.globalService.darkMode = prefersDark;
  this.globalService.icon = 'sunny'
  this.globalService.mode ='Modo claro'
}else{
  //this.globalService.darkMode = prefersDark;
  this.globalService.icon = 'moon'
  this.globalService.mode ='Modo oscuro'
}
}

}
