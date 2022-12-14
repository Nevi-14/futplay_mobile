import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';
import { AlertasService } from 'src/app/services/alertas.service';
import { GestorEquipoImagenesService } from 'src/app/services/gestor-equipo-imagenes.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import avatarArray from '../../../assets/data/equipos.avatars.json';
import { EquiposService } from 'src/app/services/equipos.service';
import { Equipos } from 'src/app/models/equipos';
@Component({
  selector: 'app-gestor-equipo-imagenes',
  templateUrl: './gestor-equipo-imagenes.page.html',
  styleUrls: ['./gestor-equipo-imagenes.page.scss'],
})
export class GestorEquipoImagenesPage implements OnInit {
  @Input() new:boolean
  @Input()  foto:any
  @ViewChild('myInput')
  myInputVariable: ElementRef;   
  @ViewChild(IonSlides) slides: IonSlides;
  @Input() equipo:Equipos
  avatarSlide = {
    slidesPerView: 2.5
  }
  avatars =null;
  avatarActual = null;
  imgs = avatarArray;
 
  file = null;
  url = null;


  constructor(
public modalCtrl: ModalController,
public usuarioService: UsuariosService,
public alertasService: AlertasService,
public gestorEquiposImagenesService: GestorEquipoImagenesService,
public equiposService:EquiposService


  ) { }
  ionViewWillEnter(){
    this.borrarImagen();
   
  }
  ngOnInit() {
   // this.gestorEquiposImagenesService.reset();
    if(this.gestorEquiposImagenesService.images.length > 0){


     this.gestorEquiposImagenesService.images = [];
 
     this.borrarImagen();
     //this.imgs[this.gestorEquiposImagenesService.index].seleccionado = true;
      
    }
  
  }

  
  cerrarModal(){
    this.modalCtrl.dismiss();
   //this.router.navigateByUrl('/inicio');
  }

  slidePrev() {
    this.slides.slidePrev();
  }
  slideNext() {
    
    this.slides.slideNext();
  }
  async slideChange(){
    this.gestorEquiposImagenesService.images = [];
 await this.slides.getActiveIndex().then(resp =>{
      this.imgs.forEach(av => av.seleccionado = false);
      this.imgs[resp].seleccionado = true;
      this.gestorEquiposImagenesService.index = resp;
   
      this.gestorEquiposImagenesService.avatarActual = true;

      this.gestorEquiposImagenesService.avatar =  this.imgs[resp].img;


    })


 
  }
  ImagenRegular(){

    this.avatars = false;
  }

  habilitarAvatars(){
    this.avatars = true;
    this.file = null;
    this.url = null;
    this.gestorEquiposImagenesService.images = [];
    this.gestorEquiposImagenesService.index = this.gestorEquiposImagenesService.index > 0 ? this.gestorEquiposImagenesService.index  : 0;
    this.gestorEquiposImagenesService.avatar =  this.imgs[this.gestorEquiposImagenesService.index > 0 ? this.gestorEquiposImagenesService.index  : 0].img

  }
  seleccionarAvatar(img, i){
    
 
    this.imgs.forEach(av => av.seleccionado = false);
    img.seleccionado = true;
this.gestorEquiposImagenesService.index = i;
this.avatarActual =  'assets/soccer-shields-svg/'+this.imgs[i].img
 
 
    }


    guardarCambios(){
    



      if( this.gestorEquiposImagenesService.images.length >0){
 

        this.gestorEquiposImagenesService.startUpload();


   /**
    *      this.usuarioService.syncImagePost(formData, this.usuarioService.usuarioActual.Cod_Usuario).then((resp:any) => {
      
        if(resp.usuario){
          this.usuarioService.usuarioActual = resp.usuario;
          this.alertasService.message('FUTPLAY', resp.message)
         console.log('imagen actualizada  ' , resp)
       
         this.limpiarDatos();
         this.cerrarModal();
        }
      
      })
    */

      }else{
        let data = {

          Cod_Equipo:this.equiposService.equipo.equipo.Cod_Equipo,
          Avatar:true,
          Foto: this.imgs[this.gestorEquiposImagenesService.index].img

        }




   this.equiposService.syncAvatarToPromise(data).then((resp:any) =>{
    this.equiposService.equipo.equipo = resp.equipo[0];
    this.alertasService.message('FUTPLAY', resp.message)
   console.log('imagen actualizada  ' , resp)
this.limpiarDatos()
   this.cerrarModal();

  })


      }
  
    
    }
    
    
    limpiarDatos(){
    

    this.file = null;
    this.url = null;
    this.avatars = false;
    this.avatarActual = false;
    this.gestorEquiposImagenesService.images = [];
    this.gestorEquiposImagenesService.reset();

    }

    




    borrarImagen(){
      this.gestorEquiposImagenesService.images = [];
      this.gestorEquiposImagenesService.reset()
    }

    adjuntarImagen( ){
   this.avatars = false;
   this.avatarActual = false;
 this.gestorEquiposImagenesService.alertaCamara();
 
     
    }
  }