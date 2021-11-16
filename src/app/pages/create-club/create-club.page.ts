import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { DataService } from '../../services/data.service';
import { ClubService } from '../../services/club.service';
import { Club } from 'src/app/models/club';
import { ProvinciasService } from '../../services/provincias.service';
import { CantonesService } from 'src/app/services/cantones.service';
import { DistritosService } from 'src/app/services/distritos.service';
import { UserService } from 'src/app/services/user.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
declare const window: any;  
@Component({
  selector: 'app-create-club',
  templateUrl: './create-club.page.html',
  styleUrls: ['./create-club.page.scss'],
})
export class CreateClubPage implements OnInit {
  tempImages: String[]=[];
  image = '';

  constructor(public modalCtrl: ModalController, public data: DataService, public clubService: ClubService, public provincias: ProvinciasService, public cantones: CantonesService, public distritos: DistritosService, public usuario: UserService,public camera: Camera, public clubs: ClubService) { }

club = {
   clubID: this.clubs.club.length + 1,
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
  onSubmit(formulario: NgForm){
    this.clubService.club.push(new Club(this.club.cantonID,this.club.usuarioID,this.club.provinciaID,this.club.cantonID,this.club.distritoID,this.club.foto,this.club.nombre,this.club.abreviacion,this.club.direccion, new Date()));
    console.log(this.club, this.clubService.club.length);
    this.clubService.checkIfHasClub();
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
