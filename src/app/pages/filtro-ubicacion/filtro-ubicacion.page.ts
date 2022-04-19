import { Component, OnInit } from '@angular/core';
import { ActionSheetButton, ActionSheetController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-filtro-ubicacion',
  templateUrl: './filtro-ubicacion.page.html',
  styleUrls: ['./filtro-ubicacion.page.scss'],
})
export class FiltroUbicacionPage implements OnInit {

  constructor(
public modalCtrl:ModalController,
public actionSheetCtrl: ActionSheetController

  ) { }

  ngOnInit(

  ) {
  }
 
  cerrarModal(){
    this.modalCtrl.dismiss();
  }
  async onOpenMenu(){
  
  
    const normalBtns : ActionSheetButton[] = [
      {   
         text: 'Editar Perfil',
         icon:'create-outline',
         handler: () =>{

         }
        
        },
        {   
          text: 'Modo Claro',
          icon:'sunny-outline',
          handler: () =>{

          }
         
         },
         {   
          text: 'Modo Oscuro',
          icon:'moon-outline',
          handler: () =>{
 
          }
         
         },
        {   
          text: 'Gestionar Contraseñas',
          icon:'lock-closed-outline',
          handler: () =>{
      // this.gestionarContrasena();
          }
         
         },
         {   
          text: 'Metodos de Pago',
          icon:'card-outline',
          handler: () =>{
  //    this.gestionarMetodosDePago();
          }
        },
        {   
          text: 'Cerrar Sesión',
          icon:'log-out-outline',
          handler: () =>{

          } },
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
