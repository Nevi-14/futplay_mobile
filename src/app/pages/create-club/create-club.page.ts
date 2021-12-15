import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';

import { ProvinciasService } from '../../services/provincias.service';
import { CantonesService } from 'src/app/services/cantones.service';
import { DistritosService } from 'src/app/services/distritos.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { EquiposService } from 'src/app/services/equipos.service';
import { Equipos } from 'src/app/models/equipos';
declare const window: any;  
@Component({
  selector: 'app-create-club',
  templateUrl: './create-club.page.html',
  styleUrls: ['./create-club.page.scss'],
})
export class CreateClubPage implements OnInit {
  tempImages: String[]=[];
  image = '';

  constructor(public modalCtrl: ModalController, public clubService: EquiposService, public provincias: ProvinciasService, public cantones: CantonesService, public distritos: DistritosService, public usuario: UsuariosService,public camera: Camera) { }

club = {
   equipoID: this.clubService.club.length + 1,
   usuarioID: this.usuario.currentUser.usuarioID,
   provinciaID: null,
   cantonID: null,
   distritoID: null,
   foto: '../assets/clubs/soccer.png',
   nombre: '',
   abreviacion: '',
   direccion: ''
}
  ngOnInit() {
   console.log(this.club.distritoID)
  }
  enviarFormulario(){
    //this.clubService.club.push(new Equipos(this.club.cantonID,this.club.usuarioID,this.club.provinciaID,this.club.cantonID,this.club.distritoID,this.club.foto,this.club.nombre,this.club.abreviacion, new Date(),'../assets/icons/sad.svg',1));
    console.log(this.club, this.clubService.club.length);
//    this.clubService.checkIfHasClub();
    this.modalCtrl.dismiss();
  }
  cerrarModal(){
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
