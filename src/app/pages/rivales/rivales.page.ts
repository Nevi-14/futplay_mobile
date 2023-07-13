import { Component, OnInit } from '@angular/core';
import { AlertasService } from 'src/app/services/alertas.service';
import { EquiposService } from 'src/app/services/equipos.service';
import { UsuariosService } from '../../services/usuarios.service';
import { FiltroUbicacionPage } from '../filtro-ubicacion/filtro-ubicacion.page';
import { ActionSheetButton, ModalController, ActionSheetController, InfiniteScrollCustomEvent } from '@ionic/angular';
import { GenerarReservacionPage } from '../generar-reservacion/generar-reservacion.page';
import { PerfilEquipoPage } from '../perfil-equipo/perfil-equipo.page';
import { EquipoDetalleModalPage } from '../equipo-detalle-modal/equipo-detalle-modal.page';
import { PerfilEquipos } from 'src/app/models/perfilEquipos';
'@ionic/angular';


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
  categoryIndex = 0;
  filtro ={
    Cod_Provincia: null,
    Cod_Canton: null,
    Cod_Distrito:null,
  }
  activeCategory = 0;
  textoBuscar = '';

  constructor(
    public alertasService: AlertasService,
    public modalCtrl: ModalController,
    public equiposService:EquiposService,
    public usuariosService: UsuariosService,
    public actionSheetCtrl: ActionSheetController

    
    
    ) {
   }

  ngOnInit() {
 
 
  }

 
  onIonInfinite(ev) {
    this.equiposService.generateItems();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  cargarEquipos(){

       this.equiposService.equipos  = [];
      this.alertasService.presentaLoading('Cargando datos...');
      this.equiposService.syncListaEquiposToPromise(this.usuariosService.usuarioActual.Cod_Usuario).then(resp =>{
        this.alertasService.loadingDissmiss();
        this.equiposService.equipos = resp.slice(0);
      }, error =>{
        this.alertasService.loadingDissmiss();
        this.alertasService.message('FUTLAY', 'Error cargando datos...');
      })
  }

  selectCategory(index){
    this.activeCategory = index;
   console.log('index', index)
    switch(index){
   
     case 0:
   this.cargarEquipos();
        
     break;
     case 1:
      this.equiposService.equipos  = [];

      this.alertasService.presentaLoading('Cargando datos...');
      this.equiposService.syncClasificacionEquiposToPromise().then(equipos => {

        this.equiposService.equipos = equipos
this.alertasService.loadingDissmiss();
      }, error =>{
        this.alertasService.loadingDissmiss();
        this.alertasService.message('FUTLAY', 'Error cargando datos...');
      });
     
  
       break;
   }
  }
  filledStars(stars:number){

    return new Array(stars)
  }
  emptyStars(stars:number){
    let value = 5 - stars;
    return new Array(value)
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
 onSearchChange($event){

  this.textoBuscar = $event.detail.value;
 }

  
 async onOpenMenu(equipo :PerfilEquipos){
  console.log(equipo)

  if(this.activeCategory == 0){

    const normalBtns : ActionSheetButton[] = [
      {   
        text: 'Detalle Equipo',
        icon:'person-outline',
        handler: () =>{ 
this.equipoDetalle(equipo)
          console.log('equipo',equipo)
        }
       
       },
    
      {   
        text: 'Enviar reto',
        icon:'paper-plane-outline',
        handler: () =>{
         // this.videoScreen(3);
      this.enviarReto(equipo)
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

  }else{
    const normalBtns : ActionSheetButton[] = [
      {   
        text: 'Detalle Equipo',
        icon:'person-outline',
        handler: () =>{ 
this.equipoDetalle(equipo)
          console.log('equipo',equipo)
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
  
   
    
      }
      async equipoDetalle(equipo:PerfilEquipos){
     
        const modal  = await this.modalCtrl.create({
          component: EquipoDetalleModalPage,
         cssClass: 'my-custom-class',
         componentProps:{
          equipo:equipo
      
         },
         id:'my-modal-id'
       });
       await modal .present();
       }
      async enviarReto(equipo:PerfilEquipos){
     
        const modal  = await this.modalCtrl.create({
          component: GenerarReservacionPage,
         cssClass: 'my-custom-class',
         componentProps:{
          rival:equipo,
          retador:null,
          cancha:null
      
         },
         id:'my-modal-id'
       });

       await     modal.present();
       const { data } = await modal.onWillDismiss();
       this.cargarEquipos();
       }
}
