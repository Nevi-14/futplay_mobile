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
  selector: 'app-create-equipo',
  templateUrl: './create-equipo.page.html',
  styleUrls: ['./create-equipo.page.scss'],
})
export class CreateClubPage implements OnInit {
  tempImages: String[]=[];
  image = '';

  constructor(public modalCtrl: ModalController, public equipoService: EquiposService, public provinciasService: ProvinciasService, public cantonesService: CantonesService, public distritosService: DistritosService, public usuario: UsuariosService,public camera: Camera) { }


equipo = {
   equipoID: 0 ,
   usuarioID:  this.usuario.usuarioActual.Cod_Usuario,
   provinciaID: null,
   cantonID: null,
   distritoID: null,
   foto: '',
   nombre: '',
   abreviacion: '',
   fecha: Date,
   estrellas: 0,
   dureza: '',
   Estado: 1,
   Descripcion_Estado: '',
}
  ngOnInit() {
    this.equipo.foto = 'assets/equipos/soccer.png';

   console.log(this.equipo.foto)
  }


 

  
  crearRegistro(fEquipo: NgForm){

  if(fEquipo.invalid) {return;}
console.log(fEquipo.valid, fEquipo );



}


  enviarFormulario(){
    //this.equipoService.equipo.push(new Equipos(this.equipo.cantonID,this.equipo.usuarioID,this.equipo.provinciaID,this.equipo.cantonID,this.equipo.distritoID,this.equipo.foto,this.equipo.nombre,this.equipo.abreviacion, new Date(),'../assets/icons/sad.svg',1));
 
//    this.equipoService.checkIfHasequipo();
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
      this.equipo.foto = img;
  
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
      this.equipo.foto = img;
      
      console.log(this.tempImages);
     }, (err) => {
      // Handle error
     });
  }
  

}
