import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { HttpClient } from '@angular/common/http';

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
  constructor(private http: HttpClient) {
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



}
