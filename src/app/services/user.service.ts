import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { ProfilePage } from '../pages/profile/profile.page';
import { JugadorPosiciones } from '../models/jugadorPosiciones';
import { JugadoresPosicionesService } from './jugador-posiciones.service';
import { ProfileComponent } from '../components/profile-component/profile-component';
import { SettingInfoComponent } from '../components/setting-info/setting-info.component';
import { ProfileInfoPage } from '../pages/profile-info/profile-info.page';
import { PasswordPage } from '../pages/password/password.page';
import { PaymentMethodPage } from '../pages/payment-method/payment-method.page';
import { Router } from '@angular/router';
import { JugadoresService } from './jugadores.service';
import { JugadoresClubesService } from './jugador-clubes.service';
import { SolicitudesService } from './solicitudes.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
user: Usuario[] = [];
currentUser : Usuario;
userProfile : Usuario;
userPosition: JugadorPosiciones;
switchUser: Usuario;
age = 0;
  constructor(private http: HttpClient, private modalCtrl: ModalController, private jugadorPosicion: JugadoresPosicionesService, public route: Router, public jugadoresService: JugadoresService, public jugadoresClubesService: JugadoresClubesService, public solicitudesService: SolicitudesService) {
  }

  usuario = {
    usuarioID: null,
    roleID: null,
    provinciaID: null,
    cantonID: null,
    distritoID: null,
    foto: '',
    nombre:'',
    apodo:'',
    apellido1: '',
    apellido2: '',
    fecha: null,
    fechaNac: null,
    telefono: '',
    direccion: '',
    correo: '',
    contrasena: '',
    confirmarContrasena: '',
    intentos: null,
    
};

jugadorCurrentPosicion = {
  jugadorID: null,
  usuarioID:null,
  posicionID:null,
  apodo:'',
}


  loggedUser(user){
this.currentUser = user;
const today = new Date();
const birthday = new Date(user.fechaNac);
this.age = today.getFullYear() - birthday.getFullYear();
  }

  getUsers(){
    this.http.get<Usuario[]>('/assets/json/users.json').subscribe(resp=>{
    if(resp){
     this.user = resp;
    }else{
      console.log('Error clubes roles');
    }
   });
 }

  swapUser(userID: number) {
  for (let i = 0; i < this.user.length; i++) {
    if (this.user[i].usuarioID === userID) {
      this.userProfile = this.user[i];
     this.jugadorPosicion.jugadorCurrentP(this.user[i].usuarioID)
    }

  }
  console.log('perfil swap', this.userProfile)
}
async show(userID){

  const modal = await this.modalCtrl.create({
    component: ProfileComponent,
    backdropDismiss: true,
    cssClass: 'informative-modal',
    componentProps:{
      menu: false
    }
  });
  modal.onDidDismiss().then((data) => {
    
   this.userProfile = this.currentUser;
});
this.swapUser(userID);
  return await modal.present();
}
async verUsuario(userID){

  const modal = await this.modalCtrl.create({
    component: ProfileComponent,
    backdropDismiss: true,
    cssClass: 'informative-modal',
    componentProps:{
      menu: false
    }
  });
  modal.onDidDismiss().then((data) => {
    
   this.userProfile = this.currentUser;
});
this.swapUser(userID);
  return await modal.present();
}
async editarPeril(){

  const modal = await this.modalCtrl.create({
    component: SettingInfoComponent,
    cssClass: 'bottom-modal',
    backdropDismiss: true
    

  });
  return await modal.present();
}
cerrarModal(){
if(this.modalCtrl){
  this.modalCtrl.dismiss();
}
}

  editUser(id: number, user){

    for( let i = 0; i < this.user.length ; i++){  
      if(this.user[i].usuarioID ===id ){
        this.user[i].nombre = user.nombre;
        this.user[i].apellido1 = user.apellido1;
        this.user[i].apellido2 = user.apellido2;
        this.user[i].correo = user.correo;
        this.user[i].foto = user.foto;
        this.user[i].telefono = user.telefono;
        this.user[i].fechaNac = new Date(user.fechaNac);
        this.user[i].provinciaID = user.provinciaID;
        this.user[i].distritoID = user.distritoID;
        this.user[i].cantonID = user.cantonID;
        this.user[i].direccion = user.direccion;
      } 

    }

  }
  
  editUserPassword(id: number, credentials){
    for( let i = 0; i < this.user.length ; i++){  
      if(this.user[i].usuarioID ===id ){
        this.user[i].contrasena = credentials.new;
        console.log(credentials.password)
        console.log(this.user[i].contrasena);
      } 

    }

  }
  deleteUser(id:number){
    for( let i = 0; i < this.user.length ; i++){  
      if(this.user[i].usuarioID ===id ){
        console.log(this.user[i]);
        this.user.splice(i,1);
      }
          }
  }

  validateEmail(email) {
    const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regularExpression.test(String(email).toLowerCase());
   }



   async profileInfo() {
    this.modalCtrl.dismiss();
    const modal = await this.modalCtrl.create({
      component: ProfileInfoPage,
      cssClass: 'my-custom-class'
    });
   
    return await modal.present();
  }
  async password() {
    const modal = await this.modalCtrl.create({
      component: PasswordPage,
      cssClass: 'my-custom-class'
    });
    this.modalCtrl.dismiss();
    return await modal.present();
  }
  async paymentMethod() {
    const modal = await this.modalCtrl.create({
      component: PaymentMethodPage,
      cssClass: 'my-custom-class'
    });
    this.modalCtrl.dismiss();
    return await modal.present();
  }

  logOut(){
     this.modalCtrl.dismiss();
     this.currentUser = this.usuario;
     this.userProfile = this.usuario;
     this.jugadorCurrentPosicion = this.jugadorCurrentPosicion;

console.log(this.currentUser,this.userProfile)
    this.route.navigate([ '/inicio/login']);
  }





}
