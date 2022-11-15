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
  filtro ={
    Cod_Provincia: null,
    Cod_Canton: null,
    Cod_Distrito: null,
    Cod_Categoria: null
  }
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
         breakpoints: [0, 0.3, 0.5, 0.8],
         initialBreakpoint: 0.5,
         id:'my-modal-id',
         componentProps:{
          'Cod_Provincia':this.filtro.Cod_Provincia, 
          'Cod_Canton':this.filtro.Cod_Canton, 
          'Cod_Distrito':this.filtro.Cod_Distrito , 
          'Cod_Categoria':this.filtro.Cod_Categoria 
         }
       });
       await modal .present();

   const { data } = await modal.onWillDismiss();
 console.log(data, 'filto return')
   if(data !== undefined ){
    this.filtro.Cod_Provincia = data.Cod_Provincia;
    this.filtro.Cod_Canton = data.Cod_Canton;
    this.filtro.Cod_Distrito = data.Cod_Distrito;
    this.filtro.Cod_Categoria = data.Cod_Categoria;
  

   }
     }
}
