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
  fechaNac: null ,
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
   this.user.push( new Usuario(2,2,1,1,1,'../assets/profile/nopicture.svg','Application','Admin','User',new Date('2000-03-21'),'','Heredia, Santo Domingo','admin@gmail.com','admin',0));
   this.user.push( new Usuario(3,3,1,1,1,'../assets/profile/nopicture.svg','Application','Regular','User',new Date('1987-09-12'),'','Heredia, Santo Domingo','regular@gmail.com','regular',0));
  }

  editUser(id: number, user){

    for( let i = 0; i < this.user.length ; i++){  
      if(this.user[i].usuarioID ===id ){
        this.user[i].nombre = user.nombre;
        this.user[i].apellido1 = user.apellido1;
        this.user[i].apellido2 = user.apellido2;
        this.user[i].correo = user.correo;
        this.user[i].telefono = user.telefono;
        this.user[i].fechaNac = new Date(user.fechaNac);
        this.user[i].provinciaID = user.provinciaID;
        this.user[i].distritoID = user.distritoID;
        this.user[i].cantonID = user.cantonID;
        this.user[i].direccion = user.direccion;
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



}
