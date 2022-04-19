import { Component, OnInit } from '@angular/core';
import { ListaEquiposService } from 'src/app/services/lista-equipos.service';
import { ModalController, ActionSheetController, ActionSheetButton } from '@ionic/angular';
import { EquipoReservacionPage } from '../equipo-reservacion/equipo-reservacion.page';
import { EquiposService } from 'src/app/services/equipos.service';
import { FiltroUbicacionPage } from '../filtro-ubicacion/filtro-ubicacion.page';

@Component({
  selector: 'app-rivales',
  templateUrl: './rivales.page.html',
  styleUrls: ['./rivales.page.scss'],
})
export class RivalesPage implements OnInit {

  constructor(
    
    public listaEquiposService: ListaEquiposService,
    public modalCtrl:ModalController,
    public actionSheetCtrl: ActionSheetController,
    public equiposService: EquiposService,
    
    
    ) {
   }

  ngOnInit() {
  
  //  this.listaEquiposService.SyncEquipos();
   
  }
  async filtroUbicacion(cancha){

  
     
    const modal  = await this.modalCtrl.create({
     component: FiltroUbicacionPage,
     cssClass: 'my-custom-class',
     id:'my-modal-id'
   });
   await modal .present();
 }
 
  async onOpenMenu(equipo){


    const normalBtns : ActionSheetButton[] = [
      {   
         text: 'Ver Equipo',
         icon:'eye-outline',
         handler: () =>{
          
          this.listaEquiposService.detalleEquipo(equipo)
         }
        
        },
 {   
 //   text: canchaFavoritos ? 'Remover Favorito' : 'Favorito',
   // icon: canchaFavoritos ? 'heart' : 'heart-outline',
   text: 'Agregar a favoritos',
   icon:'heart-outline',
    handler: () =>{
     
    }
   
   },
 
         {   
          text: 'Enviar Reto',
          icon:'paper-plane-outline',
          handler: () =>{
            this.rivalReservacion(equipo)
       
          }
         
         },

         {   
          text: 'Cancelar',
          icon:'close-outline',
         role:'cancel',
         
         }
      
        ]

  
    const actionSheet = await this.actionSheetCtrl.create({
      header:'FUTPLAY',
      cssClass: 'left-align-buttons',
      buttons:normalBtns,
      mode:'ios'
    });
  
  
  
  
  
  await actionSheet.present();
  
  
    }

    
   async rivalReservacion(rival){

  
     
    const modal  = await this.modalCtrl.create({
     component: EquipoReservacionPage,
     cssClass: 'my-custom-class',
     componentProps:{
      rival:rival,
      retador:null,
      cancha:null

     },
     id:'my-modal-id'
   });
   await modal .present();
 }


}
