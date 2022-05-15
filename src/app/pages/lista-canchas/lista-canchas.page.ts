import { Component, OnInit } from '@angular/core';
import { ActionSheetButton, ModalController, ActionSheetController } from '@ionic/angular';
import { CanchasService } from 'src/app/services/canchas.service';
import { CanchaDetallePage } from '../cancha-detalle/cancha-detalle.page';
import { FiltroCanchaPage } from '../filtro-cancha/filtro-cancha.page';

@Component({
  selector: 'app-lista-canchas',
  templateUrl: './lista-canchas.page.html',
  styleUrls: ['./lista-canchas.page.scss'],
})
export class ListaCanchasPage implements OnInit {
  soccer= 'assets/icon/soccer.svg';
  textoBuscar = '';
  constructor(
    public modalCtrl: ModalController,
    public canchasService: CanchasService,
    public actionSheetCtrl: ActionSheetController

  ) { }

  ngOnInit() {

this.canchasService.syncCanchas();

    
  }

  
  retornarCancha(cancha){

    this.modalCtrl.dismiss({

      cancha:  cancha
     });

  }
  onSearchChange(event){
    this.textoBuscar = event.detail.value;
  }
  cerrarModal(){
    this.modalCtrl.dismiss();
  }

  async canchaDetalle(cancha){


    const modal = await this.modalCtrl.create({
      component: CanchaDetallePage,
      cssClass: 'custom-class',
      backdropDismiss: true,
      swipeToClose:false,
      animated: true,
      componentProps : {
        cancha:cancha
      }

      
  
    });
  
   modal.present();



    
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
            this.retornarCancha(cancha)
          
            }
           
           },
           {   
            text: 'Cancelar',
            icon:'close-outline',
           role:'cancel',
           
           }
        
          ]


    
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
}
