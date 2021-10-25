import { Component, OnInit } from '@angular/core';
import { CameraOptions, Camera } from '@ionic-native/camera/ngx';
import { ModalController } from '@ionic/angular';
import { ClubService } from '../../services/club.service';
declare const window: any;
@Component({
  selector: 'app-club-picture-upload',
  templateUrl: './club-picture-upload.page.html',
  styleUrls: ['./club-picture-upload.page.scss'],
})
export class ClubPictureUploadPage implements OnInit {
  tempImages: String[]=[];
  image = '';
  constructor(private camera: Camera, private modalCtrl: ModalController, private clubs: ClubService) { }

  ngOnInit() {
  }

  async pictureUpload() {
    const modal = await this.modalCtrl.create({
      component: ClubPictureUploadPage,
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
      this.clubs.switchClub.foto = img;
      this.image = img;
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
      this.clubs.switchClub.foto = img;
      this.image = img;
      console.log(this.tempImages);
     }, (err) => {
      // Handle error
     });
  }

  cerrarModal(){
    this.modalCtrl.dismiss();
  }

}
