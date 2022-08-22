import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';
import { CanchasService } from 'src/app/services/canchas.service';
import { EquiposService } from 'src/app/services/equipos.service';
import { GestionReservacionesService } from 'src/app/services/gestion-reservaciones.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { AceptarRetoPage } from '../aceptar-reto/aceptar-reto.page';
import { GenerarReservacionPage } from '../generar-reservacion/generar-reservacion.page';
import { GoogleAdsService } from '../../services/google-ads.service';

@Component({
  selector: 'app-mis-reservaciones',
  templateUrl: './mis-reservaciones.page.html',
  styleUrls: ['./mis-reservaciones.page.scss'],
})
export class MisReservacionesPage implements OnInit {
  categories = ['Confirmados', 'Actuales','Recibidos','Enviados','Historial'];
  @ViewChild(IonSlides) slider: IonSlides;
  segment = 0;
  activeCategory = 0;
  cancha = null;
retador = null;
Titulo = '';
show = false;
rival = null;
textoBuscar = '';

  constructor(
public gestionReservacionesService: GestionReservacionesService,
public usuariosService: UsuariosService,
public canchasService: CanchasService,
public equiposService: EquiposService,
public modalCtrl: ModalController,
public googleAdsService: GoogleAdsService
  ) {

    this.googleAdsService.initialize();

  }
  ngOnInit() {
//alert(this.categories.length)
this.gestionReservacionesService.syncRetosConfirmados(this.usuariosService.usuarioActual.Cod_Usuario)
  }
  cerrarModal(){
    this.modalCtrl.dismiss();
  }

  onSearchChange(event){

    this.textoBuscar = event.detail.value;
      }
  async detalleReto(reto) {
    let mostrarModal = false;
    
    
    console.log(reto, 'ksjskskks')
     this.canchasService.syncCodCancha(reto.Cod_Cancha).then(resp =>{
          console.log(resp, 'canaaaaa')
    this.cancha = resp[0]
    console.log(this.cancha,'caaa',resp)
    const consultarRetador = this.equiposService.syncEquipo(reto.Cod_Retador);
    
    consultarRetador.then(resp =>{
    
    this.retador = resp[0];
    
    console.log(this.retador,'rival')
    
    const consultarRival = this.equiposService.syncEquipo(reto.Cod_Rival);
    
    
    consultarRival.then(resp =>{
      this.rival = resp[0];
    
      mostrarModal = true;
    if(mostrarModal){
      console.log(reto,this.cancha,this.retador,null,resp,'reto,cancha,rival,null,resp')
    
    }
    
    this.detalleRetoModal(reto,this.cancha,this.retador,this.rival)
    })
    
    
    })
    
    
        })
    
        
    
      
    
    
    
      
      }

      async detalleRetoModal(reto,cancha,retador,rival){
        const modal = await this.modalCtrl.create({
          component: AceptarRetoPage,
          cssClass: 'my-custom-class',
          componentProps: {
            reto: reto,
            cancha: cancha,
            retador: retador,
            rival:rival
          }
        });
    
         await modal.present();

        let {data} = await modal.onDidDismiss();
      
        this.selectCategory(this.segment)
      }
    
  async slideTo(value) {
  
    await this.slider.slideTo(value);
    this.slider.update();
  }
  refresh(){
    this.selectCategory(this.segment)
  }
  async segmentChanged(event) {
    await this.slider.slideTo(this.segment);
    this.slider.update();
  }
  async slideChanged() {
 //   this.segment =  await this.slider.getActiveIndex();
 this.segment =  await this.slider.getActiveIndex();
    this.focusSegment(this.segment);
   
    
  }
  
  focusSegment(segmentId) {
    document.getElementById('seg-'+segmentId).scrollIntoView({ 
      behavior: 'smooth',
      block: 'center',
      inline: 'center'
    });
    this.selectCategory(this.segment)
  }

  async nuevaReservacion(){

  
     
    const modal  = await this.modalCtrl.create({
      component: GenerarReservacionPage,
     cssClass: 'my-custom-class',
     componentProps:{
      rival:null,
      retador:null,
      cancha:null

     }
   });
   await modal .present();
 }

async next(){
   this.segment =  Number(this.segment) +1;
if(this.segment <= this.categories.length -1){

  await this.slider.slideTo(this.segment);
  this.slider.update();
  if(this.segment == this.categories.length -1){
 
    this.segment = this.categories.length-1;
   this.slider.update();
  }
  this.selectCategory(this.segment)
}
  }
  async prev(){
    this.segment = Number(this.segment)  -1;

    if(this.segment >= 0 && this.segment <= this.categories.length){
      //alert(this.segment)
    
      await this.slider.slideTo(this.segment);
      this.slider.update();
    }else{

      this.segment =  Number(this.segment) -1;
      this.slider.update();
    }
    this.selectCategory(this.segment)

   }

 async   selectCategory(index){
 
  this.segment = index;
  this.activeCategory = index;

    switch(index){
   
      case 0:
        this.gestionReservacionesService.syncRetosConfirmados(this.usuariosService.usuarioActual.Cod_Usuario)
      break;
      case 1:
  this.gestionReservacionesService.retos = [];
     break;
      case 2:
        this.gestionReservacionesService.syncRetosRecibidos(this.usuariosService.usuarioActual.Cod_Usuario)
      break;
      
      case 3:
        this.gestionReservacionesService.syncRetosEnviados(this.usuariosService.usuarioActual.Cod_Usuario)
      break;
      
      case 4:
        this.gestionReservacionesService.syncRetosHistorial(this.usuariosService.usuarioActual.Cod_Usuario)
      break;
    
      default:
        
        break;
    }
  
    
    await this.slider.slideTo(this.segment);
    this.slider.update();
  
  

       }
}
