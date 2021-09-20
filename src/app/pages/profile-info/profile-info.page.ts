import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { DataService } from '../../services/data.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.page.html',
  styleUrls: ['./profile-info.page.scss'],
})
export class ProfileInfoPage implements OnInit {
  user = {
    usuarioID: this.userService.currentUser.usuarioID,
    roleID: this.userService.currentUser.roleID,
    provinciaID:this.userService.currentUser.provinciaID,
    cantonID:this.userService.currentUser.cantonID,
    distritoID:this.userService.currentUser.distritoID,
    foto:this.userService.currentUser.foto,
    nombre: this.userService.currentUser.nombre,
    apellido1:this.userService.currentUser.apellido1,
    apellido2:this.userService.currentUser.apellido2,
    fechaNac: new Date(this.userService.currentUser.fechaNac).toISOString(),
    telefono:this.userService.currentUser.telefono,
    direccion:this.userService.currentUser.direccion,
    correo:this.userService.currentUser.correo,
    contrasena: this.userService.currentUser.contrasena,
    intentos: this.userService.currentUser.intentos
  };

  constructor(private data: DataService, private modalCtrl: ModalController, private userService: UserService, private toastCtrl: ToastController, private alertCtrl: AlertController, private route: Router) { }

  ngOnInit() {
 console.log(this.user);
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


async onSubmit(formulario: NgForm){
  this.userService.loggedUser(this.user);
this.userService.editUser(this.user.usuarioID, this.user);
this.message('Datos actualizados');


}

async deleteUser(id){

const alert = await this.alertCtrl.create({
header:'Borrar perfil',
message:'¿Desea borrar su perfil de usuario?',
buttons:[{
  text: 'SI',
  handler:()=>{
    this.userService.deleteUser(id);
    this.modalCtrl.dismiss();
    this.route.navigate(['/inicio/', 'login']);
  }
},
{
  text: 'NO',
  handler:()=>{
    console.log(id);
  }
}],
});
await alert.present();

}
}
