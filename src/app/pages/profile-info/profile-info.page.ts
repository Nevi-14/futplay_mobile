import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { PosicionesService } from '../../services/posiciones.service';
import { CantonesService } from 'src/app/services/cantones.service';
import { ProvinciasService } from 'src/app/services/provincias.service';
import { DistritosService } from 'src/app/services/distritos.service';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { UsuariosService } from 'src/app/services/usuarios.service';
declare const window: any;
@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.page.html',
  styleUrls: ['./profile-info.page.scss'],
})
export class ProfileInfoPage implements OnInit {
  tempImages: String[]=[];
image = '';
  user = {
    usuarioID: this.userService.currentUser.usuarioID,
    provinciaID:this.userService.currentUser.provinciaID,
    cantonID:this.userService.currentUser.cantonID,
    distritoID:this.userService.currentUser.distritoID,
    foto:this.userService.currentUser.foto,
    nombre: this.userService.currentUser.nombre,
    apodo: this.userService.currentUser.apodo,
    posicion: this.userService.currentUser.posicion,
    apellido1:this.userService.currentUser.apellido1,
    apellido2:this.userService.currentUser.apellido2,
    fechaNac: new Date(this.userService.currentUser.fechaNac).toISOString(),
    telefono:this.userService.currentUser.telefono,
    correo:this.userService.currentUser.correo,
    contrasena: this.userService.currentUser.contrasena,
    intentos: this.userService.currentUser.intentos
  };


  constructor( public modalCtrl: ModalController, public userService: UsuariosService, public toastCtrl: ToastController, public alertCtrl: AlertController, public route: Router, public posiciones: PosicionesService, public cantones: CantonesService, public provincias: ProvinciasService,public distritos: DistritosService,public camera: Camera) { }

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


async enviarFormulario(){
this.userService.editUser(this.user.usuarioID, this.user);

//this.jugadoresPosiciones.editJugadorPosiciones(this.user.usuarioID, this.jugadorPosicion);
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



uploadCamera(){
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true,
    sourceType: this.camera.PictureSourceType.CAMERA
  };
  this.camera.getPicture(options).then((imageData) => {
    // imageData is either a base64 encoded string or a file URI
    // If it's base64 (DATA_URL):
    const img = window.Ionic.WebView.convertFileSrc(imageData);
    this.tempImages.push(img);
    this.user.foto = img;
    this.userService.currentUser.foto = img;
    console.log(this.tempImages);
   }, (err) => {
    // Handle error
   });
}
uploadPictures(){
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
  };
  this.camera.getPicture(options).then((imageData) => {
    // imageData is either a base64 encoded string or a file URI
    // If it's base64 (DATA_URL):
    const img = window.Ionic.WebView.convertFileSrc(imageData);
    this.tempImages.push(img);
    this.userService.currentUser.foto = img;
    this.user.foto = img;
    
    console.log(this.tempImages);
   }, (err) => {
    // Handle error
   });
}
}
