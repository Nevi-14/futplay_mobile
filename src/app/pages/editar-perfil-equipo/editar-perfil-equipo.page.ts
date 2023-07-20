import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, IonSlides, ModalController } from '@ionic/angular';
import { EquiposService } from 'src/app/services/equipos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AlertasService } from 'src/app/services/alertas.service';
import { Equipos } from '../../models/equipos';
import { Router } from '@angular/router';
import { EliminarEquipoPage } from '../eliminar-equipo/eliminar-equipo.page';
import { GestorEquipoImagenesPage } from '../gestor-equipo-imagenes/gestor-equipo-imagenes.page';
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
  @Input() equipo:Equipos
  @ViewChild('fRegistroEquipo') fRegistroEquipo:NgForm
  sliderOpts = {
    zoom: false,
    slidesPerView: 4,
    spaceBetween: 2,
    centeredSlides: false,
    // Responsive breakpoints
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 3,
        spaceBetween: 5
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 2,
        spaceBetween: 30
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 2,
        spaceBetween: 40
      },
      // when window width is >= 940px
      940: {
        slidesPerView: 3,
        spaceBetween: 40
      },

      // when window width is >= 1200px
      1300: {
        slidesPerView: 4,
        spaceBetween: 40
      }
    },
  };
 
  modalOpen:boolean = false;

  avatarSlide = null;

  avatars = false;
  teamPic = 'https://futplaycompany.com/FUTPLAY_APIS_HOST/PerfilEquipoUploads/' + this.equiposService.equipo.equipo.Foto;
  
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
  
  
   
    constructor(
      public modalCtrl: ModalController,
      public usuariosService: UsuariosService,
      public equiposService: EquiposService,
      public camera: Camera,
      public alertasService: AlertasService,
      public router: Router,
      public alertCtrl: AlertController,
      public cd:ChangeDetectorRef
    ) { }
  
   async  ngOnInit() {
 
      console.log(this.equipo, 'equipoooo')
      const i = this.imgs.findIndex(image => image.img == this.equipo.Foto)

      if(i >=0){

        let selectedImage = this.imgs[i];
        selectedImage.seleccionado = true;
        this.imgs.splice(i,1);
        this.imgs.unshift(selectedImage);

        console.log(selectedImage)
      } 
 
   
 
    }

    async  gestorPerfilImagenes(){

      const modal = await this.modalCtrl.create({
        component: GestorEquipoImagenesPage,
        cssClass:'alert-modal',
        swipeToClose: false,
        mode:'ios',
        componentProps:{
          equipo:this.equiposService.equipo.equipo
        }
      });
    
      
       await modal.present();
       const { data } = await modal.onWillDismiss();
         console.log(data)
           if(data !== undefined ){
  
        
           }
           this.equipo  =   this.equiposService.equipo.equipo 
    }



    avatar(){
      this.avatars = !this.avatars
    }

    dateF(){
      return new Date().getTime() 
    }
 
  seleccionarAvatar(img, i){
  

    this.imgs.forEach(av => av.seleccionado = false);
    img.seleccionado = true;
    this.image = this.imgs[i].img;
    this.equipo.Foto =  this.imgs[i].img;
  
/**
 *     this.equiposService.perfilEquipo.Avatar = true;
    this.gestorImagenesService.actualizaFotoEquipo(this.equipo.Cod_Equipo, this.equipo.Avatar, this.equipo.Foto); 

    this.equiposService.syncEquipo(this.equipo.Cod_Equipo).then(resp =>{

      this.equiposService.perfilEquipo.Foto =  this.image;

    })
 */

    }


  slideChange(event){
    let currentIndex = this.slides.getActiveIndex().then(resp =>{
      this.imgs.forEach(av => av.seleccionado = false);
      this.imgs[resp].seleccionado = true;
      this.image = this.imgs[resp].img
      this.equipo.Foto = this.imgs[resp].img;
/**
 *       this.equipo.Avatar = true;
      this.equiposService.perfilEquipo.Avatar = true;
      this.equiposService.perfilEquipo.Foto =  this.imgs[resp].img;

      this.gestorImagenesService.actualizaFotoEquipo(this.equipo.Cod_Equipo, this.equipo.Avatar, this.equipo.Foto); 

      this.equiposService.syncEquipo(this.equipo.Cod_Equipo).then(resp =>{

        this.equiposService.perfilEquipo.Foto =  this.image;
          })
 */

    
  
    })
 
  }

  
  slidePrev() {
    this.slides.slidePrev();
  }
  slideNext() {
    
    this.slides.slideNext();
  }

  regresar(){
    this.modalCtrl.dismiss(null,null,'perfil-equipo');
  }



  

  updateTeam(fRegistroEquipo:NgForm){
    let equipo = fRegistroEquipo.value;
this.equipo.Nombre = equipo.Nombre;
this.equipo.Abreviacion = equipo.Abreviacion;
 
 
 
 console.log(this.equipo,'this.equipo')
    this.equiposService.putEquipoToPromise(this.equipo, this.usuariosService.usuarioActual.Cod_Usuario).then((resp:any) =>{
console.log('equipo update', resp)

if(resp.action){
 // this.equiposService.equipo.equipo = resp.equipo;
  this.alertasService.message('FUTPLAY', resp.message)
  this.equiposService.syncMisEquiposToPromise(this.usuariosService.usuarioActual.Cod_Usuario).then(equipos =>{

    this.equiposService.equipos = equipos;
    
  let i = this.equiposService.equipos.findIndex(equipo => equipo.equipo.Cod_Equipo == resp.equipo.Cod_Equipo)
  if(i >=0){
    this.equiposService.equipo = this.equiposService.equipos[i];
  }else{
    this.equiposService.equipo = this.equiposService.equipos[0];
  }
  })
}else{
  this.alertasService.message('FUTPLAY', resp.message)
}
     
    })


  }

 

eliminarEquipo(){
/**
 *   this.equiposService.syncDeleteEquipoToPromise(this.equipo.Cod_Equipo).then (resp =>{

    this.equiposService.SyncMisEquipos(this.usuariosService.usuarioActual.Cod_Usuario).then(equipos =>{
      this.equiposService.misEquipos = equipos;
   
      if(equipos.length == 0 ){
        this.router.navigate(['/futplay/mi-perfil']);
      }else{
       // this.equiposService.perfilEquipo = equipos[0];
      
  
  
  
      }
    })
    this.cerrarModal();
  }, error =>{
    this.alertasService.message('FUTPLAY', 'Lo sentimos no se pudo eliminar el equipo, aun se encuentran reservaciones activas las cuales deben de ser verificadas, revisa el historial de reservaciones en revisión para mas detalles')
  })
 */
}
async alertaEliminar() {
  const alert = await this.alertCtrl.create({
    header: '¿Desea eliminar el equipo?',
    cssClass: 'custom-alert',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
       
        },
      },
      {
        text: 'OK',
        role: 'Continuar',
        handler: () => {
        this.eliminarEquipo();
        },
      },
    ],
  });

  await alert.present();
}
async eliminarEquipos(){

  let modal = await this.modalCtrl.create({
    component:EliminarEquipoPage,
    cssClass:'medium-modal',
    componentProps:{
      equipo:this.equipo
    }
  })



   await modal.present();

   const { data } = await modal.onDidDismiss();

   console.log(data, 'deleted')
if(data != undefined){
this.regresar()
}
}

imageUpload(filter){


}


}