import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ActionSheetButton, ActionSheetController, ModalController, AlertController } from '@ionic/angular';
import { EquiposService } from 'src/app/services/equipos.service';
import { JugadoresService } from '../../services/jugadores.service';
import { EditarPerfilEquipoPage } from '../editar-perfil-equipo/editar-perfil-equipo.page';
import { EstadisticaEquipoPage } from '../estadistica-equipo/estadistica-equipo.page';
import { PerfilJugadorPage } from '../perfil-jugador/perfil-jugador.page';
import { MisEquiposPage } from '../mis-equipos/mis-equipos.page';
import { BuscarJugadoresPage } from '../buscar-jugadores/buscar-jugadores.page';
import { SolicitudesEquiposPage } from '../solicitudes-equipos/solicitudes-equipos.page';
import { SolicitudesService } from '../../services/solicitudes.service';
import { AlertasService } from '../../services/alertas.service';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router';
import { ProvinciasService } from 'src/app/services/provincias.service';
import { Provincias } from 'src/app/models/provincias';
@Component({
  selector: 'app-perfil-equipo',
  templateUrl: './perfil-equipo.page.html',
  styleUrls: ['./perfil-equipo.page.scss'],
})
export class PerfilEquipoPage {
  dureza = [

    { id: 0, titulo: 'Equipo Neutral', image: 'equipo-neutral.svg' },
    { id: 1, titulo: 'Juego Molesto', image: 'juego-molesto.svg' },
    { id: 2, titulo: 'Agresividad Irresponsable', image: 'agresividad-irresponsable.svg' },
    { id: 3, titulo: 'Caracter Revelde', image: 'caracter-revelde.svg' },
    { id: 4, titulo: 'Mas Que Un Club', image: 'mas-que-un-club.svg' },
    { id: 5, titulo: 'Clase Mundia FairPlay', image: 'clase-mundial-fairplay.svg' }

  ]
  teamPic = null
  constructor(
    public equiposService: EquiposService,
    public jugadoresService: JugadoresService,
    public actionSheetCtrl: ActionSheetController,
    public modalCtrl: ModalController,
    public solicitudesService: SolicitudesService,
    public alertasService: AlertasService,
    public alertCtrl: AlertController,
    public usuariosService: UsuariosService,
    public router:Router,
    public provinciasService:ProvinciasService
  ) {

  }


  async ionViewWillEnter() {

 
    let equipos = await this.equiposService.syncMisEquiposToPromise(this.usuariosService.usuarioActual.usuario.Cod_Usuario);
    this.equiposService.equipo = equipos[0]
    
    if(equipos.length == 0) return this.router.navigateByUrl('/futplay/crear-unirse-equipo',{replaceUrl:true})
 //()   alert(JSON.stringify( this.equiposService.equipo));
 
    this.solicitudesService.syncGetSolicitudesRecibidasEquipoToPromise(this.equiposService.equipo.equipo.Cod_Equipo).then(solicitudes => {

      this.solicitudesService.solicitudesEquiposArray = solicitudes;
 

      this.jugadoresService.syncJugadoresEquipos(this.equiposService.equipo.equipo.Cod_Equipo).then(jugadores => {
        this.jugadoresService.jugadores = jugadores;
   
          this.equiposService.cargarDAtosUbicacion();

      })

    })
  }
  filledStars(stars: number) {

    return new Array(stars)
  }
  emptyStars(stars: number) {
    let value = 5 - stars;
    return new Array(value)
  }



  durezaEquipo(value) {
    console.log(value.detail.value)
    alert(value)

  }

  async gestionarPerfil() {
 
    
          const modal = await this.modalCtrl.create({
            component: EditarPerfilEquipoPage,
            componentProps: {
              equipo: this.equiposService.equipo.equipo
            },
            id: 'perfil-equipo',
            cssClass: 'my-custom-modal'
          });
      
          modal.present();
          const { data } = await modal.onWillDismiss();
          console.log(data)
      
      
        
     
      




     

  }

  async myClubsMenu() {

    const modal = await this.modalCtrl.create({
      component: MisEquiposPage,
      cssClass: 'my-custom-modal',
      id: 'my-clubs'
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();


    if (data != undefined) {



      this.jugadoresEquipo();






    }

  }



  async onOpenMenu(jugador) {
    console.log(jugador)
    let normalBtns: ActionSheetButton[];

    if (this.usuariosService.usuarioActual.usuario.Cod_Usuario == this.equiposService.equipo.equipo.Cod_Usuario) {
      normalBtns = [
        {
          text: 'Detalle Jugador',
          icon: 'person-outline',
          handler: () => {
            this.perfilJugador(jugador);
          }

        },
        {
          text: 'Remover Jugador',
          icon: 'lock-closed-outline',
          handler: () => {
            this.confirmDelete(jugador);


          }

        },

        {
          text: 'Cancelar',
          icon: 'close-outline',
          role: 'cancel',

        }

      ]


    } else {
      normalBtns = [
        {
          text: 'Detalle Jugador',
          icon: 'person-outline',
          handler: () => {
            this.perfilJugador(jugador);
          }

        },

        {
          text: 'Cancelar',
          icon: 'close-outline',
          role: 'cancel',

        }

      ]


    }

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones',
      cssClass: 'left-align-buttons',
      buttons: normalBtns,
      mode: 'ios'
    });





    await actionSheet.present();


  }
  async solicitudesEquipos(){
 
    this.router.navigateByUrl('transferencias',{replaceUrl:true})
      }
  jugadoresEquipo() {
    this.solicitudesService.syncGetSolicitudesRecibidasEquipoToPromise(this.equiposService.equipo.equipo.Cod_Equipo).then(solicitudes => {

      this.solicitudesService.solicitudesEquiposArray = solicitudes;

      this.jugadoresService.syncJugadoresEquipos(this.equiposService.equipo.equipo.Cod_Equipo).then(jugadores => {

        this.jugadoresService.jugadores = []
        this.jugadoresService.jugadores = jugadores;
        //this.solicitudesService.syncGetSolicitudesEquipos(this.equiposService.perfilEquipo.Cod_Equipo, true,false, true)
        this.equiposService.cargarDAtosUbicacion();

      }, error => {

        // this.alertasService.loadingDissmiss();
        //this.alertasService.message('FUTPLAY', 'Error cargando lista de jugadores...')
      })
    })

  }

  async presentModal(equipo) {
    const modal = await this.modalCtrl.create({
      component: EstadisticaEquipoPage,

      cssClass: 'my-custom-css',
      componentProps: {
        equipo: equipo
      }
    });
    return await modal.present();
  }
  async perfilJugador(jugador) {
    const modal = await this.modalCtrl.create({
      component: PerfilJugadorPage,
      cssClass: 'my-custom-class',
      componentProps: {
        perfil: jugador
      }
    });
    return await modal.present();
  }
  async solicitudesEquipos2() {
    const modal = await this.modalCtrl.create({
      component: SolicitudesEquiposPage,
      cssClass: 'my-custom-modal'
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    this.jugadoresEquipo();
  }

  async confirmDelete(jugador) {

    console.log(jugador)

 
    if (jugador.usuario.Cod_Usuario == this.equiposService.equipo.equipo.Cod_Usuario) {
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
            this.jugadoresService.syncDeleteJugadorEquipo(jugador.jugador.Cod_Jugador).then(resp => {
              this.alertasService.loadingDissmiss();
              this.jugadoresEquipo();
              this.alertasService.message('FUTPLAY', 'Jugador Eliminado')
            }, error => {

              this.alertasService.loadingDissmiss();
              this.alertasService.message('FUTPLAY', 'Error eliminando jugador.')
            })
          }
        }
      ]
    });

    await alert.present();
  }


}
