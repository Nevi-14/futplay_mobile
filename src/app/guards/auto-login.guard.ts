import { Injectable } from '@angular/core';
import { CanLoad, Router, UrlTree } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';
import { AuthenticationService } from '../services/autenticacion.service';
import { StorageService } from '../services/storage-service';
import { AlertasService } from '../services/alertas.service';
import { TranslateService } from '@ngx-translate/core';
 

@Injectable({
  providedIn: 'root'
})
export class AutoLoginGuard implements CanLoad {
  
  constructor(
    public usuariosService: UsuariosService,
    public authenticationService: AuthenticationService,
    public router: Router,
    public storageService: StorageService,
    public alertasService: AlertasService,
    private translateService: TranslateService

  ) { }
  canLoad(): any {
 

    if (!this.usuariosService.usuarioActual) {
      this.storageService.get('usuario').then(async (usuario) => {
     
        this.alertasService.loadingDissmiss();
     
  if(usuario){
    let usuarioDB =   await this.usuariosService.syncValidarCuenta(usuario.Correo);
    this.storageService.delete('usuario')
    this.storageService.set('usuario', usuarioDB)
 
      this.usuariosService.usuarioActual = usuarioDB;
  }else {

    return this.router.navigateByUrl('/inicio-sesion', { replaceUrl: true });
  
  }
  let urlTree: UrlTree= this.router.parseUrl(this.router.url);
  // Obtén el primer segmento de la URL
  let segment = urlTree.root.children['primary'].segments[1].path;
  // Establece el segmento en el servicio de alertas
  this.alertasService.segment = 'torneos';
 
        if(this.usuariosService.usuarioActual && this.usuariosService.usuarioActual.Idioma){
          if(this.usuariosService.usuarioActual.Idioma == 'US'){
            this.usuariosService.idioma = 'US';
            this.usuariosService.file = 'Ingles';
          }else{
            this.usuariosService.idioma = 'Es';
            this.usuariosService.file = 'Espanol';
          }
        }else{
          this.usuariosService.idioma = 'US';
          this.usuariosService.file = 'Ingles';
        }
        
        this.translateService.setDefaultLang(this.usuariosService.file);
        if (this.usuariosService.usuarioActual) {
      
         
    
          return this.router.navigateByUrl('/futplay/torneos', { replaceUrl: true });
        } 
      });

    }

    return true;
  }

 
 
cambiarIdioma(lng, file) {
  this.translateService.setDefaultLang(file);
 
}
}