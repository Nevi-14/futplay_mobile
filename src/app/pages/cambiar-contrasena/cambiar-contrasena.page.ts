import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertasService } from 'src/app/services/alertas.service';
import * as bcrypt from 'bcryptjs';  // npm install bcryptjs --save  &&  npm install @types/bcrypt --save-dev
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';
import { ValidacionFormularioPipe } from 'src/app/pipes/validacion-formulario.pipe';
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
    public router:Router
  ) { }

  ionViewWillEnter() {
 
this.limpiarDatos();
  }
  limpiarDatos(){
    this.Contrasena = '';
    this.ConfirmarContrasena = '';
  }
  async cambiarContrasena(fCambiarContrasena:NgForm){

let continuar = await ValidacionFormularioPipe.prototype.transform(fCambiarContrasena);
if(!continuar)  return this.alertasService.message('FUTPLAY','Todos los campos son obligatorios!');
this.alertasService.presentaLoading('Efectuado cambios!..')
let data = fCambiarContrasena.value;
this.Contrasena = data.Contrasena;
this.ConfirmarContrasena = data.ConfirmarContrasena;
    if(this.Contrasena != this.ConfirmarContrasena){
      this.alertasService.loadingDissmiss();
      this.alertasService.message('FUTPLAY','Las contraseñas deben de coincidir');
    }else{

      
      let userInfo = {
        email:this.usuariosService.CorreoVerificacion,
        password: bcrypt.hashSync(this.Contrasena, 10)
      }
      this.usuariosService.syncPutUserPasswordToPromise(userInfo).then(async(resp:any) =>{
        this.alertasService.message('app', resp.message)
        let user = await this.usuariosService.syncGetUsuario(resp.user.Cod_Usuario);
        this.usuariosService.usuarioActual = user;
        this.alertasService.pagina = 'reservaciones'
        this.alertasService.loadingDissmiss();
        this.router.navigateByUrl('/futplay/reservaciones',{replaceUrl:true})
      }, error =>{
        this.alertasService.loadingDissmiss();
        this.alertasService.message('app', 'Lo sentimos algo salio mal')
      })
    }
  }

}
