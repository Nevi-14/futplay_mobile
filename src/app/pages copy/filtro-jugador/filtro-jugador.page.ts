import { Component, OnInit } from '@angular/core';
import { ActionSheetButton, ActionSheetController, ModalController } from '@ionic/angular';
import { CantonesService } from 'src/app/services/cantones.service';
import { DistritosService } from 'src/app/services/distritos.service';
import { PosicionesService } from 'src/app/services/posiciones.service';
import { ProvinciasService } from 'src/app/services/provincias.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-filtro-jugador',
  templateUrl: './filtro-jugador.page.html',
  styleUrls: ['./filtro-jugador.page.scss'],
})
export class FiltroJugadorPage implements OnInit {

  constructor(
public actionSheetCtrl: ActionSheetController,
public provinciasService: ProvinciasService,
public cantonesService: CantonesService,
public distritosService: DistritosService,
public posicionesService: PosicionesService,
public modalCtrl: ModalController,
public usuariosService: UsuariosService

  ) { }

  filtro ={
    Cod_Provincia: null,
    Cod_Canton: null,
    Cod_Distrito: null,
    Cod_Posicion: null,
    Estatura: 0,
    Peso: 0
  }
  rangeValue: number = 0;
  ngOnInit() {

    this.provinciasService.syncProvincias();
    this.posicionesService.syncPosiciones();


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

  async onOpenMenu(cancha){

    //  const canchaFavoritos = this.canchasService.canchasInFavorite(cancha);
     //console.log(canchaFavoritos,'fav');
      const normalBtns : ActionSheetButton[] = [
        {   
           text: 'Ver Cancha',
           icon:'eye-outline',
           handler: () =>{
      
           }
          
          },
          {   
            text: 'Reservar Cancha',
            icon:'calendar-outline',
            handler: () =>{
              //this.router.navigate(['/calendar-page'])
            //  this.retosService.getReservaciones(cancha);
            
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

   
change(range){
  console.log(this.filtro.Estatura)
}
 
cerrarModal(){
  this.modalCtrl.dismiss();
}


submit(){
  this.cerrarModal();
  this.usuariosService.syncfiltrarUsuarios(this.filtro.Cod_Provincia,this.filtro.Cod_Canton, this.filtro.Cod_Distrito, this.filtro.Cod_Posicion,this.filtro.Estatura, this.filtro.Peso)

}
}
