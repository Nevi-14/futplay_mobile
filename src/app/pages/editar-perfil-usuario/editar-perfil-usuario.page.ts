import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { format } from 'date-fns';
import { ProvinciasService } from 'src/app/services/provincias.service';
import { CantonesService } from 'src/app/services/cantones.service';
import { DistritosService } from 'src/app/services/distritos.service';
import { NgForm } from '@angular/forms';
import { PosicionesService } from 'src/app/services/posiciones.service';

@Component({
  selector: 'app-editar-perfil-usuario',
  templateUrl: './editar-perfil-usuario.page.html',
  styleUrls: ['./editar-perfil-usuario.page.scss'],
})
export class EditarPerfilUsuarioPage implements OnInit {
  img =  'assets/main/team-profile.svg';
  image = '';
  @ViewChild(IonSlides) slides: IonSlides;
  avatarSlide = {
    slidesPerView: 1
  }
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

    usuario = {
      Cod_Usuario: this.usuarioService.usuarioActual.Cod_Usuario,
      Cod_Role: 2,
      Cod_Provincia: this.usuarioService.usuarioActual.Cod_Provincia,
      Cod_Canton:this.usuarioService.usuarioActual.Cod_Canton,
      Cod_Distrito: this.usuarioService.usuarioActual.Cod_Distrito,
      Cod_Posicion:this.usuarioService.usuarioActual.Cod_Posicion,
      Modo_Customizado: false,
      Foto:this.usuarioService.usuarioActual.Foto,
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
  constructor(
    public modalCtrl: ModalController,
    public usuarioService: UsuariosService,
    public provinciasService: ProvinciasService,
    public cantonesService: CantonesService,
    public distritosService: DistritosService,
    public posicionesService: PosicionesService
    ) { }
  
    ngOnInit() {

      const i = this.imgs.findIndex(image => image.img == this.usuario.Foto)

      if(i >=0){

        let selectedImage = this.imgs[i];
        selectedImage.seleccionado = true;
        this.imgs.splice(i,1);
        this.imgs.unshift(selectedImage);

        console.log(selectedImage)
      }
      this.posicionesService.syncPosiciones();
    console.log(this.posicionesService.posiciones, 'this.posicionesService.posiciones')

    this.provinciasService.syncProvincias();
    this.cantonesService.syncCantones(this.usuario.Cod_Provincia);
    this.distritosService.syncDistritos(this.usuario.Cod_Provincia, this.usuario.Cod_Canton);
  }
  formatDate(event) {
    //  this.usuario.Fecha_Nacimiento = $event.detail.value;
    this.usuario.Fecha_Nacimiento = event.detail.value;
    this.modalCtrl.dismiss();
  
  }
  updateUser(fActualizar:NgForm){
    
    if(fActualizar.invalid) {return;}
    console.log(this.usuario, this.usuario.Cod_Posicion, 'Cod_Posicion')
    this.usuarioService.actualizarUsuario(this.usuario, this.usuario.Cod_Usuario)
  }

  syncProvincias(){
    this.provinciasService.syncProvincias();
  }
  
  onChange($event , provincia, canton, distrito){
    if(provincia){
  
   this.cantonesService.syncCantones($event.target.value);
    }else if(canton){
  
      this.distritosService.syncDistritos(this.usuario.Cod_Provincia, $event.target.value);
  
    }else{
      
    }
    console.log($event.target.value);
    }
  

  seleccionarAvatar(img){

    this.imgs.forEach(av => av.seleccionado = false);
    img.seleccionado = true;
    this.image = img.img

      console.log(this.image,'this.image')
    }

  slideChange(event){
    let currentIndex = this.slides.getActiveIndex().then(resp =>{
      this.imgs.forEach(av => av.seleccionado = false);
      this.imgs[resp].seleccionado = true;
      this.image = this.imgs[resp].img
this.usuario.Foto = this.imgs[resp].img;
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

    this.modalCtrl.dismiss(null, null, "fecha-modal");
  }
}
