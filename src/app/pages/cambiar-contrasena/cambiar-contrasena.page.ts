import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertasService } from 'src/app/services/alertas.service';
import * as bcrypt from 'bcryptjs';  // npm install bcryptjs --save  &&  npm install @types/bcrypt --save-dev
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';
import { ValidacionFormularioPipe } from 'src/app/pipes/validacion-formulario.pipe';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.page.html',
  styleUrls: ['./cambiar-contrasena.page.scss'],
})
export class CambiarContrasenaPage {
  Contrasena = '';
  ConfirmarContrasena = '';
  constructor(
    public alertasService:AlertasService,
    public usuariosService:UsuariosService,
    public router:Router,
    private translateService: TranslateService
  ) { }

 async  ionViewWillEnter() {
 
 
this.limpiarDatos();
  }
  limpiarDatos(){
    this.Contrasena = '';
    this.ConfirmarContrasena = '';
  }
  async cambiarContrasena(fCambiarContrasena:NgForm){
 

let continuar = await ValidacionFormularioPipe.prototype.transform(fCambiarContrasena);
if(!continuar)  return this.alertasService.message('FUTPLAY',this.translateService.instant('ALL_FIELDS_REQUIRED'));
let data = fCambiarContrasena.value;
if(data.Contrasena.length < 8) return this.alertasService.message('FUTPLAY', this.translateService.instant('MIN_PASSWORD_LENGTH'))
this.alertasService.presentaLoading(this.translateService.instant('UPDATING_PASSWORD'))

this.Contrasena = data.Contrasena;
this.ConfirmarContrasena = data.ConfirmarContrasena;
 
    if(this.Contrasena != this.ConfirmarContrasena){
      this.alertasService.loadingDissmiss();
      this.alertasService.message('FUTPLAY', this.translateService.instant('PASSWORDS_DO_NOT_MATCH'))
    }else{

      
      let userInfo = {
        email:this.usuariosService.CorreoVerificacion,
        password: bcrypt.hashSync(this.Contrasena, 10)
      }
      this.usuariosService.syncPutUserPasswordToPromise(userInfo).then(async(resp:any) =>{
        
        let usuario  = await this.usuariosService.loginURL(this.usuariosService.CorreoVerificacion).toPromise();
        this.usuariosService.usuarioActual = usuario;
        this.alertasService.pagina = 'reservaciones'
       await this.alertasService.loadingDissmiss();
       this.alertasService.message('FUTPLAY', this.translateService.instant('PASSWORD_CHANGED_SUCCESSFULLY'))
        this.router.navigateByUrl('/futplay/reservaciones',{replaceUrl:true})
      }, error =>{
        this.alertasService.loadingDissmiss();
        this.alertasService.message('FUTPLAY', this.translateService.instant('SOMETHING_WENT_WRONG'))
      })
    }
  }

}
