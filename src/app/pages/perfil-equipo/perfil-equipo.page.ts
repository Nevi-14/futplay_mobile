import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ActionSheetButton, ActionSheetController, ModalController } from '@ionic/angular';
import { EquiposService } from 'src/app/services/equipos.service';
import { JugadoresService } from '../../services/jugadores.service';
import { EditarPerfilEquipoPage } from '../editar-perfil-equipo/editar-perfil-equipo.page';
import { EstadisticaEquipoPage } from '../estadistica-equipo/estadistica-equipo.page';
import { PerfilJugadorPage } from '../perfil-jugador/perfil-jugador.page';
import { MisEquiposPage } from '../mis-equipos/mis-equipos.page';
import { BuscarJugadoresPage } from '../buscar-jugadores/buscar-jugadores.page';
@Component({
  selector: 'app-perfil-equipo',
  templateUrl: './perfil-equipo.page.html',
  styleUrls: ['./perfil-equipo.page.scss'],
})
export class PerfilEquipoPage  {
  dureza = [

    {id:0,titulo:'Equipo Neutral',image:'equipo-neutral.svg'},
    {id:1,titulo:'Juego Molesto',image:'juego-molesto.svg'},
    {id:2,titulo:'Agresividad Irresponsable',image:'agresividad-irresponsable.svg'},
    {id:3,titulo:'Caracter Revelde',image:'caracter-revelde.svg'},
    {id:4,titulo:'Mas Que Un Club',image:'mas-que-un-club.svg'},
    {id:5,titulo:'Clase Mundia FairPlay',image:'clase-mundial-fairplay.svg'}
  
  ]
  teamPic = null
constructor(
  public equiposService: EquiposService,
  public jugadoresService: JugadoresService,
  public actionSheetCtrl: ActionSheetController,
  public modalCtrl:ModalController
) {
  
}

filledStars(stars:number){

  return new Array(stars)
}
emptyStars(stars:number){
  let value = 5 - stars;
  return new Array(value)
}



durezaEquipo(value){
console.log(value.detail.value)
alert(value)
 
}

async  gestionarPerfil(){

  const modal = await this.modalCtrl.create({
    component:EditarPerfilEquipoPage,
    componentProps:{
      equipo:this.equiposService.equipo.equipo
    },
    id:'perfil-equipo',
    cssClass:'my-custom-modal'
  });

  modal.present();
  const { data } = await modal.onWillDismiss();
  console.log(data)
 


  }

  async myClubsMenu(){

    const modal = await this.modalCtrl.create({
      component: MisEquiposPage,
      cssClass:'my-custom-modal',
      id:'my-clubs'
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();

 
    if(data != undefined){


 
      this.jugadoresEquipo();




 
   
   }

  }



async onOpenMenu(jugador){
  console.log(jugador)
  
      const normalBtns : ActionSheetButton[] = [
        {   
           text: 'Detalle Jugador',
           icon:'person-outline',
           handler: () =>{
   this.perfilJugador(jugador);
           }
          
          },
          {   
            text: 'Convertir Administrador',
            icon:'settings-outline',
            handler: () =>{
  
            }
           
           },
           {   
            text: 'Convertir jugador regular',
            icon:'person-outline',
            handler: () =>{
   
            }
           
           },
          {   
            text: 'Remover Jugador',
            icon:'lock-closed-outline',
            handler: () =>{
           //   this.confirmDelete(jugador);

   
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

      jugadoresEquipo(){

        this.jugadoresService.syncJugadoresEquipos( this.equiposService.equipo.equipo.Cod_Equipo).then( jugadores =>{
        
         this.jugadoresService.jugadores = []
         this.jugadoresService.jugadores = jugadores;
         //this.solicitudesService.syncGetSolicitudesEquipos(this.equiposService.perfilEquipo.Cod_Equipo, true,false, true)
             
           }, error =>{
       
            // this.alertasService.loadingDissmiss();
             //this.alertasService.message('FUTPLAY', 'Error cargando lista de jugadores...')
           })
         }

         async presentModal(equipo) {
          const modal = await this.modalCtrl.create({
            component: EstadisticaEquipoPage,
      
            cssClass:'my-custom-css',
            componentProps:{
              equipo:equipo
            }
          });
          return await modal.present();
        }
    async perfilJugador(jugador) {
      const modal = await this.modalCtrl.create({
        component:PerfilJugadorPage,
        cssClass: 'my-custom-class',
        componentProps:{
          perfil: jugador
        }
      });
      return await modal.present();
    }
    async solicitudesEquipos() {
      const modal = await this.modalCtrl.create({
        component:BuscarJugadoresPage,
        cssClass:'my-custom-modal'
      });
       await modal.present();
  
       const { data } = await modal.onWillDismiss();
       if(data != undefined){
         
        this.jugadoresEquipo();
         
       }
    }
}
