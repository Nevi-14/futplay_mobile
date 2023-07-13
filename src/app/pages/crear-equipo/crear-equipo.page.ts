import { Component, OnInit, ViewChild } from '@angular/core';
import { Equipos } from '../../models/equipos';
import imgs from '../../../assets/data/equipos.avatars.json';
import { ProvinciasService } from 'src/app/services/provincias.service';
import { CantonesService } from 'src/app/services/cantones.service';
import { DistritosService } from 'src/app/services/distritos.service';
import { AlertasService } from 'src/app/services/alertas.service';
import { EquiposService } from 'src/app/services/equipos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Jugador } from '../../models/jugador';
import { JugadoresService } from 'src/app/services/jugadores.service';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { GestorEquipoImagenesPage } from '../gestor-equipo-imagenes/gestor-equipo-imagenes.page';
import { GestorEquipoImagenesService } from 'src/app/services/gestor-equipo-imagenes.service';
import { Provincias } from 'src/app/models/provincias';
import { Cantones } from 'src/app/models/cantones';
import { Distritos } from 'src/app/models/distritos';
import { NgForm } from '@angular/forms';
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
    Cod_Equipo: null
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
    public provinciasService: ProvinciasService,
    public cantonesService: CantonesService,
    public distritosService: DistritosService,
    public equiposService: EquiposService,
    public usuariosService: UsuariosService,
    public jugadoresService: JugadoresService,
    public gestorEquiposImagenesService: GestorEquipoImagenesService

  ) { }


 async ngOnInit() {
    let provincias = await this.provinciasService.syncProvinciasPromise();

    provincias.forEach((provincia:Provincias, index)=>{
   
  let data  = {
    id : provincia.Cod_Provincia,
    valor: provincia.Provincia
  }
  console.log(data,'data')
  this.dataProvincias.push(data)
      if(index == provincias.length -1){
  
 
      
      }
    }) 
  
  
  }
  


  crearRegistro(fRegistroEquipo:NgForm) {
let equipo = fRegistroEquipo.value;
this.equipo.Nombre = equipo.Nombre;
this.equipo.Abreviacion = equipo.Abreviacion;

 
    if(this.gestorEquiposImagenesService.avatarActual){

      this.equipo.Avatar = true;
      this.equipo.Foto = this.gestorEquiposImagenesService.avatar
    }
    this.alertasService.presentaLoading('Guardando Equipo');
    this.equiposService.syncPostEquipoToPromise(this.equipo).then((resp: Equipos) => {
      this.alertasService.loadingDissmiss();
      console.log('post Equipo', resp)
      this.alertasService.message('FUTLAY', 'El Equipo ' + resp.Nombre + ' se creo con Exito!.');
      this.jugador.Cod_Equipo = resp.Cod_Equipo
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
      swipeToClose: false,
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
