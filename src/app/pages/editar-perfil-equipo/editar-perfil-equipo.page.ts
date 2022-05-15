import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, ModalController } from '@ionic/angular';
import { CantonesService } from 'src/app/services/cantones.service';
import { DistritosService } from 'src/app/services/distritos.service';
import { EquiposService } from 'src/app/services/equipos.service';
import { ProvinciasService } from 'src/app/services/provincias.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { GestorImagenesService } from 'src/app/services/gestor-imagenes.service';
import { AlertasService } from 'src/app/services/alertas.service';
declare const window: any; 
@Component({
  selector: 'app-editar-perfil-equipo',
  templateUrl: './editar-perfil-equipo.page.html',
  styleUrls: ['./editar-perfil-equipo.page.scss'],
})
export class EditarPerfilEquipoPage implements OnInit {
  img =  'assets/main/team-profile.svg';
  imageURL = null;
  image = '';
  @ViewChild(IonSlides) slides: IonSlides;
  avatarSlide = {
    slidesPerView: 2.5
  }
  showProvincia = false;
  showCanton = false;
  showDistrito = false;
  teamPic = 'https://dev-coding.com/FUTPLAY_APIS_HOST/PerfilEquipoUploads/' + this.equiposService.perfilEquipo.Foto;
  
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
    avatars = false;
    equipo = {
      Cod_Equipo: this.equiposService.perfilEquipo.Cod_Equipo ,
      Avatar: this.equiposService.perfilEquipo.Avatar,
      Cod_Usuario:  this.usuariosService.usuarioActual.Cod_Usuario,
      Cod_Provincia: this.equiposService.perfilEquipo.Cod_Provincia,
      Cod_Canton:  this.equiposService.perfilEquipo.Cod_Canton,
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
      public camera: Camera,
      public gestorImagenesService: GestorImagenesService,
      public alertasService: AlertasService
    ) { }
  
    ngOnInit() {


      this. imageURL = "assets/soccer-shields-svg/"+this.equiposService.perfilEquipo.Foto
      
      const i = this.imgs.findIndex(image => image.img == this.equipo.Foto)

      if(i >=0){

        let selectedImage = this.imgs[i];
        selectedImage.seleccionado = true;
        this.imgs.splice(i,1);
        this.imgs.unshift(selectedImage);

        console.log(selectedImage)
      }

this.provinciasService.provincias = [];

      this.provinciasService.syncProvinciasPromise().then(resp =>{
this.showProvincia = true;
this.provinciasService.provincias = resp;
this.equipo.Cod_Provincia = this.equiposService.perfilEquipo.Cod_Provincia 


if(this.equipo.Cod_Provincia){
  this.cantonesService.syncCantones(this.equipo.Cod_Provincia).then(resp =>{
this.showCanton = true;
this.showDistrito = null;
this.cantonesService.cantones = resp.slice(0);
this.alertasService.loadingDissmiss();
this.equipo.Cod_Canton = this.equiposService.perfilEquipo.Cod_Canton

if(this.equipo.Cod_Provincia && this.equipo.Cod_Canton){
  this.distritosService.syncDistritos(this.equipo.Cod_Provincia,this.equipo.Cod_Canton).then(resp =>{
    this.distritosService.distritos = resp.slice(0);
    this.showDistrito = true;
    this.alertasService.loadingDissmiss();
    this.equipo.Cod_Distrito = this.equiposService.perfilEquipo.Cod_Distrito
  });

  }



  })





 }else{
  this.alertasService.loadingDissmiss();
 }
      });
  
 


    }
    avatar(){
      this.avatars = !this.avatars
    }
    imageUpload(source:string){
   
      let   fileName =this.equiposService.perfilEquipo.Nombre+'-'+this.equiposService.perfilEquipo.Cod_Equipo;
      let location = 'perfil-equipo';
         this.gestorImagenesService.selectImage(source,fileName,location).then(resp =>{
          this.equipo.Foto = resp;
          this.equiposService.perfilEquipo.Foto = resp;
          this.equipo.Avatar = false;
          this.equiposService.perfilEquipo.Avatar = false;
    console.log(resp, this.equipo,  this.equipo.Foto, 'respppppppppppppppppggggg')
    this.equiposService.actualizarEquipo(this.equipo, this.usuariosService.usuarioActual.Cod_Usuario)
         })
     
       //  
    }
    dateF(){
      return new Date().getTime() 
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
  
  seleccionarAvatar(img, i){
  

    this.imgs.forEach(av => av.seleccionado = false);
    img.seleccionado = true;
    this.image = this.imgs[i].img;
    this.equipo.Foto =  this.imgs[i].img;
    this.equipo.Avatar = true;
    this.equiposService.perfilEquipo.Avatar = true;

    }


  slideChange(event){
    let currentIndex = this.slides.getActiveIndex().then(resp =>{
      this.imgs.forEach(av => av.seleccionado = false);
      this.imgs[resp].seleccionado = true;
      this.image = this.imgs[resp].img
      this.equipo.Foto = this.imgs[resp].img;
      this.equipo.Avatar = true;
      this.equiposService.perfilEquipo.Avatar = true;
      this.equiposService.perfilEquipo.Foto =  this.imgs[resp].img;

      this.gestorImagenesService.actualizaFotoEquipo(this.equipo.Cod_Equipo, this.equipo.Avatar, this.equipo.Foto); 

      this.equiposService.syncEquipo(this.equipo.Cod_Equipo).then(resp =>{

        this.equiposService.perfilEquipo.Foto =  this.image;

      })
  
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



  

  updateTeam(){
    
 //   if(fActualizar.invalid) {return;}
 console.log(this.equipo,'this.equipo')
    this.equiposService.actualizarEquipo(this.equipo, this.usuariosService.usuarioActual.Cod_Usuario)
  }

  onChangeProvincias($event){
    this.alertasService.presentaLoading('Cargando datos...')
    this.equipo.Cod_Provincia = $event.target.value;
    this.equipo.Cod_Canton = null;
    this.equipo.Cod_Distrito = null;
    this.cantonesService.cantones = [];
    this.distritosService.distritos = [];
 if(this.equipo.Cod_Provincia){
  this.cantonesService.syncCantones(this.equipo.Cod_Provincia).then(resp =>{
this.showCanton = true;
this.showDistrito = null;
this.cantonesService.cantones = resp.slice(0);
this.alertasService.loadingDissmiss();
  })
 }else{
  this.alertasService.loadingDissmiss();
 }
  }
  onChangeCantones($event){
    this.alertasService.presentaLoading('Cargando datos...')
    this.equipo.Cod_Canton = $event.target.value;
    this.equipo.Cod_Distrito = null;
    this.distritosService.distritos = [];
if(this.equipo.Cod_Provincia && this.equipo.Cod_Canton){
  this.distritosService.syncDistritos(this.equipo.Cod_Provincia,this.equipo.Cod_Canton).then(resp =>{
    this.distritosService.distritos = resp.slice(0);
    this.showDistrito = true;
    this.alertasService.loadingDissmiss();
    
  })
}else{
  this.alertasService.loadingDissmiss();
}

  }

  onChangeDistritos($event){

    this.equipo.Cod_Distrito = $event.target.value;

  }



}
