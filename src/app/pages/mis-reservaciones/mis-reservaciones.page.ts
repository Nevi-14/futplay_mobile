import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';
import { PerfilReservaciones } from 'src/app/models/perfilReservaciones';
import { ReservacionesService } from 'src/app/services/reservaciones.service';
import { UsuariosService } from '../../services/usuarios.service';
import { AceptarRetoPage } from '../aceptar-reto/aceptar-reto.page';
import { GenerarReservacionPage } from '../generar-reservacion/generar-reservacion.page';
import { CanchasService } from '../../services/canchas.service';
import { PartidoService } from 'src/app/services/partido.service';
import { partidos } from 'src/app/models/partidos';
 
@Component({
  selector: 'app-mis-reservaciones',
  templateUrl: './mis-reservaciones.page.html',
  styleUrls: ['./mis-reservaciones.page.scss'],
})
export class MisReservacionesPage implements OnInit {
  categories = ['Confirmados','Recibidos','Enviados','Historial','Revisión','Canceladas'];

  @ViewChild(IonSlides) slider: IonSlides;
  segment = 0;
  activeCategory = 0;
  cancha = null;
retador = null;
Titulo = '';
show = false;
rival = null;
textoBuscar = '';
partido:partidos[]=[]
  constructor(
public reservacionesService:ReservacionesService,
public usuariosService:UsuariosService,
public modalCtrl: ModalController,
public canchasService:CanchasService,
public partidosService:PartidoService
  ) {

     
  }
  ngOnInit() {

    this.reservacionesService.syncgGtReservacionesConfirmadas(this.usuariosService.usuarioActual.usuario.Cod_Usuario).then(reservaciones =>{
this.reservacionesService.reservaciones = reservaciones;
console.log('reservaciones', this.reservacionesService.reservaciones)
    })
  }

  async detalleReto(reto:PerfilReservaciones) {


    
if(reto.reservacion.Cod_Estado == 7){
  await   this.partidosService.syncGetPartidoReservacion(reto.reservacion.Cod_Reservacion).then(partido =>{
    this.partido = partido;


    console.log('partido', partido)
    
    
            })

}



    const modal = await this.modalCtrl.create({
      component: AceptarRetoPage,
      cssClass: 'my-custom-class',
      componentProps: {
        reto: reto,
        partido:this.partido
      },
      id:'aceptar-reto'
    });

     await modal.present();

    let {data} = await modal.onDidDismiss();

    this.selectCategory(this.segment)
  }
  cerrarModal (){

 this.modalCtrl.dismiss();
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
  async segmentChanged(event) {
    await this.slider.slideTo(this.segment);
    this.slider.update();
  }
  async slideChanged() {
 //   this.segment =  await this.slider.getActiveIndex();
 this.segment =  await this.slider.getActiveIndex();
    this.focusSegment(this.segment);
   
    
  }

  
  onSearchChange(event){

    this.textoBuscar = event.detail.value;
      }
  focusSegment(segmentId) {
    document.getElementById('seg-'+segmentId).scrollIntoView({ 
      behavior: 'smooth',
      block: 'center',
      inline: 'center'
    });
    this.selectCategory(this.segment)
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
        // confirmados

        this.reservacionesService.syncgGtReservacionesConfirmadas(this.usuariosService.usuarioActual.usuario.Cod_Usuario).then(reservaciones =>{
          this.reservacionesService.reservaciones = reservaciones;
          console.log('reservaciones', this.reservacionesService.reservaciones)

        })
         break;
 
       case 1:
 
  // recibidos
  this.reservacionesService.syncgGtReservacionesRecibidas(this.usuariosService.usuarioActual.usuario.Cod_Usuario).then(reservaciones =>{
    this.reservacionesService.reservaciones = reservaciones;
    console.log('reservaciones', this.reservacionesService.reservaciones)

  })
      break;
       case 2:
    // enviados
    this.reservacionesService.syncgGtReservacionesEnviadas(this.usuariosService.usuarioActual.usuario.Cod_Usuario).then(reservaciones =>{
      this.reservacionesService.reservaciones = reservaciones;
    
      console.log('reservaciones', this.reservacionesService.reservaciones)
    })
       break;
       
       case 3:
     //hisyotial
     this.reservacionesService.syncgGtReservacionesHistorial(this.usuariosService.usuarioActual.usuario.Cod_Usuario).then(reservaciones =>{
      this.reservacionesService.reservaciones = reservaciones;
    
      console.log('reservaciones', this.reservacionesService.reservaciones)
    })
       break;
       
       case 4:
        this.reservacionesService.syncGetReservacionesResvision(this.usuariosService.usuarioActual.usuario.Cod_Usuario).then(reservaciones =>{
          this.reservacionesService.reservaciones = reservaciones;
        
          console.log('reservaciones', this.reservacionesService.reservaciones)
        })

       break;
       case 5:
        this.reservacionesService.syncGetReservacionesCanceladas(this.usuariosService.usuarioActual.usuario.Cod_Usuario).then(reservaciones =>{
          this.reservacionesService.reservaciones = reservaciones;
        
          console.log('reservaciones', this.reservacionesService.reservaciones)
        })

       break;
       default:
        this.reservacionesService.reservaciones = []
         break;
     }
   
     
     await this.slider.slideTo(this.segment);
     this.slider.update();
   
   
 
        }

      
}
