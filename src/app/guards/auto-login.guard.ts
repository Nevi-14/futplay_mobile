import { Injectable } from '@angular/core';
import { CanLoad, Router} from '@angular/router';
import {filter,map,take} from 'rxjs/operators';
import { UsuariosService } from '../services/usuarios.service';
import { AuthenticationService } from '../services/autenticacion.service';
 

@Injectable({
  providedIn: 'root'
})
export class AutoLoginGuard implements CanLoad {
  constructor(

    public usuariosService:UsuariosService,
    public authenticationService:  AuthenticationService,
    public router: Router

  ){}
  canLoad(): any{

    
  if(this.usuariosService.usuarioActual){
 
    this.authenticationService.isAuthenticated.next(true)
    return true;
  }else{
    
    this.router.navigateByUrl('/inicio/inicio-sesion');
    return false
  
  }


}
}
