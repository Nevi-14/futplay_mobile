import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { DataService } from '../../services/data.service';
import { UserService } from '../../services/user.service';
import { PosicionesService } from '../../services/posiciones.service';
import { CantonesService } from 'src/app/services/cantones.service';
import { ProvinciasService } from 'src/app/services/provincias.service';
import { DistritosService } from 'src/app/services/distritos.service';
import { JugadoresClubesService } from 'src/app/services/jugador-clubes.service';
import { JugadoresPosicionesService } from 'src/app/services/jugador-posiciones.service';
import { PictureUploadPage } from '../picture-upload/picture-upload.page';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
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

  jugadorPosicion = {
    posicionID: this.jugadoresPosiciones.jugadorCurrentPosicion.posicionID,
    apodo:this.jugadoresPosiciones.jugadorCurrentPosicion.apodo,
  }
  constructor(private data: DataService, private modalCtrl: ModalController, private userService: UserService, private toastCtrl: ToastController, private alertCtrl: AlertController, private route: Router, private posiciones: PosicionesService, private cantones: CantonesService, private provincias: ProvinciasService,private distritos: DistritosService, private jugadoresPosiciones: JugadoresPosicionesService,private camera: Camera) { }

  ngOnInit() {
 console.log(this.jugadoresPosiciones.jugadorCurrentPosicion);

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
this.jugadoresPosiciones.editJugadorPosiciones(this.user.usuarioID, this.jugadorPosicion);
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

async pictureUpload() {
  const modal = await this.modalCtrl.create({
    component: PictureUploadPage,
    cssClass: 'my-custom-class'
  });
  return await modal.present();
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
    this.userService.currentUser.foto = img;
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
