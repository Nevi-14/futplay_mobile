import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';
import { UsuariosService } from 'src/app/services/usuarios.service';
import avatarArray from '../../../assets/data/avatars.json';
import { AlertasService } from 'src/app/services/alertas.service';
import { GestorImagenesService } from '../../services/gestor-imagenes.service';
 

@Component({
  selector: 'app-gestor-perfil-imagenes',
  templateUrl: './gestor-perfil-imagenes.page.html',
  styleUrls: ['./gestor-perfil-imagenes.page.scss'],
})
export class GestorPerfilImagenesPage implements OnInit {
  @Input()  foto:any
  @ViewChild('myInput')
  myInputVariable: ElementRef;   
  @ViewChild(IonSlides) slides: IonSlides;
  avatarSlide = {
    slidesPerView: 2.5
  }
  avatars =null;
  avatarActual = null;
  imgs = avatarArray;
  index = 0;
  file = null;
  url = null;


  constructor(
public modalCtrl: ModalController,
public usuarioService: UsuariosService,
public alertasService: AlertasService,
public gestorImagenesService: GestorImagenesService


  ) { }

  ngOnInit() {
    this.gestorImagenesService.images = [];
    this.gestorImagenesService.reset();
    this.imgs[this.index].seleccionado = true;
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
    this.gestorImagenesService.images = [];
 await this.slides.getActiveIndex().then(resp =>{
      this.imgs.forEach(av => av.seleccionado = false);
      this.imgs[resp].seleccionado = true;
      this.index = resp;
   
      this.avatarActual =  this.imgs[resp].img
    })


 
  }
  ImagenRegular(){

    this.avatars = false;
  }

  habilitarAvatars(){
    this.avatars = true;
    this.file = null;
    this.url = null;
    this.gestorImagenesService.images = [];
    this.index = this.index > 0 ? this.index  : 0;
    this.avatarActual =  this.imgs[this.index > 0 ? this.index  : 0].img

  }
  seleccionarAvatar(img, i){
    
 
    this.imgs.forEach(av => av.seleccionado = false);
    img.seleccionado = true;
this.index = i;
this.avatarActual =  this.imgs[i].img
 
 
    }


    guardarCambios(){
    



      if( this.gestorImagenesService.images.length >0){
 

        this.gestorImagenesService.startUpload();


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

          Cod_Usuario:this.usuarioService.usuarioActual.Cod_Usuario,
          Avatar:true,
          Foto: this.imgs[this.index].img

        }




   this.usuarioService.syncAvatarToPromise(data).then((resp:any) =>{
    this.usuarioService.usuarioActual = resp.usuario[0];
    this.alertasService.message('FUTPLAY', resp.message)
   console.log('imagen actualizada  ' , resp)
 
   this.cerrarModal();

  })


      }
  
    
    }
    
    
    limpiarDatos(){
    

    this.file = null;
    this.url = null;
    this.avatars = false;
    this.avatarActual = false;
    this.gestorImagenesService.images = [];
    this.gestorImagenesService.reset();
    }

    




    borrarImagen(){

      this.gestorImagenesService.reset()
    }

    adjuntarImagen( ){
   this.avatars = false;
   this.avatarActual = false;
 this.gestorImagenesService.alertaCamara();
 
     
    }
  
}
