import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { ListaCanchas } from 'src/app/models/listaCanchas';
import { CanchasService } from 'src/app/services/canchas.service';
import { GestionRetos } from '../../models/gestionRetos';
import { QrVerificationPage } from '../qr-verification/qr-verification.page';
import { DetalleFacturaPage } from '../detalle-factura/detalle-factura.page';
import { ControlReservacionesService } from 'src/app/services/control-reservaciones.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { GestionRetosService } from 'src/app/services/gestion-retos.service';

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
soccer= 'assets/icon/soccer.svg';
img = 'assets/main/team-profile.jpg';
  constructor(
    public modalCtrl:ModalController,
    public canchasService: CanchasService,
    public actionCtrl: ActionSheetController,
    public controlReservacionesService: ControlReservacionesService,
    public usuariosService: UsuariosService,
    public gestionRestosService: GestionRetosService
  ) { }

  async ngOnInit() {


console.log('reto', this.reto)
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

async detalleFactura() {
  this.modalCtrl.dismiss();
  
  const modal = await this.modalCtrl.create({
    component:DetalleFacturaPage,
    cssClass: 'my-custom-class'
  });

  return await modal.present();
}
  async qr(){
    

this.cerrarModal();

    const modal = await this.modalCtrl.create({
     component: QrVerificationPage,
     cssClass:'large-modal'
 
    });

 
 return await modal.present();


     }

     aceptarReto(){
       
      this.modalCtrl.dismiss();

       const confirmacion = {
        Cod_Reservacion: this.reto.Cod_Reservacion,
        Cod_Retador : this.reto.Cod_Retador,
        Cod_Rival : this.reto.Cod_Rival,
        Confirmacion_Retador: true,
        Confirmacion_Rival : true,
        Estado : true,
             }


      this.controlReservacionesService.actualizarReservacion(confirmacion, this.reto.Cod_Usuario, this.reto.Cod_Reservacion);

      this.gestionRestosService.syncRetosConfirmados(this.usuariosService.usuarioActual.Cod_Usuario)
     }

  cerrarModal(){
    this.modalCtrl.dismiss();
  }

}
