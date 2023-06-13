import { Injectable } from '@angular/core';
import { CanLoad, Router} from '@angular/router';
import {filter,map,take} from 'rxjs/operators';
import { UsuariosService } from '../services/usuarios.service';
import { AuthenticationService } from '../services/autenticacion.service';
import { StorageService } from '../services/storage-service';
 

@Injectable({
  providedIn: 'root'
})
export class AutoLoginGuard implements CanLoad {
  constructor(

    public usuariosService:UsuariosService,
    public authenticationService:  AuthenticationService,
    public router: Router,
    public storageService: StorageService

  ){}
  canLoad(): any{


  if(!this.usuariosService.usuarioActual){

    this.storageService.get('usuario').then(usuario =>{

      console.log('autologin user', usuario)
      this.usuariosService.usuarioActual = usuario;
      if(this.usuariosService.usuarioActual){
        this.authenticationService.loadToken(true)
        this.router.navigateByUrl('/futplay/mis-reservaciones', {replaceUrl:true});
      }else{
       // this.authenticationService.googleSignOut();
        this.authenticationService.isAuthenticated.next(false);
   //   this.router.navigateByUrl('/login', {replaceUrl:true});
      
        return 
        
      }
    });


 
 
  }

  return true;
}
}
