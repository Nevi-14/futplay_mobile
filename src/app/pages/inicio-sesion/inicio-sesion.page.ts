import { Component, ViewChild } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AlertasService } from 'src/app/services/alertas.service';
import { Router } from '@angular/router';
import { ValidacionFormularioPipe } from 'src/app/pipes/validacion-formulario.pipe';
import { TranslateService } from '@ngx-translate/core';
import { ContactarDesarolladorPage } from '../contactar-desarollador/contactar-desarollador.page';
@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage {
  loginUser = {
    email: '',
    password: ''
  }
  @ViewChild('popover') popover;
  isOpen = false;
  isModalOpen = false;

  constructor(
    public usuariosServicio: UsuariosService,
    public modalCtrl: ModalController,
    public alertasService: AlertasService,
    public router: Router,
    private translateService: TranslateService,
  ) { }

  ionViewWillEnter() {
 
    this.limpiarDatos()
  }
  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }
  limpiarDatos() {
    this.loginUser.email = null;
    this.loginUser.password = null;
  }

  cambiarIdioma(lng, file) {
    this.usuariosServicio.idioma = lng;
    this.translateService.setDefaultLang(file);
    this.popover.dismiss();
  }
  async login(fInicioSesion: NgForm) {


    this.usuariosServicio.usuarioActual = null;
    let login = fInicioSesion.value;
    console.log('login', login)
    let continuar = await ValidacionFormularioPipe.prototype.transform(fInicioSesion);
    if (!continuar) return this.alertasService.message('FUTPLAY', 'Todos los campos son obligatorios!');
    this.loginUser.email = login.email;
    this.loginUser.password = login.password;
    this.usuariosServicio.syncLogin(this.loginUser.email, this.loginUser.password);

  }
 async contactDeveloper(){
 
    if (!this.isModalOpen){
      const modal = await this.modalCtrl.create({
        component: ContactarDesarolladorPage,
        backdropDismiss:false,
        cssClass:'alert-modal',
        mode:'md', 
 
    
      });
      this.isModalOpen = true;
  
       await modal.present();
       const { data } = await modal.onWillDismiss();
  
       this.isModalOpen = false;
    }

  }
}