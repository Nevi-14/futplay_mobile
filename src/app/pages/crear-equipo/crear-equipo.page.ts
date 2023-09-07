import { Component, OnInit, ViewChild } from '@angular/core';
import { Equipos } from '../../models/equipos';
import imgs from '../../../assets/data/equipos.avatars.json';
import { AlertasService } from 'src/app/services/alertas.service';
import { EquiposService } from 'src/app/services/equipos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Jugador } from '../../models/jugador';
import { JugadoresService } from 'src/app/services/jugadores.service';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { GestorEquipoImagenesPage } from '../gestor-equipo-imagenes/gestor-equipo-imagenes.page';
import { GestorEquipoImagenesService } from 'src/app/services/gestor-equipo-imagenes.service';
import { NgForm } from '@angular/forms';
import { GeolocalizacionService } from 'src/app/services/geolocalizacion.service';
import { EquipoGeolocalizacion } from 'src/app/models/equipoGeolocalizacion';
import { EquiposGeolocalizacionService } from 'src/app/services/equipos-geolocalizacion.service';
@Component({
  selector: 'app-crear-equipo',
  templateUrl: './crear-equipo.page.html',
  styleUrls: ['./crear-equipo.page.scss'],
})
export class CrearEquipoPage implements OnInit {
  imgs = imgs;
  equipo: Equipos = {
    Cod_Usuario: this.usuariosService.usuarioActual.Cod_Usuario,
    Foto: 'No Pic',
    Dureza: 0,
    Avatar: true,
    Nombre: null,
    Estrellas:1,
    Abreviacion: null,
    Cod_Equipo: null,
    Estrellas_Anteriores: null,
    Posicion_Actual: null,
    Puntaje_Actual: null,
    Partidos_Ganados: null,
    Partidos_Perdidos: null,
    Goles_Favor: null,
    Goles_Encontra: null,
    Promedio_Altura_Jugadores: null,
    Promedio_Peso_Jugadores: null,
    Estado: true,
    Descripcion_Estado: null
  }

  geolocalizacion:EquipoGeolocalizacion = {
    ID:  null,
    Cod_Equipo:  null,
    Codigo_Pais:  null,
    Pais:null,
    Codigo_Estado:  null,
    Estado:null,
    Codigo_Ciudad:  null,
    Ciudad:null,
    Codigo_Postal:  null,
    Direccion:  null
  }
  jugador: Jugador = {
    Cod_Usuario: this.usuariosService.usuarioActual.Cod_Usuario,
    Cod_Equipo: null,
    Favorito: false,
    Administrador: true
  }
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
  showCanton = null;
  showDistrito = null;
  modalOpen:boolean = false;
   dataProvincias = [];
   dataCantones = [];
   dataDistritos = [];
  avatarSlide = null;
  image = ''
  avatars = false;
  constructor(
    public alertasService: AlertasService,
    public modalCtrl: ModalController,
    public router: Router,
    public equiposService: EquiposService,
    public usuariosService: UsuariosService,
    public jugadoresService: JugadoresService,
    public gestorEquiposImagenesService: GestorEquipoImagenesService,
    public geolocalizacionService:GeolocalizacionService,
    public equiposGeolocalizacionService:EquiposGeolocalizacionService

  ) { }


 async ngOnInit() {
  this.geolocalizacionService.Codigo_Pais = null;
  this.geolocalizacionService.Codigo_Estado = null;
  this.geolocalizacionService.Codigo_Ciudad = null;
  this.geolocalizacionService.Codigo_Postal = null;
  this.geolocalizacionService.paises = [];
  this.geolocalizacionService.estados = [];
  this.geolocalizacionService.ciudades = [];
    this.geolocalizacionService.loadCountries(); 
  
  
  }
  


  crearRegistro(fRegistro:NgForm) {
let form = fRegistro.value;
this.equipo.Nombre = form.Nombre;
this.equipo.Abreviacion = form.Abreviacion;
if(!form.Nombre){
  this.alertasService.message('FUTPLAY', 'You must type a name');
  return;
}
if(!form.Abreviacion){
  this.alertasService.message('FUTPLAY', 'You must type an abbreviation');
  return;
}
if(form.Abreviacion.length > 3){
  this.alertasService.message('FUTPLAY', 'Abbreviation must be 3 characters or less');
  return;
}
if(!form.Codigo_Pais){
  this.alertasService.message('FUTPLAY', 'You must select a country');
  return;
}

 
    if(this.gestorEquiposImagenesService.avatarActual){

      this.equipo.Avatar = true;
      this.equipo.Foto = this.gestorEquiposImagenesService.avatar
    }
    this.alertasService.presentaLoading('Guardando Equipo');
    this.equiposService.syncPostEquipoToPromise(this.equipo).then((resp: Equipos) => {

      let equipo = resp;
      this.geolocalizacion.Cod_Equipo = equipo.Cod_Equipo;
this.geolocalizacion.Cod_Equipo = equipo.Cod_Equipo;
 this.geolocalizacion.Codigo_Pais = form.Codigo_Pais;
 this.geolocalizacion.Codigo_Estado = form.Codigo_Estado;
 this.geolocalizacion.Codigo_Ciudad = form.Codigo_Ciudad;
  this.geolocalizacion.Codigo_Postal  = form.Codigo_Postal;
  let indexPais = this.geolocalizacionService.paises.findIndex(e => e.id == this.geolocalizacionService.Codigo_Pais);
  let indexEstado = this.geolocalizacionService.estados.findIndex(e => e.id == this.geolocalizacionService.Codigo_Estado);
  let indexCiudad = this.geolocalizacionService.ciudades.findIndex(e => e.id == this.geolocalizacionService.Codigo_Ciudad);
  console.log('indexPais',indexPais)
  if(indexPais >=0){
    console.log(this.geolocalizacionService.paises[indexPais].valor,'valoooor')
    this.geolocalizacion.Pais = this.geolocalizacionService.paises[indexPais].valor;
  }

  if(indexEstado >=0){
    console.log(this.geolocalizacionService.estados[indexPais].valor,'valoooor')
    this.geolocalizacion.Estado = this.geolocalizacionService.paises[indexEstado].valor;
  }

  if(indexCiudad >=0){
    console.log(this.geolocalizacionService.paises[indexPais].valor,'valoooor')
    this.geolocalizacion.Ciudad = this.geolocalizacionService.ciudades[indexCiudad].valor;
  }

  console.log('geolocalizacion',this.geolocalizacion)
this.equiposGeolocalizacionService.syncPostEquipoGeolocalizacionToPromise(this.geolocalizacion).then(resp =>{
  this.alertasService.loadingDissmiss();
  console.log('post Equipo', resp)
  this.alertasService.message('FUTLAY', 'El Equipo ' + equipo.Nombre + ' se creo con Exito!.');
  this.jugador.Cod_Equipo = equipo.Cod_Equipo
  this.jugadoresService.syncPostJugadorEquipoToPromise(this.jugador).then(resp => {
    this.equiposService.syncMisEquiposToPromise(this.usuariosService.usuarioActual.Cod_Usuario).then(equipos => {

      if (equipos.length > 0) {
        this.equiposService.equipo = equipos[equipos.length -1];
        this.equiposService.misEquipos = equipos;
        this.jugadoresService.syncJugadoresEquipos(this.equiposService.equipo.equipo.Cod_Equipo).then(resp =>{

          this.jugadoresService.jugadores = resp;
       

          if(this.gestorEquiposImagenesService.images.length > 0){

            this.gestorEquiposImagenesService.startUpload();

          }else{

            this.gestorEquiposImagenesService.reset();
          }
        })
        console.log('equipos', equipos)
      }

      this.modalCtrl.dismiss({
        'equipo':this.equipo
      },null,'create-modal')

      this.router.navigate(['/futplay/perfil-equipo']);
    }, error => {

      console.log('error', error)

    })
    console.log('jugador agregado', resp)
  }, error => {

    console.log('error', error, this.jugador)
  })

})
    
    
     
    }, error => {
      this.alertasService.loadingDissmiss();
      this.alertasService.message('FUTLAY', 'Error guardando equipo...');
    })








  }

  regresar(){

    this.modalCtrl.dismiss();
  }

  slideChange($event){


  }

  seleccionarAvatar(img, i){


    this.imgs.forEach(av => av.seleccionado = false);
    img.seleccionado = true;
    this.image = this.imgs[i].img;
    this.equipo.Foto =  this.imgs[i].img;
  
  }

  avatar(){
    
  }

    imageUpload(filter){


  }

  async  gestorPerfilImagenes(){

    const modal = await this.modalCtrl.create({
      component: GestorEquipoImagenesPage,
      cssClass:'alert-modal',
      mode:'ios',
      componentProps:{
        equipo:this.equipo,
        new:true
      }
    });
 
     await modal.present();
     const { data } = await modal.onWillDismiss();
       console.log(data)
         if(data !== undefined ){

      
         }
        // this.equipo  =   this.equiposService.equipo =
  }
}
