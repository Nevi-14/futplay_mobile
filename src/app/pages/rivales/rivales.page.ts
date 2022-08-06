import { Component, OnInit } from '@angular/core';
import { ListaEquiposService } from 'src/app/services/lista-equipos.service';
import { ModalController, ActionSheetController, ActionSheetButton } from '@ionic/angular';
import { EquiposService } from 'src/app/services/equipos.service';
import { FiltroUbicacionPage } from '../filtro-ubicacion/filtro-ubicacion.page';
import { GenerarReservacionPage } from '../generar-reservacion/generar-reservacion.page';
import { ClasificacionPage } from '../clasificacion/clasificacion.page';
import { AlertasService } from '../../services/alertas.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-rivales',
  templateUrl: './rivales.page.html',
  styleUrls: ['./rivales.page.scss'],
})
export class RivalesPage implements OnInit {
  categories = ['Rivales', 'Clasificacion'];
  opts = {
    freeMode:true,
    slidesPerView: 2.8,
    slidesOffsetBefore:30,
    slidesOffsetAfter:100
  }

  filtro ={
    Cod_Provincia: null,
    Cod_Canton: null,
    Cod_Distrito:null,
  }
  activeCategory = 0;
  constructor(
    
    public listaEquiposService: ListaEquiposService,
    public modalCtrl:ModalController,
    public actionSheetCtrl: ActionSheetController,
    public equiposService: EquiposService,
    public alertasService: AlertasService,
    public usuariosService: UsuariosService
    
    
    ) {
   }

  ngOnInit() {
  
  //  this.listaEquiposService.SyncEquipos();
   
  }
  filledStars(stars:number){

    return new Array(stars)
  }
  emptyStars(stars:number){
    let value = 5 - stars;
    return new Array(value)
  }
  selectCategory(index){
    this.activeCategory = index;
   
    switch(index){
   
     case 0:
      this.equiposService.equipos  = [];
      this.alertasService.presentaLoading('Cargando datos...');
      this.equiposService.SyncEquipos(this.usuariosService.usuarioActual.Cod_Usuario).then(resp =>{
        this.alertasService.loadingDissmiss();
        this.equiposService.equipos = resp.slice(0);
      }, error =>{
        this.alertasService.loadingDissmiss();
        this.alertasService.message('FUTLAY', 'Error cargando datos...');
      })
        
     
     case 1:
      this.equiposService.equipos  = [];

      this.alertasService.presentaLoading('Cargando datos...');
      this.equiposService.syncGetClasficiacion().then(equipos => {

        let length =  equipos.length > 10  ? 10 : equipos.length;
        for (let i =0; i < length ; i++){
this.equiposService.equipos.push(equipos[i]);
        }
       
this.alertasService.loadingDissmiss();
      }, error =>{
        this.alertasService.loadingDissmiss();
      });
     
  
  
        
     break;

   
     default:
       
       break;
   }
  }
   

  async filtroUbicacion(){

  
     
    const modal  = await this.modalCtrl.create({
     component: FiltroUbicacionPage,
     cssClass: 'my-custom-class',
     breakpoints: [0, 0.3, 0.5, 0.8],
     initialBreakpoint: 0.5,
     componentProps : {
      'Cod_Provincia': this.filtro.Cod_Provincia,
      'Cod_Canton': this.filtro.Cod_Canton,
      'Cod_Distrito': this.filtro.Cod_Distrito
     },
     
     id:'my-modal-id'
   });

   await modal .present();

   const { data } = await modal.onWillDismiss();
 console.log(data)
   if(data !== undefined ){

    this.filtro.Cod_Provincia = data.Cod_Provincia;
    this.filtro.Cod_Canton = data.Cod_Canton;
    this.filtro.Cod_Distrito = data.Cod_Distrito;

   }
 }
 async clasificacionGlobal(){

  
     
  const modal  = await this.modalCtrl.create({
   component: ClasificacionPage,
   cssClass: 'my-custom-class',
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
     component: GenerarReservacionPage,
     cssClass: 'my-custom-class',
     componentProps:{
      rival:rival,
      retador:null,
      cancha:null

     }
   });
   await modal .present();

   const { data } = await modal.onWillDismiss();
 
   if(data !== undefined ){

 
   }
 }


}
