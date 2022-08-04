import { ChangeDetectorRef, Component } from '@angular/core';
import { ActionSheetButton, ActionSheetController, ModalController, AlertController } from '@ionic/angular';
import { Equipos } from 'src/app/models/equipos';
import { AlertasService } from 'src/app/services/alertas.service';
import { EquiposService } from 'src/app/services/equipos.service';
import { SolicitudesService } from 'src/app/services/solicitudes.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { EditarPerfilEquipoPage } from '../editar-perfil-equipo/editar-perfil-equipo.page';
import { EstadisticaEquipoPage } from '../estadistica-equipo/estadistica-equipo.page';
import { PerfilJugadorPage } from '../perfil-jugador/perfil-jugador.page';
import { SolicitudesEquiposPage } from '../solicitudes-equipos/solicitudes-equipos.page';
import { MisEquiposPage } from '../mis-equipos/mis-equipos.page';
import { BuscarJugadoresPage } from '../buscar-jugadores/buscar-jugadores.page';

@Component({
  selector: 'app-perfil-equipo',
  templateUrl: './perfil-equipo.page.html',
  styleUrls: ['./perfil-equipo.page.scss'],
})
export class PerfilEquipoPage  {

  club: Equipos;

  add ='../assets/icons/create.svg';
 find ='../assets/icons/join.svg';
 teamPic = 'https://futplaycompany.com/FUTPLAY_APIS_HOST/PerfilEquipoUploads/'+  this.equiposService.perfilEquipo.Foto  +'?'+ this.dateF();
  constructor( 
    public modalCtrl: ModalController, 
    public user: UsuariosService,  
    public equiposService: EquiposService, 
    public solicitudesService:SolicitudesService,
     public actionSheetCtrl: ActionSheetController,
     private cdr: ChangeDetectorRef,
      public alertasService: AlertasService,
      public alertCtrl: AlertController
      ) { }

dureza = [

  {id:0,titulo:'Equipo Neutral',image:'equipo-neutral.svg'},
  {id:1,titulo:'Juego Molesto',image:'juego-molesto.svg'},
  {id:2,titulo:'Agresividad Irresponsable',image:'agresividad-irresponsable.svg'},
  {id:3,titulo:'Caracter Revelde',image:'caracter-revelde.svg'},
  {id:4,titulo:'Mas Que Un Club',image:'mas-que-un-club.svg'},
  {id:5,titulo:'Clase Mundia FairPlay',image:'clase-mundial-fairplay.svg'}

]

durezaEquipo(value){
console.log(value.detail.value)
alert(value)
 
}
  ionViewWillEnter(){

    this.dureza.forEach(fu =>{
      console.log(fu)
    })
    if( this.equiposService.perfilEquipo){
      
      this.equiposService.jugadoresPerfilEquipo = []
      this.alertasService.presentaLoading('Cargando lista de jugadores...')
this.jugadoresEquipo();



    }

  }


  filledStars(stars:number){

    return new Array(stars)
  }
  emptyStars(stars:number){
    let value = 5 - stars;
    return new Array(value)
  }
  jugadoresEquipo(){

 this.equiposService.SyncJugadoresEquipos( this.equiposService.perfilEquipo.Cod_Equipo).then( jugadores =>{
 this.alertasService.loadingDissmiss();
  this.equiposService.jugadoresPerfilEquipo = []
  this.equiposService.jugadoresPerfilEquipo = jugadores;
  this.solicitudesService.syncGetSolicitudesEquipos(this.equiposService.perfilEquipo.Cod_Equipo, true,false, true)
      
    }, error =>{

      this.alertasService.loadingDissmiss();
      this.alertasService.message('FUTPLAY', 'Error cargando lista de jugadores...')
    })
  }
     // INICIO MENU DE OPCIONES RELACIONADAS AL PERFIL DE USUARIO
  
  
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
              this.confirmDelete(jugador);

   
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

      
  async confirmDelete(jugador) {

    if(jugador.Cod_Usuario == this.equiposService.perfilEquipo.Cod_Usuario){
this.alertasService.message('FUTPLAY', 'No se puede eliminar el usuario por defecto')
      return
    }
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'FUTPLAY',
      message: '¿Desea eliminar el jugador del equipo?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Aceptar',
          id: 'confirm-button',
          handler: () => {
            this.alertasService.presentaLoading('Eliminando jugador..')
            this.solicitudesService.syncDeleteJugador(jugador.Cod_Usuario).then(resp =>{
         this.alertasService.loadingDissmiss();
                              this.jugadoresEquipo();
                              this.alertasService.message('FUTPLAY', 'Jugador Eliminado')
                            }, error =>{

                              this.alertasService.loadingDissmiss();
                              this.alertasService.message('FUTPLAY', 'Error eliminando jugador.')
                            })
          }
        }
      ]
    });

    await alert.present();
  }


  
      dateF(){
        return new Date().getTime() 
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

  
  async  gestionarPerfil(){

    const modal = await this.modalCtrl.create({
      component:EditarPerfilEquipoPage,
      componentProps:{
        equipo:this.equiposService.perfilEquipo
      },
      id:'perfil-equipo',
      cssClass:'my-custom-modal'
    });

    modal.present();
    const { data } = await modal.onWillDismiss();
    console.log(data)
    this.teamPic = 'https://futplaycompany.com/FUTPLAY_APIS_HOST/PerfilEquipoUploads/'+ this.equiposService.perfilEquipo.Foto +'?'+ this.dateF();
 

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

  async myClubsMenu(){

    const modal = await this.modalCtrl.create({
      component: MisEquiposPage,
      cssClass:'my-custom-modal',
      id:'my-clubs'
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();
    if(data != undefined){


      console.log(data.equipo,'equipoooos')
      this.equiposService.perfilEquipo  = null;
      this.equiposService.perfilEquipo = data.equipo;
      this.equiposService.perfilEquipo.Foto = data.equipo.Foto;
      this.cdr.detectChanges();
      this.teamPic = 'https://futplaycompany.com/FUTPLAY_APIS_HOST/PerfilEquipoUploads/'+ this.equiposService.perfilEquipo.Foto +'?'+ this.dateF();
      console.log(this.equiposService.perfilEquipo,'this.equiposService.perfilEquipo')
      this.jugadoresEquipo();




 
   
   }

  }



}
