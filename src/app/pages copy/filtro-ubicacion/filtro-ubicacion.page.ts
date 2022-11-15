import { Component, Input, OnInit } from '@angular/core';
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
    Cod_Provincia: null,
    Cod_Canton: null,
    Cod_Distrito:null,
  }
  @Input() Cod_Provincia:number;
  @Input() Cod_Canton:number ;
  @Input() Cod_Distrito:number;
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
    this.filtro.Cod_Provincia = this.Cod_Provincia;
    this.filtro.Cod_Canton = this.Cod_Canton;
    this.filtro.Cod_Distrito = this.Cod_Distrito;
    this.provinciasService.syncProvincias();
  }
 
  cerrarModal(){
    this.modalCtrl.dismiss(this.modalCtrl.dismiss({
      'Cod_Provincia': this.filtro.Cod_Provincia,
      'Cod_Canton':this.filtro.Cod_Canton,
      'Cod_Distrito':this.filtro.Cod_Distrito
    }));
  }

  submit(){
    this.cerrarModal()
    this.equiposService.syncfiltrarEquipos(
      this.filtro.Cod_Provincia,
      this.filtro.Cod_Canton,
      this.filtro.Cod_Distrito
    );
  }

  limpiarDatos(){
    this.filtro ={
      Cod_Provincia: null,
      Cod_Canton: null,
      Cod_Distrito:null,
    }
    this.submit();
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

    onChangeProvincias($event){
  
      this.filtro.Cod_Provincia = $event.target.value;
      this.filtro.Cod_Canton = null;
      this.filtro.Cod_Distrito = null;
      this.cantonesService.cantones = [];
      this.distritosService.distritos = [];
   if(this.filtro.Cod_Provincia){
    this.cantonesService.syncCantones(this.filtro.Cod_Provincia).then(resp =>{

  this.cantonesService.cantones = resp.slice(0);

    })
   }else{

   }
    }

    onChangeCantones($event){
  
      this.filtro.Cod_Canton = $event.target.value;
      this.filtro.Cod_Distrito = null;
      this.distritosService.distritos = [];
  if(this.filtro.Cod_Provincia && this.filtro.Cod_Canton){
    this.distritosService.syncDistritos(this.filtro.Cod_Provincia,this.filtro.Cod_Canton).then(resp =>{
      this.distritosService.distritos = resp.slice(0);
  
      
    })
  }else{
 
  }
  
    }
  
    onChangeDistritos($event){
  
      this.filtro.Cod_Distrito = $event.target.value;
  
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
