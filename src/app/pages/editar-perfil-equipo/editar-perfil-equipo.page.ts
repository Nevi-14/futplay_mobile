import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, ModalController } from '@ionic/angular';
import { CantonesService } from 'src/app/services/cantones.service';
import { DistritosService } from 'src/app/services/distritos.service';
import { EquiposService } from 'src/app/services/equipos.service';
import { ProvinciasService } from 'src/app/services/provincias.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
declare const window: any; 
@Component({
  selector: 'app-editar-perfil-equipo',
  templateUrl: './editar-perfil-equipo.page.html',
  styleUrls: ['./editar-perfil-equipo.page.scss'],
})
export class EditarPerfilEquipoPage implements OnInit {
  img =  'assets/main/team-profile.svg';
  image = '';
  @ViewChild(IonSlides) slides: IonSlides;
  avatarSlide = {
    slidesPerView: 1
  }
  
  imgs = [
    
    {  seleccionado: false, img:'001-barcelona.svg'},
    {  seleccionado: false, img: '002-chelsea.svg'},
    {  seleccionado: false, img: '003-borussia-monchengladach.svg'},
    {  seleccionado: false, img: '004-borussia-dortmund.svg'},
    {  seleccionado: false, img: '005-bayern-leverkusen.svg'},
    {  seleccionado: false, img: '006-atletico-de-madrid.svg'},
    {  seleccionado: false, img: '007-villarreal.svg'},
    {  seleccionado: false, img: '008-roman.svg'},
    {  seleccionado: false, img: '009-valencia.svg'},
    {  seleccionado: false, img: '010-sampdoria.svg'},
    {  seleccionado: false, img: '011-tottenham-hotspur.svg'},
    {  seleccionado: false, img: '012-lazio.svg'},
    {  seleccionado: false, img: '013-napoli.svg'},
    {  seleccionado: false, img: '014-sevilla.svg'},
    {  seleccionado: false, img: '015-real-madrid.svg'},
    {  seleccionado: false, img: '016-leipzig.svg'},
    {  seleccionado: false, img: '017-paris-saint-germain.svg'},
    {  seleccionado: false, img: '018-olympique-lyonnais.svg'},
    {  seleccionado: false, img:  '019-monaco.svg'},
    {  seleccionado: false, img:  '020-olympique-de-marseille.svg'},
    {  seleccionado: false, img: '021-nice.svg'},
    {  seleccionado: false, img: '022-manchester-united.svg'},
    {  seleccionado: false, img:  '023-manchester-city.svg'},
    {  seleccionado: false, img:  '024-liverpool.svg'},
    {  seleccionado: false, img: '025-juventus.svg'},
    {  seleccionado: false, img: '026-internazionale-milano.svg'},
    {  seleccionado: false, img: '027-schalke-04.svg'},
    {  seleccionado: false, img: '028-nantes.svg'},
    {  seleccionado: false, img: '029-bayern-munchen.svg'},
    {  seleccionado: false, img: '030-arsenal.svg'},
    
    
    
    ]
    equipo = {
      Cod_Equipo: this.equiposService.perfilEquipo.Cod_Equipo ,
      Cod_Usuario:  this.usuariosService.usuarioActual.Cod_Usuario,
      Cod_Provincia:  this.equiposService.perfilEquipo.Cod_Provincia,
      Cod_Canton:  this.equiposService.perfilEquipo.Cod_Equipo,
      Cod_Distrito:  this.equiposService.perfilEquipo.Cod_Distrito,
      Foto:  this.equiposService.perfilEquipo.Foto,
      Nombre:  this.equiposService.perfilEquipo.Nombre,
      Abreviacion:  this.equiposService.perfilEquipo.Abreviacion,
      Fecha:  this.equiposService.perfilEquipo.Fecha,
      Estrellas:  this.equiposService.perfilEquipo.Estrella,
      Dureza:  this.equiposService.perfilEquipo.Dureza,
      Estado:  this.equiposService.perfilEquipo.Estado,
      Descripcion_Estado:  this.equiposService.perfilEquipo.Descripcion_Estado,
   }
    constructor(
      public modalCtrl: ModalController,
      public provinciasService: ProvinciasService,
      public cantonesService: CantonesService,
      public distritosService: DistritosService,
      public usuariosService: UsuariosService,
      public equiposService: EquiposService,
      public camera: Camera
    ) { }
  
    ngOnInit() {

      
      const i = this.imgs.findIndex(image => image.img == this.equipo.Foto)

      if(i >=0){

        let selectedImage = this.imgs[i];
        selectedImage.seleccionado = true;
        this.imgs.splice(i,1);
        this.imgs.unshift(selectedImage);

        console.log(selectedImage)
      }


      this.provinciasService.syncProvincias();
      this.cantonesService.syncCantones(this.equipo.Cod_Provincia);
      this.distritosService.syncDistritos(this.equipo.Cod_Provincia, this.equipo.Cod_Canton);
    }


    onChange($event,identifier){
      console.log(identifier)
      switch(identifier){
      
      case 'provincia':
      
      this.provinciasService.syncProvincias();
      this.equipo.Cod_Canton = null;
      this.equipo.Cod_Distrito = null;
      this.cantonesService.cantones = [];
      this.distritosService.distritos = [];
      this.cantonesService.syncCantones($event.target.value);
      console.log(identifier)
      break;
      case 'canton':
        console.log(identifier)
      this.equipo.Cod_Distrito = null;
      this.distritosService.distritos = [];
       if(this.equipo.Cod_Canton){
        this.distritosService.syncDistritos(this.equipo.Cod_Provincia, $event.target.value);
       }
      break;
      
      case 'distrito':
        
      break;
      
      }
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
        
          this.equipo.Foto = img;
      
        
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
         
          this.equipo.Foto = img;
          
      
         }, (err) => {
          // Handle error
         });
      }
  seleccionarAvatar(img){

    this.imgs.forEach(av => av.seleccionado = false);
    img.seleccionado = true;
    this.image = img.img
    this.equipo.Foto =  img.img;
      console.log(this.image,'this.image')
    }

  slideChange(event){
    let currentIndex = this.slides.getActiveIndex().then(resp =>{
      this.imgs.forEach(av => av.seleccionado = false);
      this.imgs[resp].seleccionado = true;
      this.image = this.imgs[resp].img
      this.equipo.Foto = this.imgs[resp].img;
      console.log(resp,'resp')
    })
 
  }
  slidePrev() {
    this.slides.slidePrev();
  }
  slideNext() {
    
    this.slides.slideNext();
  }

  cerrarModal(){
    this.modalCtrl.dismiss();
  }



  

  updateTeam(fActualizar:NgForm){
    
    if(fActualizar.invalid) {return;}
 console.log(this.equipo,'this.equipo')
    this.equiposService.actualizarEquipo(this.equipo, this.usuariosService.usuarioActual.Cod_Usuario)
  }


}
