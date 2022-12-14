import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ActionSheetController, AlertController } from '@ionic/angular';

import { CanchasService } from 'src/app/services/canchas.service';

import { UsuariosService } from 'src/app/services/usuarios.service';

import { InicioPartidoPage } from '../inicio-partido/inicio-partido.page';

import { VerificacionQrPage } from '../verificacion-qr/verificacion-qr.page';

import { VideoScreenPage } from '../video-screen/video-screen.page';

import { AlertasService } from 'src/app/services/alertas.service';
import { EliminarRetoPage } from '../eliminar-reto/eliminar-reto.page';
import { Canchas } from '../../models/canchas';
import { Equipos } from 'src/app/models/equipos';
import { Reservaciones } from '../../models/reservaciones';
import { PerfilReservaciones } from '../../models/perfilReservaciones';
import { ReservacionesService } from 'src/app/services/reservaciones.service';
import { PartidoService } from '../../services/partido.service';
import { partidos } from '../../models/partidos';
import { ProvinciasService } from '../../services/provincias.service';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-aceptar-reto',
  templateUrl: './aceptar-reto.page.html',
  styleUrls: ['./aceptar-reto.page.scss'],
})
export class AceptarRetoPage implements OnInit {
@Input() reto:PerfilReservaciones
@Input() partido:partidos[]
 
soccer= 'assets/icon/soccer.svg';
img = 'assets/main/team-profile.svg';
allowDelete = false;
  constructor(
    public modalCtrl:ModalController,
    public canchasService: CanchasService,
    public actionCtrl: ActionSheetController,
    public usuariosService: UsuariosService,
    public provinciasService:ProvinciasService,



    public alertCtrl: AlertController,

    public alertasService: AlertasService,
    public reservacionesService:ReservacionesService,
    public partidosService:PartidoService,
    public emailService:EmailService
    
  ) { }

  async ngOnInit() {


console.log('reto', this.reto, 'retador', this.reto.retador, this.reto.rival, this.reto.cancha)

  }
  filledStars(stars:number){

    return new Array(stars)
  }

  emptyStars(stars:number){
    let value = 5 - stars;
    return new Array(value)
  }
  async navigate() {
     
    //Kuala Lumpur City Center coordinates
    let toLat= this.reto.cancha.Latitud;
    let toLong= this.reto.cancha.Longitud;

    
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


padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}
convertMsToHM(milliseconds) {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  // 👇️ if seconds are greater than 30, round minutes up (optional)
  minutes = seconds >= 30 ? minutes + 1 : minutes;

  minutes = minutes % 60;

  // 👇️ If you don't want to roll hours over, e.g. 24 to 00
  // 👇️ comment (or remove) the line below
  // commenting next line gets you `24:00:00` instead of `00:00:00`
  // or `36:15:31` instead of `12:15:31`, etc.
  hours = hours % 24;

  return `${this.padTo2Digits(hours)}:${this.padTo2Digits(minutes)}`;
}




  async qrVerification(){
    


this.cerrarModal();

    const modal = await this.modalCtrl.create({
     component: VerificacionQrPage,
     cssClass:'large-modal',
     componentProps:{
    reto:this.reto,
    partido:this.partido
       
     }
 
    });

    
 
 return await modal.present();


     }
     async partidoActual() {

      
    

      const modal = await this.modalCtrl.create({
        component:InicioPartidoPage,
        cssClass: 'my-custom-class',
        componentProps:{
          reto:this.reto,
          partido:this.partido
        },
        id:'inicio-partido'
      });
    
      await modal.present();
      let {data} = await modal.onDidDismiss();


     this.cerrarModal()
    }

    async alertaReservacion() {
      const alert = await this.alertCtrl.create({
        header: 'FUTPLAY',
        subHeader:'Proceso De Reservación',
        message:'¿Desea aceptar esta reservación? Recuerda que las reservaciones se pueden cancelar unicamente 24 horas antes de ser confirmadas.',
        
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
    
              console.log(this.reto, 'reservacion')

  
            }
          },
          {
            text: 'Continuar',
            role: 'confirm',
            handler: () => {
              
              console.log(this.reto, 'reservacion')
        
  this.reto.detalle.Confirmacion_Rival = true;
  this.reservacionesService.syncPutDetalleReservaion(this.reto.detalle).then(resp =>{

this.alertasService.presentaLoading('Gestionando cambios..')

this.emailService.enviarCorreoReservaciones(2, this.reto.usuario_rival.Correo, this.reto.reservacion.Fecha, this.reto.reservacion.Hora_Inicio, this.reto.cancha.Nombre, this.reto.rival.Nombre, this.reto.retador.Nombre).then(resp =>{
  this.emailService.enviarCorreoReservaciones(2, this.reto.usuario_retador.Correo, this.reto.reservacion.Fecha, this.reto.reservacion.Hora_Inicio, this.reto.cancha.Nombre, this.reto.rival.Nombre, this.reto.retador.Nombre).then(resp =>{

    this.emailService.enviarCorreoReservaciones(2, this.reto.correo, this.reto.reservacion.Fecha, this.reto.reservacion.Hora_Inicio, this.reto.cancha.Nombre, this.reto.rival.Nombre, this.reto.retador.Nombre).then(resp =>{
      this.alertasService.loadingDissmiss();
      this.alertasService.message('FUTPLAY', 'La reservación se confirmo con éxito ')
      this.cerrarModal();
 
      
          console.log('reto aceptado', resp)

    }, error =>{
      this.alertasService.loadingDissmiss();
      this.alertasService.message('FUTPLAY', 'Lo sentimos algo salio mal ')
    })

  }, error =>{
    this.alertasService.loadingDissmiss();
    this.alertasService.message('FUTPLAY', 'Lo sentimos algo salio mal ')
  })


}, error =>{
  this.alertasService.loadingDissmiss();
  this.alertasService.message('FUTPLAY', 'Lo sentimos algo salio mal ')
})

  }, error =>{
    console.log('reto error', error)
  })
              
  
            let subject =  ' Nueva Reservación confirmada ' +  this.reto.reservacion.Titulo;
            let body =  'Estimado usuario, se ha aceptado el reto en la cancha' + ' '+this.reto.reservacion.Titulo;
     /**
      *        this.emailService.notificarUsuarios(this.cancha.Cod_Usuario, subject, body).then(resp =>{
        
        
              this.aceptarReto();
              
        
            });
      */
             }
          }
        ]
      });
    
      await alert.present();
  
      const { role } = await alert.onDidDismiss();
    
    }

    

  
  cerrarModal(){
    this.modalCtrl.dismiss(null,null,'aceptar-reto')
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

    return await modal.present();
  }
 
  async doYouWantToDelete() {
    const alert = await this.alertCtrl.create({
      header: 'FUTPLAY',
      message:'¿Desea eliminar el reto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
           
          },
        },
        {
          text: 'OK',
          role: 'Continuar',
          handler: () => {
          
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    
  }
 


  async eliminarReto(){

    let modal = await this.modalCtrl.create({
      component:EliminarRetoPage,
      cssClass:'medium-modal',
      componentProps:{
        reto:this.reto
      }
    })
  
  
  
     await modal.present();

     const { data } = await modal.onDidDismiss();
     console.log('data eli', data)
     if(data != undefined){
      this.modalCtrl.dismiss(null,null,'aceptar-reto');
     }
  }

  iniciarPartido(){

    this.partidosService.syncGetPartidoReservacion(this.reto.reservacion.Cod_Reservacion).then(partido =>{
this.partido = partido;
      console.log('partido', partido)
      if(!partido[0].Verificacion_QR || !partido[1].Verificacion_QR){

        this.qrVerification();
      }else{
      
        this.partidoActual();
      }
    })

   

  }



}