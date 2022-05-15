import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetButton, ActionSheetController, ModalController } from '@ionic/angular';
import { CanchasService } from 'src/app/services/canchas.service';
import { GestorImagenesService } from 'src/app/services/gestor-imagenes.service';
import { ReservacionesService } from 'src/app/services/reservaciones.service';
import { CanchaDetallePage } from '../cancha-detalle/cancha-detalle.page';
import { FiltroCanchaPage } from '../filtro-cancha/filtro-cancha.page';
import { GenerarReservacionPage } from '../generar-reservacion/generar-reservacion.page';

@Component({
  selector: 'app-canchas',
  templateUrl: './canchas.page.html',
  styleUrls: ['./canchas.page.scss'],
})
export class CanchasPage implements OnInit {

  calendar = '../assets/icons/calendar.svg';
  message = '../assets/icons/message.svg';
  location = '../assets/icons/map.svg';
  star= 'assets/search/star.svg';
  save= 'assets/search/add-user.svg';
  soccer= 'https://media.istockphoto.com/photos/soccer-field-with-illumination-green-grass-and-cloudy-sky-background-picture-id1293105095?b=1&k=20&m=1293105095&s=170667a&w=0&h=1guu6B_WTHw5B4EShizGVRf3pyeBNNaGbtowrOLVjyM=';
  img = 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c29jY2VyJTIwc3RhZGl1bXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60';
  constructor(
    
     public modalCtrl: ModalController, 
     public actionSheetCtrl: ActionSheetController,
     public canchasService: CanchasService,
    public router: Router,
    public retosService: ReservacionesService,
    private cdr: ChangeDetectorRef,
    private http: HttpClient,
    public gestorImagenesService: GestorImagenesService
     ) { }

  ngOnInit() {
    this.cdr.detectChanges();
    this.canchasService.syncCanchas()
  console.log('can', this.canchasService.canchas)
  }



dateF(){
  return new Date().getTime() 
}
 async onOpenMenu(cancha){

//  const canchaFavoritos = this.canchasService.canchasInFavorite(cancha);
 //console.log(canchaFavoritos,'fav');
  const normalBtns : ActionSheetButton[] = [
    {   
       text: 'Ver Cancha',
       icon:'eye-outline',
       handler: () =>{
         this.canchaDetalle(cancha);
       }
      
      },
      {   
        text: 'Reservar Cancha',
        icon:'calendar-outline',
        handler: () =>{
          //this.router.navigate(['/calendar-page'])
        //  this.retosService.getReservaciones(cancha);
          this.canchaReservacion(cancha)
        }
       
       },
       {   
        text: 'Cancelar',
        icon:'close-outline',
       role:'cancel',
       
       }
    
      ]
  const favoritos : ActionSheetButton =  {   
 //   text: canchaFavoritos ? 'Remover Favorito' : 'Favorito',
   // icon: canchaFavoritos ? 'heart' : 'heart-outline',
   text: 'Agregar a favoritos',
   icon:'heart-outline',
    handler: () =>{
      this.onToggleFavorite(cancha);
    }
   
   }
  
   const number = 1;
  
  if( number >= 1){
    normalBtns.unshift(favoritos);
  }

  const actionSheet = await this.actionSheetCtrl.create({
    header:'Opciones',
    cssClass: 'left-align-buttons',
    buttons:normalBtns,
    mode:'ios'
  });





await actionSheet.present();


  }
  async filtroUbicacion(){

  
     
    const modal  = await this.modalCtrl.create({
     component: FiltroCanchaPage,
     cssClass: 'my-custom-class',
     id:'my-modal-id'
   });
   await modal .present();
 }
  async canchaReservacion(cancha){

  
     
    const modal  = await this.modalCtrl.create({
      component: GenerarReservacionPage,
     cssClass: 'my-custom-class',
     componentProps:{
      rival:null,
      retador:null,
      cancha:cancha

     },
     id:'my-modal-id'
   });
   await modal .present();
 }
  onShare(){
    console.log('share articule')
  }

  onToggleFavorite(cancha){


    const i = this.canchasService.canchas.findIndex(canchaF => canchaF.Cod_Cancha === cancha.canchaID);
    
/***
 *     this.canchasService.canchas[i].favoritos = !this.canchasService.canchas[i].favoritos
    console.log( this.canchasService.canchas[i].favoritos, 'fav2')
 */
    
  }

  async canchaDetalle(cancha){


    const modal = await this.modalCtrl.create({
      component: CanchaDetallePage,
      cssClass:'my-custom-modal',
      backdropDismiss: true,
      swipeToClose:false,
      animated: true,
      componentProps : {
        cancha:cancha
      }

      
  
    });
  
   modal.present();



    
  }

  async reservarCancha(cancha){

    this.retosService.cancha = cancha;
    this.router.navigate(['/reservar-cancha']);
   
/**
 *     const modal = await this.modalCtrl.create({
      component: CalendarioComponent,
      cssClass: 'custom-class',
      backdropDismiss: true,
      swipeToClose:false,
      animated: true,
      componentProps : {
        cancha:cancha
      }

      
  
    });
  
   modal.present();
 */



    
  }
}
