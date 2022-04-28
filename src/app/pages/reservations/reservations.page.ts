import { Component, OnInit } from '@angular/core';
import { ActionSheetButton, ActionSheetController, ModalController } from '@ionic/angular';

import { CanchaDetallePage } from '../cancha-detalle/cancha-detalle.page';
import { CanchasService } from 'src/app/services/canchas.service';
import { Router } from '@angular/router';

import { ReservacionesService } from 'src/app/services/reservaciones.service';
import { EquipoReservacionPage } from '../equipo-reservacion/equipo-reservacion.page';
import { FiltroUbicacionPage } from '../filtro-ubicacion/filtro-ubicacion.page';
import { FiltroCanchaPage } from '../filtro-cancha/filtro-cancha.page';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.page.html',
  styleUrls: ['./reservations.page.scss'],
})
export class ReservationsPage implements OnInit {
  calendar = '../assets/icons/calendar.svg';
  message = '../assets/icons/message.svg';
  location = '../assets/icons/map.svg';
  star= 'assets/search/star.svg';
  save= 'assets/search/add-user.svg';
  soccer= 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8c29jY2VyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60';
  constructor(
    
     public modalCtrl: ModalController, 
     public actionSheetCtrl: ActionSheetController,
     public canchasService: CanchasService,
    public router: Router,
    public retosService: ReservacionesService
     ) { }

  ngOnInit() {
    this.canchasService.syncCanchas()
  console.log('can', this.canchasService.canchas)
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
     component: EquipoReservacionPage,
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
