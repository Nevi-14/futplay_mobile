import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { format } from 'date-fns';
import { ProvinciasService } from 'src/app/services/provincias.service';
import { CantonesService } from 'src/app/services/cantones.service';
import { DistritosService } from 'src/app/services/distritos.service';
import { NgForm } from '@angular/forms';
import { PosicionesService } from 'src/app/services/posiciones.service';
import { SeleccionarFechaPage } from '../seleccionar-fecha/seleccionar-fecha.page';
import { GestorImagenesService } from 'src/app/services/gestor-imagenes.service';
import { AlertasService } from 'src/app/services/alertas.service';
import { ChangeDetectorRef } from '@angular/core'
import { Provincias } from 'src/app/models/provincias';
 
interface LocalFile {
  fileName: string;
  path: string;
  data: string;
}
@Component({
  selector: 'app-editar-perfil-usuario',
  templateUrl: './editar-perfil-usuario.page.html',
  styleUrls: ['./editar-perfil-usuario.page.scss'],
})
export class EditarPerfilUsuarioPage implements OnInit { 
Cod_Canton  : any
showPosicion = false;
showProvicia = false;
showCanton = false;
showDistrito = false;
  private modalOpen:boolean = false;
  userPic = 'https://futplaycompany.com/FUTPLAY_APIS_HOST/PerfilUsuarioUploads/'+ this.userService.usuarioActual.Foto +'?'+ this.dateF();
  areaUnit =1;
    userPic1 = this.gestorImagenesService.images.length > 0 ? this.gestorImagenesService.images[0].data : 'assets/user.svg';
    usuario = {
      Cod_Usuario: this.usuarioService.usuarioActual.Cod_Usuario,
      Cod_Role: 2,
      Avatar:this.usuarioService.usuarioActual.Avatar,
      Compartir_Datos:this.usuarioService.usuarioActual.Compartir_Datos,
      Cod_Provincia: this.usuarioService.usuarioActual.Cod_Provincia,
      Cod_Canton:null,
      Cod_Distrito: this.usuarioService.usuarioActual.Cod_Distrito,
      Cod_Posicion:this.usuarioService.usuarioActual.Cod_Posicion,
      Modo_Customizado: false,
      Foto: this.userService.usuarioActual.Foto,
      Nombre: this.usuarioService.usuarioActual.Nombre,
    Primer_Apellido:this.usuarioService.usuarioActual.Primer_Apellido,
      Segundo_Apellido: this.usuarioService.usuarioActual.Segundo_Apellido,
      Fecha_Nacimiento:  format(new Date(this.usuarioService.usuarioActual.Fecha_Nacimiento), 'yyyy-MM-dd'),
      Telefono: this.usuarioService.usuarioActual.Telefono,
      Correo: this.usuarioService.usuarioActual.Correo,
      Contrasena: this.usuarioService.usuarioActual.Contrasena,
      Fecha: this.usuarioService.usuarioActual.Fecha_Nacimiento,
      Intentos: 0,
      Estatura:this.usuarioService.usuarioActual.Estatura,
      Peso: this.usuarioService.usuarioActual.Peso,
      Apodo: this.usuarioService.usuarioActual.Apodo,
      Partidos_Jugados: 0,
      Partidos_Jugador_Futplay: 0,
      Estado: null,
      Descripcion_Estado: null,
      Canchas: [],
      Canchas_Favoritos: [],
      Cantones: null,
      Distritos: null,
      Equipos: [],
      Jugadores_Equipos: [],
      Jugadores_Favoritos: [],
      Posiciones: null,
      Provincias: null,
      Reservaciones: [],
      Roles: null,
      Solicitudes_Jugadores_Equipos: []
  }
isVisible = false;
compareWith : any ;
  image = this.gestorImagenesService.images.length >0 ? this.gestorImagenesService.images[0].data : 'assets/user.svg'
  ///// In functions declaration zone
  @ViewChild(IonSlides) slides: IonSlides;
  avatarSlide = {
    slidesPerView: 2.5
  }
  avatars = false;
  imgs = [
    {  seleccionado: false, img: '049-boy.svg'},
    {  seleccionado: false, img: '002-girl-26.svg'},
    {  seleccionado: false, img: '003-boy-14.svg'},
    {  seleccionado: false, img: '004-woman-1.svg'},
    {  seleccionado: false, img: '005-man-3.svg'},
    {  seleccionado: false, img: '006-woman.svg'},
    {  seleccionado: false, img: '007-girl-25.svg'},
    {  seleccionado: false, img: '008-girl-24.svg'},
    {  seleccionado: false, img: '009-boy-13.svg'},
    {  seleccionado: false, img: '010-girl-23.svg'},
    {  seleccionado: false, img: '011-boy-12.svg'},
    {  seleccionado: false, img: '012-girl-22.svg'},
    {  seleccionado: false, img: '013-boy-11.svg'},
    {  seleccionado: false, img: '014-boy-10.svg'},
    {  seleccionado: false, img: '015-girl-21.svg'},
    {  seleccionado: false, img: '016-girl-20.svg'},
    {  seleccionado: false, img: '017-boy-9.svg'},
    {  seleccionado: false, img: '018-boy-8.svg'},
    {  seleccionado: false, img:  '019-girl-19.svg'},
    {  seleccionado: false, img:  '020-boy-7.svg'},
    {  seleccionado: false, img: '021-boy-6.svg'},
    {  seleccionado: false, img: '022-boy-5.svg'},
    {  seleccionado: false, img:  '023-girl-18.svg'},
    {  seleccionado: false, img:  '024-boy-4.svg'},
    {  seleccionado: false, img: '025-girl-17.svg'},
    {  seleccionado: false, img: '026-girl-16.svg'},
    {  seleccionado: false, img: '027-hipster.svg'},
    {  seleccionado: false, img: '028-girl-15.svg'},
    {  seleccionado: false, img: '029-girl-14.svg'},
    {  seleccionado: false, img: '030-girl-13.svg'},
    {  seleccionado: false, img: '031-boy-3.svg'},
    {  seleccionado: false, img: '032-girl-12.svg'},
    {  seleccionado: false, img: '033-man-2.svg'},
    {  seleccionado: false, img: '034-girl-11.svg'},
    {  seleccionado: false, img: '035-girl-10.svg'},
    {  seleccionado: false, img: '036-girl-9.svg'},
    {  seleccionado: false, img: '037-girl-8.svg'},
    {  seleccionado: false, img: '038-man-1.svg'},
    {  seleccionado: false, img: '039-girl-7.svg'},
    {  seleccionado: false, img:  '040-man.svg'},
    {  seleccionado: false, img:  '041-girl-6.svg'},
    {  seleccionado: false, img: '042-girl-5.svg'},
    {  seleccionado: false, img: '043-girl-4.svg'},
    {  seleccionado: false, img:  '044-boy-2.svg'},
    {  seleccionado: false, img:  '045-girl-3.svg'},
    {  seleccionado: false, img: '046-girl-2.svg'},
    {  seleccionado: false, img: '047-boy-1.svg'},
    {  seleccionado: false, img: '048-girl-1.svg'},
    {  seleccionado: false, img:'001-boy-15.svg'},
    {  seleccionado: false, img: '050-girl.svg'}
    
    
    
    ]
  constructor(
    
    public modalCtrl: ModalController,
    public usuarioService: UsuariosService,
    public provinciasService: ProvinciasService,
    public cantonesService: CantonesService,
    public distritosService: DistritosService,
    public posicionesService: PosicionesService,
    public userService: UsuariosService,
    public gestorImagenesService: GestorImagenesService,
    public alertasService: AlertasService,
    public cdr: ChangeDetectorRef
    ) {



      this.compareWith = this.compareWithFn;
     }
   

    ngOnInit() {
      this.cdr.detectChanges();

      this.posicionesService.posiciones = [];
   this.posicionesService.syncPosicionesToPromise().then(resp =>{
     this.showPosicion = true;
     this.usuario.Cod_Posicion = this.usuarioService.usuarioActual.Cod_Posicion;
    this.posicionesService.posiciones  = resp;

   });


   this.provinciasService.provincias = [];
      this.provinciasService.syncProvinciasPromise().then(resp =>{
        this.provinciasService.provincias = resp
this.showProvicia = true;
this.usuario.Cod_Provincia = this.usuarioService.usuarioActual.Cod_Provincia
      })
  
      this.usuario.Cod_Provincia = this.usuarioService.usuarioActual.Cod_Provincia


      if(this.usuario.Cod_Provincia){
        this.cantonesService.syncCantones(this.usuario.Cod_Provincia).then(resp =>{
      this.showCanton = true;
      this.showDistrito = null;
      this.cantonesService.cantones = resp.slice(0);
      this.alertasService.loadingDissmiss();
      this.usuario.Cod_Canton = this.usuarioService.usuarioActual.Cod_Canton

      if(this.usuario.Cod_Provincia && this.usuario.Cod_Canton){
        this.distritosService.syncDistritos(this.usuario.Cod_Provincia,this.usuario.Cod_Canton).then(resp =>{
          this.distritosService.distritos = resp.slice(0);
          this.showDistrito = true;
          this.alertasService.loadingDissmiss();
          this.usuario.Cod_Distrito = this.usuarioService.usuarioActual.Cod_Distrito
        });
      
        }


      
        })


  


       }else{
        this.alertasService.loadingDissmiss();
       }

  }
   ///// In functions definitions
   onSelectChange(selectedValue: any) {
    this.usuario.Cod_Provincia = selectedValue.detail.value ;
  }
  compareFn(e1, e2): boolean {
    return e1 && e2 ? e1 === e2 : e1 === e2;
  }
  onSelectChange2(selectedValue: any) {
    this.Cod_Canton = selectedValue.detail.value ;
  }
  avatar(){
    this.avatars = !this.avatars

  }

  compareWithFn(o1, o2) {
    alert( o1 === o2)
    return o1 === o2;
  };



  slideChange(event){
    let currentIndex = this.slides.getActiveIndex().then(resp =>{
      this.imgs.forEach(av => av.seleccionado = false);
      this.imgs[resp].seleccionado = true;
      this.image = this.imgs[resp].img
      this.usuario.Foto = this.imgs[resp].img;
      this.usuario.Avatar = true;
      this.usuarioService.usuarioActual.Avatar = true;
      this.usuarioService.usuarioActual.Foto =  this.imgs[resp].img;

      this.gestorImagenesService.actualizaFotoUsuario(this.usuario.Cod_Usuario, this.usuario.Avatar, this.usuario.Foto); 

  
    })
 
  }


  slideChange2(event){
    let currentIndex = this.slides.getActiveIndex().then(resp =>{
      this.imgs.forEach(av => av.seleccionado = false);
      this.imgs[resp].seleccionado = true;
      this.image = this.imgs[resp].img
      this.usuario.Foto = this.imgs[resp].img;
      console.log(resp,'resp')
      this.usuario.Avatar = true;
      this.gestorImagenesService.actualizaFotoUsuario(this.usuario.Cod_Usuario, this.usuario.Avatar, this.usuario.Foto);    
    })
 
  }
  ionViewDidLoad (){

  }  
  formatDate(event) {
    //  this.usuario.Fecha_Nacimiento = $event.detail.value;
    this.usuario.Fecha_Nacimiento = event.detail.value;
    this.modalCtrl.dismiss();
  
  }
  dateF(){
    return new Date().getTime() 
  }
  updateUser(){
    
  //  if(fActualizar.invalid) {return;}
 
    this.modalCtrl.dismiss({'data':true}, null, 'perfil-usuario')
    console.log(this.usuario, this.usuario.Cod_Posicion, 'Cod_Posicion')
    this.usuarioService.actualizarUsuario(this.usuario, this.usuario.Cod_Usuario)

  }
  imageUpload(source:string){
   
    let   fileName = this.userService.usuarioActual.Foto
    let location = 'perfil-usuario';
       this.gestorImagenesService.selectImage(source,fileName,location, false).then(resp =>{
this.usuario.Foto = resp
console.log(this.usuario, 'edit')
this.usuario.Avatar = false;
this.gestorImagenesService.actualizaFotoUsuario(this.usuario.Cod_Usuario, this.usuario.Avatar, this.usuario.Foto);    
this.userPic = 'https://futplaycompany.com/FUTPLAY_APIS_HOST/PerfilUsuarioUploads/'+ this.userService.usuarioActual.Foto +'?'+ this.dateF();
//this.gestorImagenesService.reset();


       })
      
  }
  syncProvincias(){
    this.provinciasService.syncProvincias();
  }

  seleccionarAvatar(img, i){
  

    this.imgs.forEach(av => av.seleccionado = false);
    img.seleccionado = true;
    this.image = this.imgs[i].img;
    this.usuario.Foto =  this.imgs[i].img;
    this.usuario.Avatar = true;
    this.usuarioService.usuarioActual.Avatar = true;
    this.usuarioService.usuarioActual.Foto =   this.image;

    this.gestorImagenesService.actualizaFotoUsuario(this.usuario.Cod_Usuario, this.usuario.Avatar, this.usuario.Foto); 
 
    }



  seleccionarAvatar2(img){

    this.imgs.forEach(av => av.seleccionado = false);
    img.seleccionado = true;
    this.image = img.img
    this.usuario.Foto =  img.img;

      console.log(this.image,'this.image')
    }



/**
 *   onChange($event , provincia, canton, distrito){
    if(provincia){
  
   this.cantonesService.syncCantones($event.target.value);
    }else if(canton){
  
      this.distritosService.syncDistritos(this.usuario.Cod_Provincia, $event.target.value);
  
    }else{
      
    }
    console.log($event.target.value);
    }
 */
  

  cerrarModal(){

    this.modalCtrl.dismiss(null, null, 'perfil-usuario')
  }
  changeQuantity($event){
    //manually launch change detection
    this.cdr.detectChanges();
    console.log('$event.detail.value', $event.detail.value)
    const value:any =  Number($event.detail.value).toFixed(2);
    this.usuario.Estatura = value;
 }
  async SelectDate(){
    if (!this.modalOpen){
      this.modalOpen = true;
      const modal = await this.modalCtrl.create({
        component:SeleccionarFechaPage,
        cssClass:'date-modal',
     breakpoints: [0, 0.3, 0.5, 0.8],
     initialBreakpoint: 0.5,
        componentProps:{
          title:'Fecha de nacimiento',
          id: 'seleccionar-fecha',
          fecha: new Date(this.usuarioService.usuarioActual.Fecha_Nacimiento)
        },
        id: 'seleccionar-fecha'
      })
    
      await modal.present();
      const { data } = await modal.onWillDismiss();
   
      if(data !== undefined ){
        console.log(data,'data')
       this.usuario.Fecha_Nacimiento = data.date
            this.modalOpen = false;
      }else{
   
             this.modalOpen = false;
      }
      
    }
  
    
  }


  onChangeProvincias($event){
    this.alertasService.presentaLoading('Cargando datos...')
    this.usuario.Cod_Provincia = $event.target.value;
    this.usuario.Cod_Canton = null;
    this.usuario.Cod_Distrito = null;
    this.cantonesService.cantones = [];
    this.distritosService.distritos = [];
 if(this.usuario.Cod_Provincia){
  this.cantonesService.syncCantones(this.usuario.Cod_Provincia).then(resp =>{
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
    this.usuario.Cod_Canton = $event.target.value;
    this.usuario.Cod_Distrito = null;
    this.distritosService.distritos = [];
if(this.usuario.Cod_Provincia && this.usuario.Cod_Canton){
  this.distritosService.syncDistritos(this.usuario.Cod_Provincia,this.usuario.Cod_Canton).then(resp =>{
    this.distritosService.distritos = resp.slice(0);
    this.showDistrito = true;
    this.alertasService.loadingDissmiss();
    
  })
}else{
  this.alertasService.loadingDissmiss();
}

  }

  onChangeDistritos($event){

    this.usuario.Cod_Distrito = $event.target.value;

  }


  
}
