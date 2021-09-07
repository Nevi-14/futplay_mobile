import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UserService {
user: Usuario[] = [];
currentUser = {
  usuarioID: null,
  roleID: null,
  provinciaID:null,
  cantonID:null,
  distritoID:null,
  foto:'',
  nombre:'',
  apellido1:'',
  apellido2:'',
  fechaNac: new Date(),
  telefono:'',
  direccion:'',
  correo:'',
  contrasena: '',
  intentos: 0
};
age = 0;
  constructor() {
  }
  loggedUser(user){
this.currentUser = user;
const today = new Date();
const birthday = new Date(user.fechaNac);
this.age = today.getFullYear() - birthday.getFullYear();
  }


  addUsers(){
  //  alert(new Date('2021-08-14'))
   this.user.push( new Usuario(1,1,1,1,1,'../assets/profile/nopicture.svg','Super','Admin','User',new Date('1996-08-14'),'','Heredia, Santo Domingo','superadmin@gmail.com','superadmin',0));
   this.user.push( new Usuario(1,2,1,1,1,'../assets/profile/nopicture.svg','Application','Admin','User',new Date('2000-03-21'),'','Heredia, Santo Domingo','admin@gmail.com','admin',0));
   this.user.push( new Usuario(1,3,1,1,1,'../assets/profile/nopicture.svg','Application','Regular','User',new Date('1987-09-12'),'','Heredia, Santo Domingo','regular@gmail.com','regular',0));
  }



}
