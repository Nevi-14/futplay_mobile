import { Injectable } from '@angular/core';
import { CanLoad, Router} from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import {filter,map,take} from 'rxjs/operators';
import { UsuariosService } from '../services/usuarios.service';
import { StorageService } from '../services/storage-service';

@Injectable({
  providedIn: 'root'
})
export class AutoLoginGuard implements CanLoad {
  constructor(
    private authenticationService:AuthenticationService,
    private router:Router,
    private usersService: UsuariosService,
    public storageService: StorageService
  ){}
  canLoad(): any{

    if(this.router.url == '/'){
      this.storageService.get('Cod_Usuario').then(Cod_Usuario =>{

        console.log(Cod_Usuario,'usuario Cod_Usuario')
   
        if(Cod_Usuario !=null){
          this.usersService.syncDatosToPromise(Cod_Usuario).then( usuario =>{

         
      this.authenticationService.loadToken(true)
            this.usersService.usuarioActual = usuario[0];
            this.router.navigateByUrl('/futplay/mi-perfil');
        return true
          });
        } 
        
      
      })
      return true;
    }





  }

  
}
