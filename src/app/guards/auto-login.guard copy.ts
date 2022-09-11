import { Injectable } from '@angular/core';
import { CanLoad, Router} from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import {filter,map,take} from 'rxjs/operators';
import { UsuariosService } from '../services/usuarios.service';
import { StorageService } from '../services/storage-service';
import { GestorImagenesService } from '../services/gestor-imagenes.service';

@Injectable({
  providedIn: 'root'
})
export class AutoLoginGuard implements CanLoad {
  constructor(
    private authenticationService:AuthenticationService,
    private router:Router,
    private usersService: UsuariosService,
    public storageService: StorageService,
    public gestormagenesService: GestorImagenesService
  ){}
  canLoad(): any{
 
    if(this.router.url == '/'){
      this.storageService.get('Cod_Usuario').then(Cod_Usuario =>{
     
        if(Cod_Usuario !=null){
          this.usersService.syncDatosToPromise(Cod_Usuario).then( usuario =>{

            this.usersService.usuarioActual = usuario[0];
            this.gestormagenesService.getImage();
      this.authenticationService.loadToken(true)

            this.router.navigateByUrl('/futplay/mi-perfil');
        return true
          });
        } else{
          this.usersService.usuarioActual = null;
        }
        
      
      })
      return true;
    }





  }

}
