import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Club } from '../../models/club';
import { ProvinciasService } from '../../services/provincias.service';
import { CantonesService } from '../../services/cantones.service';
import { DistritosService } from '../../services/distritos.service';
import { ClubService } from '../../services/club.service';
import { NgForm } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
declare const window: any;
@Component({
  selector: 'app-club-config',
  templateUrl: './club-config.page.html',
  styleUrls: ['./club-config.page.scss'],
})
export class ClubConfigPage implements OnInit {
  @Input() club: Club;
  clubInfo = {
    clubID: this.clubs.switchClub.clubID,
    usuarioID: this.clubs.switchClub.usuarioID,
    provinciaID: this.clubs.switchClub.provinciaID,
    cantonID: this.clubs.switchClub.cantonID,
    distritoID: this.clubs.switchClub.distritoID,
    foto: this.clubs.switchClub.foto,
    nombre: this.clubs.switchClub.nombre,
    abreviacion: this.clubs.switchClub.abreviacion,
    direccion: this.clubs.switchClub.direccion
 }
 tempImages: String[]=[];
 image = '';
  constructor(private modalCtrl: ModalController, private provincias: ProvinciasService, private cantones: CantonesService, private distritos: DistritosService, private clubs: ClubService,private camera: Camera) { }

  ngOnInit() {
    console.log(this.club.provinciaID);
  }
  cerrarModal(){
this.modalCtrl.dismiss();
  }
  onSubmit(formulario: NgForm){
    this.clubs.editClub(this.club.clubID, this.club);
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
