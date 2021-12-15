import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProvinciasService } from '../../services/provincias.service';
import { CantonesService } from '../../services/cantones.service';
import { DistritosService } from '../../services/distritos.service';

import { NgForm } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { EquiposService } from 'src/app/services/equipos.service';
import { Equipos } from 'src/app/models/equipos';
declare const window: any;
@Component({
  selector: 'app-club-config',
  templateUrl: './club-config.page.html',
  styleUrls: ['./club-config.page.scss'],
})
export class ClubConfigPage implements OnInit {
  @Input() club: Equipos;
  clubInfo = {
    clubID: this.clubs.switchClub.equipoID,
    usuarioID: this.clubs.switchClub.usuarioID,
    provinciaID: this.clubs.switchClub.provinciaID,
    cantonID: this.clubs.switchClub.cantonID,
    distritoID: this.clubs.switchClub.distritoID,
    foto: this.clubs.switchClub.foto,
    nombre: this.clubs.switchClub.nombre,
    abreviacion: this.clubs.switchClub.abreviacion,

 }
 tempImages: String[]=[];
 image = '';
  constructor(public modalCtrl: ModalController, public provincias: ProvinciasService, public cantones: CantonesService, public distritos: DistritosService, public clubs: EquiposService,public camera: Camera) { }

  ngOnInit() {
    console.log(this.club.provinciaID);
  }
  cerrarModal(){
this.modalCtrl.dismiss();
  }
  enviarFormulario(){
    this.clubs.editClub(this.club.equipoID, this.club);
    this.modalCtrl.dismiss();
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
    this.club.foto = img;

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
    this.club.foto = img;
    
    console.log(this.tempImages);
   }, (err) => {
    // Handle error
   });
}


}
