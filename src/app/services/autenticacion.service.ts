import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
//import { StorageService } from './storage-service';


import { AlertasService } from './alertas.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ModalController } from '@ionic/angular';
const TOKEN_KEY = 'my-token';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
token = ''; 

  constructor(
//private storageService:StorageService,
private http: HttpClient,
private router: Router,
public alertasService:AlertasService,
public userService:UsuariosService,
public modalCtrl:ModalController

  ) {
this.loadToken(false);


   }
   async loadToken(token){
    if(token){
      this.isAuthenticated.next(true);
    }else{
      this.isAuthenticated.next(false);
      
      
    }

   }

   login(){

    this.isAuthenticated.next(true);

   }

   logout(){
    this.isAuthenticated.next(false);
    this.router.navigateByUrl('/inicio-sesion')
/**
 *     this.storageService.delete(TOKEN_KEY).then(item =>{
      console.log('logged out')
    
          })
 */
    
   }

   deleteAccount(){

    
    this.userService.syncDeleteUserToPromise(this.userService.usuarioActual.Correo).then(user=>{
      this.userService.usuarioActual = null;
      this.modalCtrl.dismiss();
      this.alertasService.message('FUTPLAY', 'La cuenta se elimino con éxito!.')
      this.router.navigateByUrl('/inicio-sesion')
    })



    this.isAuthenticated.next(false);
/**
 *     this.storageService.delete('has-seen').then(item =>{
      console.log('deleted')

    this.storageService.delete(TOKEN_KEY).then(item =>{
      console.log('deleted')
          })
      
          })
 */
          this.router.navigateByUrl('/inicio/inicio-sesion',{replaceUrl:true})
         

   }
}
