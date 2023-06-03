import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PerfilCancha } from 'src/app/models/perfilCancha';

import { CanchasService } from '../../services/canchas.service';
import { ActionSheetButton, ActionSheetController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CanchaDetallePage } from '../cancha-detalle/cancha-detalle.page';
import { GenerarReservacionPage } from '../generar-reservacion/generar-reservacion.page';
import { FiltroCanchaPage } from '../filtro-cancha/filtro-cancha.page';

@Component({
  selector: 'app-canchas',
  templateUrl: './canchas.page.html',
  styleUrls: ['./canchas.page.scss'],
})
export class CanchasPage implements OnInit {
  filtro ={
    Cod_Provincia: null,
    Cod_Canton: null,
    Cod_Distrito: null,
    Cod_Categoria: null
  }
  textoBuscar = '';
  constructor(
public canchasService: CanchasService,
public actionSheetCtrl: ActionSheetController,
public router: Router,
public modalCtrl: ModalController
     ) { }

     ngOnInit() {
 this.canchasService.syncListaCanchasToPromise().then(resp =>{
  console.log('resp', resp)
  this.canchasService.canchas = resp;
  this.canchasService.dia = this.diaSemana(new Date().getDay());
 }, error =>{
  console.log('error', error)
 })
    
      
          
        }
      
        diaSemana(index) {
          return this.canchasService.diaSemana(index);
        }

        disponibilidadCancha(cancha:PerfilCancha) {
          return  this.canchasService.disponibilidadCancha(cancha);
          
        }
        cerrarModal(){
          this.modalCtrl.dismiss()
        }
        horarioCancha(cancha:PerfilCancha){
        return  this.canchasService.horarioCancha(cancha);
        }
 
          async onOpenMenu(cancha:PerfilCancha){

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
            
            
              const actionSheet = await this.actionSheetCtrl.create({
                header:'Opciones',
                cssClass: 'left-align-buttons',
                buttons:normalBtns,
                mode:'ios'
              });
            
            
            
            
            
            await actionSheet.present();
            
            
              }
              async canchaReservacion(cancha){

  
     
                const modal  = await this.modalCtrl.create({
                  component: GenerarReservacionPage,
                  mode:'ios',
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
              async canchaDetalle(cancha:PerfilCancha){


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
            
                this.canchasService.cancha = cancha;
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

             onSearchChange(event){

              this.textoBuscar = event.detail.value;
                }
}
