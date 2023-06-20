import { Component, ViewChild } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AlertasService } from 'src/app/services/alertas.service';
import { Router } from '@angular/router';
import { ValidacionFormularioPipe } from 'src/app/pipes/validacion-formulario.pipe';
@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage {
  @ViewChild('fInicioSesion') loginForm: NgForm
  loginUser = {
    email: '',
    password: ''
  }
  constructor(
    public usuariosServicio: UsuariosService,
    public modalCtrl: ModalController,
    public alertasService: AlertasService,
    public router:Router
  ) { }

  ionViewWillEnter() {
    this.limpiarDatos()
  }

  limpiarDatos() {
    this.loginUser.email = null;
    this.loginUser.password = null;
  }

 
 async login(fInicioSesion: NgForm) {
  this.usuariosServicio.usuarioActual = null;
  
    let login = fInicioSesion.value;
    let continuar = await ValidacionFormularioPipe.prototype.transform(fInicioSesion);
    if(!continuar)  return this.alertasService.message('FUTPLAY','Todos los campos son obligatorios!');
      this.loginUser.email = login.email;
      this.loginUser.password = login.password;
        this.usuariosServicio.syncLogin(this.loginUser.email, this.loginUser.password);
 


  }

}