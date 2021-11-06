import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { ProfilePage } from '../pages/profile/profile.page';
import { JugadorPosiciones } from '../models/jugadorPosiciones';
import { JugadoresPosicionesService } from './jugador-posiciones.service';

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
  constructor(private http: HttpClient, private modalCtrl: ModalController, private jugadorPosicion: JugadoresPosicionesService) {
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
    component: ProfilePage,
    cssClass: 'my-custom-class'
  });
  modal.onDidDismiss().then((data) => {
    
   this.userProfile = this.currentUser;
});
this.swapUser(userID);
  return await modal.present();
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

}
