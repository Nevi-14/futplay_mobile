import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { PosicionesService } from '../../services/posiciones.service';

import { PerfilUsuario } from '../../models/perfilUsuario';

@Component({
  selector: 'app-profile-component',
  templateUrl: './profile-component.html',
  styleUrls: ['./profile-component.scss'],
})

export class ProfileComponent  {

  @Input() menu : boolean;
  @Input() modalMenu : boolean;
  @Input() usuario: PerfilUsuario
  age = null;

  darkMode: boolean;
  constructor(public userService: UsuariosService, public modalCtrl: ModalController, public globalService: GlobalService, public posicionesService: PosicionesService) { 
  
    if(!this.darkMode){
     // this.globalService.darkMode = !this.globalService.darkMode;
    }
  }


  ngOnInit() {
    const today = new Date();
    const birthday = new Date(this.usuario.Fecha_Nacimiento);
    this.age = today.getFullYear() - birthday.getFullYear();
    
    
  }
cerrarModal(){

  this.modalCtrl.dismiss();
}

profilePosicion(id){
const i = this.posicionesService.posiciones.findIndex(posicion => posicion.posicionID === id);

console.log(i, this.posicionesService.posiciones[i])
if(i >=0){
  return this.posicionesService.posiciones[i].nombre
}
}


cambio() {

  // const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  document.body.classList.toggle( 'dark' );
  const prefersDark = document.body.classList.contains('dark');
    this.darkMode =  !this.globalService.darkMode;
  //  this.userService.currentUser.customMode = !this.userService.currentUser.customMode;
if(!prefersDark){
  this.globalService.darkMode = prefersDark;
  this.globalService.icon = 'sunny-outline'
  this.globalService.mode ='Modo claro'
}else{
  //this.globalService.darkMode = prefersDark;
  this.globalService.icon = 'moon-outline'
  this.globalService.mode ='Modo oscuro'
}
}


  

}
