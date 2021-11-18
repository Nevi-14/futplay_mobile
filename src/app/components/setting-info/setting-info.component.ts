import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { ProfileInfoPage } from '../../pages/profile-info/profile-info.page';
import { PasswordPage } from '../../pages/password/password.page';
import { PaymentMethodPage } from '../../pages/payment-method/payment-method.page';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { JugadoresPosicionesService } from '../../services/jugador-posiciones.service';

@Component({
  selector: 'app-setting-info',
  templateUrl: './setting-info.component.html',
  styleUrls: ['./setting-info.component.scss'],
})
export class SettingInfoComponent implements OnInit {
  usuario = {
    usuarioID: null,
    roleID: null,
    provinciaID: null,
    cantonID: null,
    distritoID: null,
    foto: '',
    nombre:'',
    apodo:'',
    apellido1: '',
    apellido2: '',
    fecha: null,
    fechaNac: null,
    telefono: '',
    direccion: '',
    correo: '',
    contrasena: '',
    confirmarContrasena: '',
    intentos: null,
    
};

jugadorCurrentPosicion = {
  jugadorID: null,
  usuarioID:null,
  posicionID:null,
  apodo:'',
}
  constructor(public  modalCtrl: ModalController, public popOverCtrl: PopoverController, public route: Router, public userService: UserService, public jugadoresPosiciones: JugadoresPosicionesService) { }

  ngOnInit() {}
  async profileInfo() {
    const modal = await this.modalCtrl.create({
      component: ProfileInfoPage,
      cssClass: 'my-custom-class'
    });
    await this.popOverCtrl.dismiss();
    return await modal.present();
  }
  async password() {
    const modal = await this.modalCtrl.create({
      component: PasswordPage,
      cssClass: 'my-custom-class'
    });
    await this.popOverCtrl.dismiss();
    return await modal.present();
  }
  async paymentMethod() {
    const modal = await this.modalCtrl.create({
      component: PaymentMethodPage,
      cssClass: 'my-custom-class'
    });
    await this.popOverCtrl.dismiss();
    return await modal.present();
  }

  logOut(){
     this.popOverCtrl.dismiss();
     this.userService.currentUser = this.usuario;
     this.userService.userProfile = this.usuario;
     this.jugadoresPosiciones.jugadorCurrentPosicion = this.jugadorCurrentPosicion;

console.log(this.userService.currentUser,this.userService.userProfile)
    this.route.navigate([ '/inicio/login']);
  }

}
