import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {
  credentials = {
    password: '',
    new: '',
    confirm: ''

  };
  constructor(public modalCtrl: ModalController, public userService: UserService, public alertCtrl: AlertController) { }

  ngOnInit() {
  }

  cerrarModal(){
    this.modalCtrl.dismiss();
  }

  async message( text: string){
    this.modalCtrl.dismiss();
    const alert = await this.alertCtrl.create({
      header: 'Futplay',
      message: text,
    });
    alert.present();
  }
   onSubmit(formulario: NgForm){
   if(this.userService.currentUser.contrasena === this.credentials.password && this.credentials.new ===  this.credentials.confirm){
    this.userService.editUserPassword(this.userService.currentUser.usuarioID, this.credentials);
    this.message('Contraseña actualizada');
    }else{
      this.message('Las contraseñas no coinciden');
      }
}

}