import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { ListaCanchas } from 'src/app/models/listaCanchas';
import { CanchasService } from 'src/app/services/canchas.service';
import { GestionRetos } from '../../models/gestionRetos';
import { ControlReservacionesService } from 'src/app/services/control-reservaciones.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { GestionRetosService } from '../../services/gestion-retos.service';
import { HistorialPartidoService } from 'src/app/services/historial-partido.service';
import { HistorialPartido } from 'src/app/models/historialPartido';
import { InicioPartidoPage } from '../inicio-partido/inicio-partido.page';
import { vistaEquipos } from '../../models/vistaEquipos';
import { VerificacionQrPage } from '../verificacion-qr/verificacion-qr.page';
import { GoogleAdsService } from 'src/app/services/google-ads.service';
import { VideoScreenPage } from '../video-screen/video-screen.page';

@Component({
  selector: 'app-aceptar-reto',
  templateUrl: './aceptar-reto.page.html',
  styleUrls: ['./aceptar-reto.page.scss'],
})
export class AceptarRetoPage implements OnInit {
@Input() reto: GestionRetos
@Input() cancha : ListaCanchas
@Input() retador;
@Input() rival;
equipo : vistaEquipos

partido : HistorialPartido[]=[];
soccer= 'assets/icon/soccer.svg';
img = 'assets/main/team-profile.svg';
  constructor(
    public modalCtrl:ModalController,
    public canchasService: CanchasService,
    public actionCtrl: ActionSheetController,
    public controlReservacionesService: ControlReservacionesService,
    public usuariosService: UsuariosService,
    public gestionRestosService: GestionRetosService,
    public historialPartidoService:HistorialPartidoService,
    public googleAdsService: GoogleAdsService
  ) { }

  async ngOnInit() {


console.log('reto', this.reto, 'retador', this.retador, this.rival, this.cancha)
  }
  async navigate() {
     
    //Kuala Lumpur City Center coordinates
    let toLat= this.cancha.Latitud;
    let toLong= this.cancha.Longitud;

    
    let destination = toLat + ',' + toLong;


    //1. Declaring an empty array
    let actionLinks=[];

    //2. Populating the empty array

     //2A. Add Google Maps App
    actionLinks.push({
      text: 'Google Maps App',
      icon: 'navigate',
      handler: () => {
        window.open("https://www.google.com/maps/search/?api=1&query="+destination)
      }
    })

   
     //2B. Add Waze App
    actionLinks.push({
      text: 'Waze App',
      icon: 'navigate',
      handler: () => {
        window.open("https://waze.com/ul?ll="+destination+"&navigate=yes&z=10");
      }
    });

   //2C. Add a cancel button, you know, just to close down the action sheet controller if the user can't make up his/her mind
    actionLinks.push({
      text: 'Cancel',
      icon: 'close',
      role: 'cancel',
      handler: () => {
        // console.log('Cancel clicked');
      }
    })
    

    

     const actionSheet = await this.actionCtrl.create({
     header: 'Navigate',
     buttons: actionLinks
   });
   await actionSheet.present();
}

  async qrVerification(){
    

this.cerrarModal();

    const modal = await this.modalCtrl.create({
     component: VerificacionQrPage,
     cssClass:'large-modal',
     componentProps:{
       reto:this.reto,
       cancha:this.cancha,
       retador:this.retador,
       rival:this.rival,
       equipo: this.equipo,
       partido: this.partido
     }
 
    });

    
 
 return await modal.present();


     }
     async partidoActual() {

      
      this.modalCtrl.dismiss();

      const modal = await this.modalCtrl.create({
        component:InicioPartidoPage,
        cssClass: 'my-custom-class',
        componentProps:{
          reto:this.reto,
          cancha:this.cancha,
          retador:this.retador,
          rival:this.rival,
          partido: this.partido,
          equipo: this.equipo
        }
      });
    
      return await modal.present();
    }
     aceptarReto(){
       
 

       let confirmacion = {
        Cod_Reservacion: this.reto.Cod_Reservacion,
        Cod_Retador : this.reto.Cod_Retador,
        Cod_Rival : this.reto.Cod_Rival,
        Confirmacion_Retador: true,
        Confirmacion_Rival : true,
        Cod_Estado : 4,
             }


      this.controlReservacionesService.actualizarReservacion(confirmacion, this.reto.Cod_Usuario, this.reto.Cod_Reservacion);
this.videoScreen(2);
      this.gestionRestosService.syncRetosConfirmados(this.usuariosService.usuarioActual.Cod_Usuario)
      this.modalCtrl.dismiss();
     }

  cerrarModal(){
    this.modalCtrl.dismiss();
  }

  async videoScreen(id){
    const modal = await this.modalCtrl.create({
      component:VideoScreenPage,
      cssClass:'modal-view',
      id:'video-screen-modal',
      mode:'ios',
      backdropDismiss:false,
      componentProps:{
        index:id
      }
    });
  }
  iniciarPartido(){

    if(    this.usuariosService.usuarioActual.Cod_Usuario == this.retador.Cod_Usuario
      ){
    
     this.equipo =  this.retador
      }else{
     this.equipo =  this.rival
    
      }

      

    this.historialPartidoService.syncPartidoActual(this.reto.Cod_Reservacion).then(
       resp =>{
this.partido = resp;

if(!this.partido[0].Verificacion_QR || !this.partido[1].Verificacion_QR){

  this.qrVerification();
}else{

  this.partidoActual();
}

  


    })



  }

  eliminar(){
    this.gestionRestosService.syncDeleteConfirmacionReservacion(this.reto).then(resp =>{
      this.gestionRestosService.deleteReservacionToPromise(this.reto).then(resp =>{
        this.gestionRestosService.syncRetosEnviados(this.usuariosService.usuarioActual.Cod_Usuario)
  this.modalCtrl.dismiss();


      });
    });


  }
}
