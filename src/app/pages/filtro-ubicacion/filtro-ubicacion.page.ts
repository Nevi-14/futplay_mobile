import { Component, OnInit } from '@angular/core';
import { ActionSheetButton, ActionSheetController, ModalController } from '@ionic/angular';
import { CantonesService } from 'src/app/services/cantones.service';
import { DistritosService } from 'src/app/services/distritos.service';
import { EquiposService } from 'src/app/services/equipos.service';
import { ListaEquiposService } from 'src/app/services/lista-equipos.service';
import { ProvinciasService } from 'src/app/services/provincias.service';

@Component({
  selector: 'app-filtro-ubicacion',
  templateUrl: './filtro-ubicacion.page.html',
  styleUrls: ['./filtro-ubicacion.page.scss'],
})
export class FiltroUbicacionPage implements OnInit {
  filtro ={
    Cod_Provincia: 0,
    Cod_Canton: 0,
    Cod_Distrito: 0
  }
  constructor(
public modalCtrl:ModalController,
public actionSheetCtrl: ActionSheetController,
public provinciasService: ProvinciasService,
public cantonesService: CantonesService,
public distritosService: DistritosService,
public equiposService:EquiposService

  ) { }

  ngOnInit(

  ) {
    this.provinciasService.syncProvincias();
  }
 
  cerrarModal(){
    this.modalCtrl.dismiss();
  }

  submit(){
    this.cerrarModal()
    this.equiposService.syncfiltrarEquipos(
      this.filtro.Cod_Provincia,
      this.filtro.Cod_Canton,
      this.filtro.Cod_Distrito
    );
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

    onChange($event , provincia, canton, distrito){
      if(provincia){
    
     this.cantonesService.syncCantones($event.target.value);
      }else if(canton){
    
        this.distritosService.syncDistritos(this.filtro.Cod_Provincia, $event.target.value);
    
      }else{
        
      }
      console.log($event.target.value);
      }

}
